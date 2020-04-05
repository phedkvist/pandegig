import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Settings = ({ navigation }) => {
  const signOut = useCallback(async () => {
    await Auth.signOut()
      .then(() => {
        navigation.navigate('AuthLoading');
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Error while signing out!', err));
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        onPress={signOut}
      >
        Sign Out
      </Button>
    </View>
  );
};

export default Settings;
