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
  value, onChange, placeholder, numberOfLines, ...props
}) => {
  const minHeight = numberOfLines * 40;
  return (
    <TextInput
      style={{ ...styles.input, minHeight }}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      editable
  // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  numberOfLines: PropTypes.number,
  multiline: PropTypes.bool,
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  numberOfLines: 1,
  multiline: false,
};

export default Input;
