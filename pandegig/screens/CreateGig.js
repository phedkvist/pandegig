import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { v1 } from 'uuid';
import Input from '../components/Input';
import Button from '../components/Button';

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
    color: 'gray',
    marginTop: 10,
    marginLeft: '3%',
  },
  button: {
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 2,
    color: '#ff5252',
  },
});

const CreateGig = ({ screenProps, navigation }) => {
  const { addGig } = screenProps;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [gigLocation, setGigLocation] = useState();
  const [phone, setPhone] = useState();
  const [earnings, setEarnings] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeTitle = useCallback((text) => setTitle(text), [setTitle]);
  const onChangeDescription = useCallback((text) => setDescription(text), [
    setDescription,
  ]);
  const onChangeGigLocation = useCallback((text) => setGigLocation(text), [
    setGigLocation,
  ]);
  const onChangeEarnings = useCallback(
    (text) => setEarnings(text.replace(/[^0-9]/g, '')),
    [setEarnings],
  );

  const onChangePhone = useCallback(
    (text) => setPhone(text.replace(/[^0-9]/g, '')),
    [setPhone],
  );

  const onPressCreateGig = useCallback(() => {
    let error = false;
    if (title == null || title === '') {
      error = true;
      setErrorMessage('You must give a title!');
    } else if (description == null || description === '') {
      error = true;
      setErrorMessage('You must give a description!');
    } else if (gigLocation == null || gigLocation === '') {
      error = true;
      setErrorMessage('You must specify a gigLocation!');
    } else if (earnings === undefined || earnings == null) {
      error = true;
      setErrorMessage('You must type in earnings!');
    } else if (earnings === 0) {
      error = true;
      setErrorMessage("Earnings can't be below 0!");
    } else if (earnings === undefined || earnings == null) {
      error = true;
      setErrorMessage('You must enter a phone number!');
    } else {
      setErrorMessage('');
    }

    if (!error) {
      const randomColors = ['#eef9bf', '#a7e9af', '#75b79e', '#6a8caf'];
      const cardColor = randomColors[Math.floor(Math.random() * randomColors.length)];

      const formatDate = () => {
        const d = new Date();
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        const year = d.getFullYear();

        if (month.length < 2) month = `0${month}`;
        if (day.length < 2) day = `0${day}`;

        return [year, month, day].join('-');
      };

      const createdAt = formatDate();

      addGig({
        id: v1(),
        title,
        description,
        gigLocation,
        earnings,
        phone,
        cardColor,
        createdAt,
      });
      setTitle('');
      setDescription('');
      setGigLocation('');
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
      <ScrollView>
        <Text style={styles.title}>Create Gig</Text>

        <View>
          <Text style={styles.label}>Title</Text>
          <Input
            value={title}
            placeholder="Send food"
            onChange={onChangeTitle}
          />
        </View>
        <View>
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
        <View>
          <Text style={styles.label}>Phone number</Text>
          <Input
            value={phone}
            placeholder="0701234567"
            onChange={onChangePhone}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <View>
          <Text style={styles.label}>Location</Text>
          <Input
            value={gigLocation}
            placeholder="Drottninggatan 3"
            onChange={onChangeGigLocation}
          />
        </View>
        <View>
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
    </View>
  );
};

CreateGig.propTypes = {
  screenProps: PropTypes.shape({
    addGig: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateGig;
