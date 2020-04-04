import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: '3%',
    padding: '3%',
    width: '94%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
});

const Input = ({
  value, onChange, placeholder, ...props
}) => (
  <TextInput
    style={styles.input}
    onChangeText={onChange}
    value={value}
    placeholder={placeholder}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  placeholder: '',
};

export default Input;
