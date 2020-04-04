import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import Input from '../components/Input';

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
  const onChangeEarnings = useCallback((text) => setEarnings(text), [
    setEarnings,
  ]);

  return (
    <View>
      <Text>Create Gig</Text>
      <Input value={title} placeholder="Send food" onChange={onChangeTitle} />
      <Input
        value={description}
        onChange={onChangeDescription}
        multiline
        numberOfLines={4}
        placeholder="I need help with..."
      />
      <Input
        value={location}
        placeholder="Drottninggatan 3"
        onChange={onChangeLocation}
      />
      <Input value={earnings} placeholder="100kr" onChange={onChangeEarnings} />
    </View>
  );
};

export default CreateGig;
