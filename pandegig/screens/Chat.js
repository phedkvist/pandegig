import React, { useState, useCallback } from 'react';
import { Platform, View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import Message from '../components/Message';
import { ScrollView } from 'react-native-gesture-handler';
// import Button from '../components/Button';
import Input from '../components/Input';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';


const MESSAGES = [
  {
    content: "Hej hur är läget",
    createdAt: new Date("April 24, 2020 11:13:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Det är bra, sj?",
    createdAt: new Date("April 24, 2020 11:15:00"),
    status: 'READ',
    fromUserId: 'b',
  },
  {
    content: "Det är bra",
    createdAt: new Date("April 24, 2020 11:18:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Hej hur är läget",
    createdAt: new Date("April 24, 2020 11:13:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Det är bra, sj?",
    createdAt: new Date("April 24, 2020 11:15:00"),
    status: 'READ',
    fromUserId: 'b',
  },
  {
    content: "Det är bra",
    createdAt: new Date("April 24, 2020 11:18:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Hej hur är läget",
    createdAt: new Date("April 24, 2020 11:13:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Det är bra, sj?",
    createdAt: new Date("April 24, 2020 11:15:00"),
    status: 'READ',
    fromUserId: 'b',
  },
  {
    content: "Det är bra",
    createdAt: new Date("April 24, 2020 11:18:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Hej hur är läget",
    createdAt: new Date("April 24, 2020 11:13:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Det är bra, sj?",
    createdAt: new Date("April 24, 2020 11:15:00"),
    status: 'READ',
    fromUserId: 'b',
  },
  {
    content: "Det är bra",
    createdAt: new Date("April 24, 2020 11:18:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Hej hur är läget",
    createdAt: new Date("April 24, 2020 11:13:00"),
    status: 'READ',
    fromUserId: 'a',
  },
  {
    content: "Det är bra, sj?",
    createdAt: new Date("April 24, 2020 11:15:00"),
    status: 'READ',
    fromUserId: 'b',
  },
  {
    content: "Det är bra",
    createdAt: new Date("April 24, 2020 11:18:00"),
    status: 'READ',
    fromUserId: 'a',
  },
];

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
    textAlignVertical: 'top'
  },
  textInputButton: {
    flexShrink: 1,
  }
});

const Chat = ({ navigation, messages = MESSAGES }) => {
  const name = navigation.getParam('name', '');
  const [inputHeight, setInputHeight] = useState(35);
  const [input, setInput] = useState('');
  const onChangeText = useCallback((text) => setInput(text), [setInput]);
  const onContentSizeChange = useCallback((event) => setInputHeight(event.nativeEvent.contentSize.height), [setInputHeight]);
  return (
    <View
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <>
          <Text>{name}</Text>
          <ScrollView style={styles.messageContainer}>
            {
              messages.map(c =>
                <Message content={c.content} createdAt={c.createAt} status={c.status} isRecieved={c.fromUserId === 'a'} />
              )
            }
          </ScrollView>
          <KeyboardAccessoryView alwaysVisible={true}>
            <View style={styles.textInputView}>
              <TextInput
                value={input}
                underlineColorAndroid="transparent"
                style={[styles.textInput, { height: Math.max(35, inputHeight) + 5 }]}
                multiline={true}
                onChangeText={onChangeText}
                onContentSizeChange={onContentSizeChange}
              />
              <Button
                style={styles.textInputButton}
                title="Send"
                onPress={() => { }} />
            </View>
          </KeyboardAccessoryView>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Chat;
