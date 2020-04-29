import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../components/Button';
import ProfileInformation from '../components/ProfileInformation';

const styles = StyleSheet.create({
  controls: {
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: 'grey',
    alignContent: 'center',
    marginTop: 300
  },
});

const Settings = ({ screenProps, navigation }) => {
  
  const { dynamoUser } = screenProps;

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
      <ProfileInformation
        profile={dynamoUser}
      />
      <View style={styles.controls}>
        <Button
          onPress={signOut}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
};

export default Settings;
