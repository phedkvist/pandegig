import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

const style = StyleSheet.create({
  leftMessage: {
    alignSelf: 'flex-start',
  },
  leftColor: {
    backgroundColor: 'lightblue',
  },
  rightMessage: {
    alignSelf: 'flex-end',
  },
  rightColor: {
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
  },
});

const Message = ({
  // eslint-disable-next-line no-unused-vars
  content, isRecieved, createdAt, isSent,
}) => {
  const side = isRecieved ? style.leftMessage : style.rightMessage;
  const sideColor = isRecieved ? style.leftColor : style.rightColor;

  return (
    <View style={side}>
      <View style={[style.message, sideColor]}>
        <Text>{content}</Text>
      </View>
      {isSent && (
        <View style={{ ...side, marginLeft: 12, marginRight: 12 }}>
          <Ionicons name="check" size={14} color="green" />
        </View>
      )}
    </View>
  );
};

Message.propTypes = {
  content: PropTypes.string.isRequired,
  isRecieved: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  isSent: PropTypes.bool.isRequired,
};

export default Message;
