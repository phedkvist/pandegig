import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
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
    marginTop: 100,
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
});

const CreateGig = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [earnings, setEarnings] = useState();

  const onChangeTitle = useCallback((text) => setTitle(text), [setTitle]);
  const onChangeDescription = useCallback((text) => setDescription(text), [
    setDescription,
  ]);
  const onChangeLocation = useCallback((text) => setLocation(text), [
    setLocation,
  ]);
  const onChangeEarnings = useCallback((text) => setEarnings(text.replace(/[^0-9]/g, '')), [
    setEarnings,
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Create Gig</Text>
        <Text style={styles.label}>Title</Text>
        <Input value={title} placeholder="Send food" onChange={onChangeTitle} />
        <Text style={styles.label}>Describe the Gig</Text>
        <Input
          value={description}
          onChange={onChangeDescription}
          multiline
          numberOfLines={4}
          placeholder="I need help with..."
        />
        <Text style={styles.label}>Location</Text>
        <Input
          value={location}
          placeholder="Drottninggatan 3"
          onChange={onChangeLocation}
        />
        <Text style={styles.label}>Earnings</Text>
        <Input
          value={earnings}
          placeholder="100kr"
          onChange={onChangeEarnings}
          keyboardType="numeric"
        />
        <View style={styles.button}>
          <Button
            onPress={undefined}
          >
            Post Gig
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateGig;
