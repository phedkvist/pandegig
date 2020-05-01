import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  listElement: {
    height: 50,
    marginTop: '5%',
    backgroundColor: 'beige',
    borderRadius: 10,
    padding: '3%',
    width: '100%',
    borderColor: 'lightgray',
  },
});

const Location = ({ location, onSelected }) => {
  const onSelectionCallback = useCallback(
    () => {
      onSelected(location);
    },
    [onSelected, location],
  );
  return (
    <TouchableOpacity
      style={{ ...styles.listElement }}
      onPress={onSelectionCallback}
    >
      <Text>{location.place_name}</Text>
    </TouchableOpacity>
  );
};

Location.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
};

export default Location;
