import React, { useState, useCallback } from 'react';
import {
  View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import Message from '../components/Message';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messageContainer: {
    flexDirection: 'column',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    flexDirection: 'row',
  },
  input: {
    width: '70%',
  },
  submitButton: {
    marginTop: 6,
  },
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top',
  },
  textInputButton: {
    flexShrink: 1,
  },
});

const Chat = ({ screenProps, navigation }) => {
  const conversation = navigation.getParam('conversation', undefined);
  const { currentUserId, sendMessage } = screenProps;
  const { messages } = conversation;
  const [inputHeight, setInputHeight] = useState(35);
  const [input, setInput] = useState('');
  const onChangeText = useCallback((text) => setInput(text), [setInput]);
  const onContentSizeChange = useCallback((e) => {
    setInputHeight(e.nativeEvent.contentSize.height);
  }, [setInputHeight]);

  const onSendMessage = useCallback(() => {
    sendMessage(input, conversation.id);
    setInput('');
  }, [sendMessage, input, conversation, setInput]);
  return (
    <View
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <>
          <ScrollView style={styles.messageContainer}>
            {
              messages.map((c) => (
                <Message
                  content={c.content}
                  createdAt={c.createAt}
                  status={c.status}
                  isRecieved={c.sender !== currentUserId}
                  key={c.id}
                />
              ))
            }
          </ScrollView>
          <KeyboardAccessoryView alwaysVisible>
            <View style={styles.textInputView}>
              <TextInput
                value={input}
                underlineColorAndroid="transparent"
                style={[styles.textInput, { height: Math.max(35, inputHeight) + 5 }]}
                multiline
                onChangeText={onChangeText}
                onContentSizeChange={onContentSizeChange}
              />
              <Button
                style={styles.textInputButton}
                title="Send"
                onPress={onSendMessage}
              />
            </View>
          </KeyboardAccessoryView>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};


export default Chat;
