import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, ScrollView, Platform, SafeAreaView,
} from 'react-native';
import { v1 } from 'uuid';
import Input from '../components/Input';
import Button from '../components/Button';
import LocationList from '../components/LocationList';
import MapBoxConfig from '../mapbox-exports';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: 'gray',
    textTransform: 'uppercase',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
    marginLeft: '3%',
  },
  section: {
    borderTopColor: 'grey',
    borderTopWidth: 2,
    padding: 5
  },
  button: {
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 2,
    color: 'black',
  },
  location: {
    padding: 5,
    margin: 10,
  },
  valid: {
    backgroundColor: 'lightgreen',
    borderRadius: 5,
  },
  invalid: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

// eslint-disable-next-line no-unused-vars
const formatDate = () => {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

const CreateGig = ({ screenProps, navigation }) => {
  const { addGig } = screenProps;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [gigLocation, setGigLocation] = useState();
  const [locations, setLocations] = useState();
  const [location, setLocation] = useState();
  const [phone, setPhone] = useState();
  const [earnings, setEarnings] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeTitle = useCallback((text) => setTitle(text), [setTitle]);
  const onChangeDescription = useCallback((text) => setDescription(text), [
    setDescription,
  ]);
  const onChangeGigLocation = useCallback((text) => { 
    setGigLocation(text) 
    setLocation(undefined)
  }, [
    setGigLocation,
    setLocation
  ]);
  const onPressFindLocations = useCallback(
    () => {
      if(gigLocation.length > 1) {
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${gigLocation}.json?access_token=${MapBoxConfig.token}`
        fetch(url)
        .then(response => {
          return response.json();
        }, err => {
          console.error(err);
        })
        .then(locationsData => {
          let locations = locationsData.features
          setLocations(locations)
        }, err => {
          console.error(err);
        });
      } else {
        setErrorMessage("Write at leaste two characters.")
      }
    }, [
      setLocations,
      gigLocation
    ]
  )
  const onChangeEarnings = useCallback(
    (text) => setEarnings(text.replace(/[^0-9]/g, '')),
    [setEarnings],
  );
  const onSelectLocation = useCallback(
    (location) => {
      setLocation(location)
      setGigLocation(location.place_name)
      setLocations([])
    },
    [setLocation, setLocations],
  );

  const onChangePhone = useCallback(
    (text) => setPhone(text.replace(/[^0-9]/g, '')),
    [setPhone],
  );

  const onPressCreateGig = useCallback(() => {
    let error = false;

    if (!title) {
      error = true;
      setErrorMessage('You must give a title!');
    } else if (!description) {
      error = true;
      setErrorMessage('You must give a description!');
    } else if (!gigLocation) {
      error = true;
      setErrorMessage('You must specify a gigLocation!');
    } else if (!location) {
      error = true;
      setErrorMessage('You must select a location!');
    } else if (!earnings) {
      error = true;
      setErrorMessage('You must type in earnings!');
    } else if (!earnings) {
      error = true;
      setErrorMessage("Earnings can't be below 0!");
    } else if (!phone) {
      error = true;
      setErrorMessage('You must enter a phone number!');
    } else {
      setErrorMessage('');
    }

    if (!error) {
      const randomColors = ['#eef9bf', '#a7e9af', '#75b79e', '#6a8caf'];
      const cardColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      
      const createdAt = new Date();

      addGig({
        Id: v1(),
        title,
        description,
        gigLocation,
        longitude: location.geometry.coordinates[0],
        latitude: location.geometry.coordinates[1],
        earnings,
        phone,
        cardColor,
        createdAt,
      });
      setTitle('');
      setDescription('');
      setGigLocation('');
      setLocations([]);
      setLocation(undefined);
      setEarnings('');
      setPhone('');
      navigation.navigate('FindGig');
    }
    return errorMessage;
  }, [
    errorMessage,
    description,
    title,
    gigLocation,
    earnings,
    addGig,
    navigation,
    phone,
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <Text style={[styles.title, styles.droidSafeArea]}>Create Gig</Text>
          <View style={styles.section}>
            <Text style={styles.label}>Title</Text>
            <Input
              value={title}
              placeholder="Send food"
              onChange={onChangeTitle}
              maxLength={34}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Describe the Gig</Text>
            <Input
              value={description}
              onChange={onChangeDescription}
              multiline
              numberOfLines={4}
              placeholder="I need help with..."
              maxLength={250}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Phone number</Text>
            <Input
              value={phone}
              placeholder="0701234567"
              onChange={onChangePhone}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Location</Text>
            <Input
              value={gigLocation}
              style={[styles.location, location !== undefined ? styles.valid : styles.invalid]}
              placeholder="Drottninggatan 3"
              placeholderTextColor="#fff"
              onChange={onChangeGigLocation}
            />
            <View style={styles.button}>
              <Button 
                onPress={onPressFindLocations}
              >
                Find location
              </Button>
            </View>
            <LocationList
              locations={locations} 
              onSelected={onSelectLocation} 
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Earnings</Text>
            <Input
              value={earnings}
              placeholder="100kr"
              onChange={onChangeEarnings}
              keyboardType="numeric"
            />
          </View>
          <View>
            <View style={styles.button}>
              <Button onPress={onPressCreateGig}>Post Gig</Button>
            </View>
          </View>
          <View>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

CreateGig.propTypes = {
  screenProps: PropTypes.shape({
    addGig: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateGig;
