import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Auth from '@aws-amplify/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <Text>Settings</Text>
      <TouchableOpacity
        onPress={signOut}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
