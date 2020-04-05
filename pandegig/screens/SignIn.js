/* eslint-disable global-require */
import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Input from '../components/Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a6bcc',
    alignItems: 'center',
    paddingTop: 10,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 2,
    color: '#ff5252',
  },
  image: {
    maxHeight: 250,
    maxWidth: 250,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  button: {
    color: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
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
    const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email,
    );
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
      <View>
        <Image source={require('../assets/logo.png')} style={styles.image} />
      </View>

      <Input
        value={email}
        placeholder="email@example.com"
        onChange={onChangeEmail}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
        style={styles.input}
      />
      <Input
        value={password}
        placeholder="password"
        onChange={onChangePassword}
        secureTextEntry
        autoCompleteType="password"
        style={styles.input}
      />
      <View style={styles.button}>
        <TouchableOpacity onPress={signIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={onNavigateSignUp}>
          <Text style={styles.buttonText}>
            {'Don\'t'}
            {' '}
            have an account? Sign up here!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
