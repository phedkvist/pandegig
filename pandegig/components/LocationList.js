import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  locationList: {
    margin: '3%',
    padding: '3%',
    width: '94%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});

const LocationList = ({
  locations, onSelected
}) => {
  return locations.length ? (
    <View style={styles.locationList}>
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
