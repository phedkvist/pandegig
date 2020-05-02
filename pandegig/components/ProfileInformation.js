import React from 'react';
import { Divider } from 'react-native-elements';
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
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  divider: {
    height: 2,
    backgroundColor: 'blue'
  },
  skillsHeading: {
    fontSize: 20,
    margin: 5
  }
});

const ProfileInformation = ({ profile }) => (
  <View>
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
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.skillsHeading}> 
          Skills
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
