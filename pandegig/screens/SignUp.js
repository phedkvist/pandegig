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
});

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [invalidMessage, setInvalidMessage] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const onChangeName = useCallback((n) => setName(n), []);
  const onChangeEmail = useCallback((e) => setEmail(e), []);
  const onChangePassword = useCallback((p) => setPassword(p), []);
  const onChangeRepeatPassword = useCallback((p) => setRepeatPassword(p), []);
  const onChangeAuthCode = useCallback((a) => setAuthCode(a), []);


  const signUp = useCallback(async () => {
    const validPassword = password.length > 5 && (password === repeatPassword);
    if (validPassword) {
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
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
      setInvalidMessage('Password must be equal and have greater lenght than 6.');
    }
  }, [email, name, password, repeatPassword]);

  const confirmSignUp = useCallback(async () => {
    await Auth.confirmSignUp(email, authCode)
      .then(() => {
        navigation.navigate('SignIn');
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
          <Button
            onPress={signUp}
          >
            Sign Up
          </Button>
        </>
      )}
      {confirmDialog && (
        <>
          <Input
            value={authCode}
            placeholder="XXX"
            onChange={onChangeAuthCode}
          />
          <Button
            onPress={confirmSignUp}
          >
            Confirm Sign Up
          </Button>
        </>
      )}
      <Text>
        {invalidMessage}
      </Text>
    </View>
  );
}
