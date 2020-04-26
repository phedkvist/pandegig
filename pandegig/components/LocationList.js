import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  locationList: {
    margin: 10,
    padding: 10,
    width: '94%',
    borderWidth: 5,
    borderColor: 'beige',
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
    marginTop: 10,
    marginLeft: '3%',
  },
});

const LocationList = ({
  locations, onSelected
}) => {
  return locations.length ? (
    <View style={styles.locationList}>
      <Text style={styles.label}>Choose Location</Text>
      {locations.map((location, i) => {
        return (
          <Location
            key={i}
            location={location}
            onSelected={onSelected}
          />
        );
      })}
    </View>
  ) : <></>;
};

LocationList.propTypes = {
  locations: PropTypes.array,
  onSelected: PropTypes.func.isRequired
};

LocationList.defaultProps = {
  locations: [],
};

export default LocationList;
