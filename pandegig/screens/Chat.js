import React from 'react';
import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Message from '../components/Message';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../components/Button';
import Input from '../components/Input';


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

const style = StyleSheet.create({
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
  }
});

const Chat = ({ navigation, messages = MESSAGES }) => {
  const name = navigation.getParam('name', '');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={style.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Text>{name}</Text>
          <ScrollView style={style.messageContainer}>
            {
              messages.map(c =>
                <Message content={c.content} createdAt={c.createAt} status={c.status} isRecieved={c.fromUserId === 'a'} />
              )
            }
          </ScrollView>
          <View style={style.inputContainer}>
            <View style={style.input}>
              <Input />
            </View>
            <View style={style.submitButton}>
              <Button>Submit</Button>
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chat;
