import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, RefreshControl, SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Gig from '../components/Gig';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {

  },
});


function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const FindGig = ({ screenProps, navigation }) => {
  const { gigs, getGigs } = screenProps;
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchGigs = useCallback(async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      getGigs(location);
    
  }, [getGigs, setCurrentLocation, Location]);

  useEffect(() => {
    fetchGigs();
  }, []);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGigs();
    wait(1000).then(() => setRefreshing(false));
  }, [setRefreshing, getGigs, currentLocation]);
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
