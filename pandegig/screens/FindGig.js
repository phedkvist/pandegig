import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text, StyleSheet, View, RefreshControl,
} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-shadow-cards';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
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
          <Text style={styles.cardText}>{gig.currentUserName}</Text>
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
    currentUserName: PropTypes.string.isRequired,
  }).isRequired,
};

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const FindGig = ({ screenProps, navigation }) => {
  const { gigs, getGigs } = screenProps;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getGigs();
    wait(1000).then(() => setRefreshing(false));
  }, [setRefreshing, getGigs]);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        currentUserName: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    getGigs: PropTypes.func.isRequired,
  }).isRequired,
};

export default FindGig;
