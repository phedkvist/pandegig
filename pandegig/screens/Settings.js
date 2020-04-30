import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../components/Button';
import ProfileInformation from '../components/ProfileInformation';

const styles = StyleSheet.create({
  controls: {
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: 'grey',
    alignContent: 'center',
    marginTop: 300,
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

Settings.propTypes = {
  screenProps: PropTypes.shape({
    dynamoUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      skillLevel: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Settings;
