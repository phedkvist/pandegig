import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Gig = ({ navigation, gig }) => {
  const navigateToGig = useCallback(() => {
    navigation.navigate('SingleGig', { gig });
  }, [navigation, gig]);
  return (
    <TouchableOpacity
      onPress={navigateToGig}
    >
      <Text>
        {gig.title}
      </Text>
    </TouchableOpacity>
  );
};

Gig.propTypes = {
  gig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    earnings: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const FindGig = ({ screenProps, navigation }) => {
  const { gigs } = screenProps;
  return (
    <View style={styles.container}>
      {gigs.map((g) => (
        <Gig key={g.id} navigation={navigation} gig={g} />
      ))}
    </View>
  );
};

FindGig.propTypes = {
  screenProps: PropTypes.shape({
    gigs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        earnings: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default FindGig;
