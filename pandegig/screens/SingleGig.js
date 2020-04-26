import React, { useCallback } from 'react';
import {
  Text, View, StyleSheet, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { Card } from 'react-native-shadow-cards';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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

const formatDate = (d) => {
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

const SingleGig = ({ screenProps, navigation }) => {
  const { deleteGig, currentUserId, createConversation } = screenProps;
  const IconComponent = Ionicons;
  const gig = navigation.getParam('gig', undefined);

  const makeCall = useCallback(() => {
    Linking.openURL(`tel:${gig.phone}`);
  }, [gig]);

  const deletePost = useCallback(() => {
    // add delete functionality
    deleteGig(gig.Id);
    navigation.navigate('FindGig');
  }, [deleteGig, gig, navigation]);

  const onAcceptGig = useCallback(() => {
    const { userId, Id, title } = gig;
    createConversation(Id, userId, title, `I accept the gig of ${title}`);
  }, [gig, navigation, createConversation]);

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: gig.cardColor }]}>
        <Text style={styles.cardHeader}>{gig.title}</Text>
        {gig && currentUserId === gig.userId && (
          <View style={styles.closeIcon}>
            <TouchableOpacity title="" onPress={deletePost}>
              <IconComponent name="delete" size={30} color="red" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.cardUser}>
          {'Posted at '}
          {formatDate(gig.createdAt)}
          {' by '}
          {gig.currentUserName}
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
      {gig && currentUserId !== gig.userId && (
        <Button onPress={onAcceptGig}>
          Accept Gig
        </Button>
      )}
    </View>
  );
};

SingleGig.propTypes = {
  screenProps: PropTypes.shape({
    deleteGig: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    createConversation: PropTypes.func.isRequired,
  }).isRequired,
};

export default SingleGig;
