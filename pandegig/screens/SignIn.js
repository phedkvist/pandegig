import React, { useState, useCallback } from 'react';
import {
  View, StyleSheet, Alert, TouchableOpacity, Text,
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

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onChangeEmail = useCallback((text) => setEmail(text), [setEmail]);
  const onChangePassword = useCallback((text) => setPassword(text), [
    setPassword,
  ]);
  const onNavigateSignUp = useCallback(() => navigation.navigate('SignUp'), [
    navigation,
  ]);


  const signIn = useCallback(async () => {
    // eslint-disable-next-line no-useless-escape
    const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    let error = false;
    if (email == null || email === '' || !validateEmail) {
      error = true;
      setErrorMessage('You must enter your email!');
    } else if (!password || password === '') {
      error = true;
      setErrorMessage('You must enter your password!');
    } else {
      setErrorMessage('');
    }

    if (!error) {
      await Auth.signIn(email, password)
        .then(() => {
          navigation.navigate('AuthLoading');
        })
        .catch((err) => {
          if (!err.message) {
            Alert.alert('Error when signing in: ', err);
          } else {
            Alert.alert('Error when signing in: ', err.message);
          }
        });
    }
  }, [email, password, navigation]);

  return (
    <View style={styles.container}>
      <Input
        value={email}
        placeholder="email@example.com"
        onChange={onChangeEmail}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
      />
      <Input
        value={password}
        placeholder="password"
        onChange={onChangePassword}
        secureTextEntry
        autoCompleteType="password"
      />
      <Button onPress={signIn}>Sign In</Button>
      <View>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <TouchableOpacity onPress={onNavigateSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
