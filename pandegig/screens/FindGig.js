import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const FindGig = ({ screenProps }) => {
  const { gigs } = screenProps;
  return (
    <View style={styles.container}>
      {gigs.map((g) => <Text>{g.title}</Text>)}
    </View>
  );
};

FindGig.propTypes = {
  screenProps: {
    gigs: PropTypes.array.isRequired,
  }.isRequired,
};

export default FindGig;
