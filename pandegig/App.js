import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './screens/SignIn';
import { createSwitchNavigator } from 'react-navigation';

const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignIn,
  }
});

const AppNavigator = createSwitchNavigator({
  Auth: AuthStackNavigator,
});


const AppContainer = createAppContainer(AppNavigator);

function App() {
  return (
    <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
