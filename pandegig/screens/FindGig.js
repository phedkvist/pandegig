import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-shadow-cards';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { padding: 10, margin: 10 },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
  },
});

const Gig = ({ navigation, gig }) => {
  const navigateToGig = useCallback(() => {
    navigation.navigate('SingleGig', { gig });
  }, [navigation, gig]);


  return (
    <View>
      <TouchableOpacity onPress={navigateToGig}>
        <Card style={[styles.card, { backgroundColor: gig.cardColor }]}>
          <Text style={styles.cardHeader}>{gig.title}</Text>
          <Text style={styles.cardText}>{gig.gigLocation}</Text>
          <Text style={styles.cardText}>
            {gig.earnings}
            {' kr'}
          </Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

Gig.propTypes = {
  gig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    gigLocation: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    earnings: PropTypes.string.isRequired,
    Id: PropTypes.string.isRequired,
    cardColor: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

const FindGig = ({ screenProps, navigation }) => {
  const { gigs } = screenProps;
  return (
    <View style={styles.container}>
      <ScrollView>
        {gigs.map((g) => (
          <Gig key={g.Id} navigation={navigation} gig={g} />
        ))}
      </ScrollView>
    </View>
  );
};

FindGig.propTypes = {
  screenProps: PropTypes.shape({
    gigs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        gigLocation: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        earnings: PropTypes.string.isRequired,
        Id: PropTypes.string.isRequired,
        cardColor: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default FindGig;
