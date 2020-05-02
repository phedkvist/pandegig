import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Auth from '@aws-amplify/auth';
import ProfileInformation from '../components/ProfileInformation';
import SettingsMenu from '../components/SettingsMenu';

const Settings = ({ screenProps, navigation }) => {
  const { dynamoUser } = screenProps;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onToggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [
    setIsMenuOpen,
    isMenuOpen
  ]);

  const signOut = useCallback(async () => {
    await Auth.signOut()
      .then(() => {
        navigation.navigate('AuthLoading');
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Error while signing out!', err));
  }, [navigation]);

  return (
    <View>
      <SettingsMenu 
        isMenuOpen={isMenuOpen} 
        onToggleMenu={onToggleMenu}
        signOut={signOut} />
      <ProfileInformation
        profile={dynamoUser}
      />
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
