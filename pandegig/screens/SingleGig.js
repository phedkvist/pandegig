import React from 'react';
import { Text, View } from 'react-native';

const SingleGig = ({ navigation }) => {
  const gig = navigation.getParam('gig', undefined);

  return (
    <View>
      <Text>{gig.title}</Text>
      <Text>{gig.description}</Text>
      <Text>{gig.location}</Text>
      <Text>{gig.phone}</Text>
      <Text>{gig.earnings}</Text>
    </View>
  );
};

export default SingleGig;
