import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightblue',
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgray',
  },
  message: {
    margin: 10,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: '45%',
  }
});

const Message = ({ content, isRecieved, createdAt, status }) => {
  const side = isRecieved ? style.leftMessage : style.rightMessage;
  return (
    <View style={[style.message, side]}>
      <Text>{content}</Text>
    </View>
  )
}

Message.propTypes = {

};

export default Message;

