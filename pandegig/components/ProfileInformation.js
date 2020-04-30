import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
});

const ProfileInformation = ({ profile }) => (
  <View style={styles.container}>
    <View style={styles.header} />
    <Image style={styles.avatar} source={{ uri: profile.picture }} />
    <View style={styles.body}>
      <View style={styles.bodyContent}>
        <Text style={styles.name}>{profile.username}</Text>
        <Text style={styles.info}>
          Skill level:
          {profile.skillLevel}
        </Text>
      </View>
    </View>
  </View>
);

ProfileInformation.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    skillLevel: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInformation;
