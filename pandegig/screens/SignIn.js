import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
});


export default function SignIn(props) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const signIn = async () => {
    await Auth.signIn(email, password)
      .then((user) => {
        props.navigation.navigate('AuthLoading');
      })
      .catch((err) => {
        if (!err.message) {
          console.log('Error when signing in: ', err);
          Alert.alert('Error when signing in: ', err);
        } else {
          console.log('Error when signing in: ', err.message);
          Alert.alert('Error when signing in: ', err.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Input
        value={email}
        placeholder="email@example.com"
        onChange={(text) => onChangeEmail(text)}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
      />
      <Input
        value={password}
        placeholder="password"
        onChange={(text) => onChangePassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <Button
        onPress={() => signIn()}
      >
        Sign In
      </Button>
    </View>
  );
}
