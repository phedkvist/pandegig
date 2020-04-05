import React, { useCallback } from 'react';
import {
  Text, View, StyleSheet, Linking,
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 10,
    margin: 10,
    minHeight: '70%',
  },
  icons: {
    color: '#ff5252',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardUser: {
    fontSize: 14,
    marginBottom: 20,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  cardLocation: {
    fontSize: 14,
    marginBottom: 20,
    position: 'absolute',
    left: 10,
    bottom: 40,
  },
  cardEarnings: {
    fontSize: 18,
    marginBottom: 20,
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  cardPhoneText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  cardPhone: {
    position: 'absolute',
    left: 10,
    bottom: 0,
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
});

const SingleGig = ({ navigation }) => {
  const IconComponent = Ionicons;

  const gig = navigation.getParam('gig', undefined);
  // TODO: add gig.user

  const makeCall = useCallback(() => {
    Linking.openURL(`tel:${gig.phone}`);
  }, [gig]);

  const deletePost = useCallback(() => {
    // add delete functionality
  }, []);

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: gig.cardColor }]}>
        <Text style={styles.cardHeader}>{gig.title}</Text>
        {true /* add "if user owns this post"-check */ && (
          <View style={styles.closeIcon}>
            <TouchableOpacity title="" onPress={deletePost}>
              <IconComponent name="close" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.cardUser}>
          {'Posted at '}
          {gig.createdAt}
          {' '}
          by
          {gig.user}
        </Text>

        <Text style={styles.cardDescription}>{gig.description}</Text>
        <Text style={styles.cardLocation}>{gig.location}</Text>
        <View style={[styles.cardPhone]}>
          <TouchableOpacity onPress={makeCall}>
            <Text style={styles.cardPhoneText}>{gig.phone}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cardEarnings}>
          {gig.earnings}
          {' kr'}
        </Text>
      </Card>
    </View>
  );
};

export default SingleGig;
