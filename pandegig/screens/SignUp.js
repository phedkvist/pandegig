import React, { useState, useCallback } from 'react';
import {
  View, StyleSheet, Text, Alert,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../components/Button';
import Input from '../components/Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 2,
    color: '#ff5252',
  },
});

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [invalidMessage, setInvalidMessage] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const onChangeName = useCallback((n) => setName(n), []);
  const onChangeEmail = useCallback((e) => setEmail(e), []);
  const onChangePassword = useCallback((p) => setPassword(p), []);
  const onChangeRepeatPassword = useCallback((p) => setRepeatPassword(p), []);
  const onChangeAuthCode = useCallback((a) => setAuthCode(a), []);

  const signUp = useCallback(async () => {
    const validPassword = (password.length > 5 && password === repeatPassword);
    // eslint-disable-next-line no-useless-escape
    const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    let error = false;
    if (email == null || email === '' || !validateEmail) {
      error = true;
      setErrorMessage('You must enter your email!');
    } else if (!password || password === '' || !validPassword) {
      error = true;
      setErrorMessage('You must enter your password!');
    } else if (!name || name === '') {
      error = true;
      setErrorMessage('You must enter your name!');
    } else if (password !== repeatPassword) {
      error = true;
      setErrorMessage('Password did not match');
    } else {
      setErrorMessage('');
    }

    if (!error) {
      setInvalidMessage(null);
      setConfirmDialog(true);
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          name,
        },
        validationData: [], // optional
      })
        // eslint-disable-next-line no-console
        .then((data) => console.log(data))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  }, [email, name, password, repeatPassword]);

  const confirmSignUp = useCallback(async () => {
    await Auth.confirmSignUp(email, authCode)
      .then(() => {
        navigation.navigate('SignIn');
        // eslint-disable-next-line no-console
        console.log('Confirm sign up successful');
      })
      .catch((err) => {
        if (!err.message) {
          Alert.alert('Error when entering confirmation code: ', err);
        } else {
          Alert.alert('Error when entering confirmation code: ', err.message);
        }
      });
  }, [email, authCode, navigation]);

  return (
    <View style={styles.container}>
      {!confirmDialog && (
        <>
          <Input
            value={name}
            placeholder="Name"
            onChange={onChangeName}
            autoFocus
          />
          <Input
            value={email}
            placeholder="email@example.com"
            onChange={onChangeEmail}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <Input
            value={password}
            placeholder="password"
            onChange={onChangePassword}
            secureTextEntry
            autoCompleteType="password"
          />
          <Input
            value={repeatPassword}
            placeholder="Repeat password"
            onChange={onChangeRepeatPassword}
            secureTextEntry
            autoCompleteType="password"
          />
          <Button onPress={signUp}>Sign Up</Button>
          <View>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        </>
      )}
      {confirmDialog && (
        <>
          <Input
            value={authCode}
            placeholder="XXX"
            onChange={onChangeAuthCode}
          />
          <Button onPress={confirmSignUp}>Confirm Sign Up</Button>
        </>
      )}
      <Text>{invalidMessage}</Text>
    </View>
  );
}
