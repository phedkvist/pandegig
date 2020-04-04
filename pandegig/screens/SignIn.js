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
});


export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((text) => setEmail(text), [setEmail]);
  const onChangePassword = useCallback((text) => setPassword(text), [setPassword]);
  const onNavigateSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);

  const signIn = useCallback(async () => {
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
  }, [navigation, email, password]);

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
      <Button
        onPress={signIn}
      >
        Sign In
      </Button>
      <TouchableOpacity
        onPress={onNavigateSignUp}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
