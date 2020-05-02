import React, { Component } from 'react';
import {
  View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import Message from '../components/Message';
import ConversationsPropType from '../propTypes/conversations';


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

class Chat extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const conversationId = navigation.getParam('conversationId', undefined);
    const { conversations } = screenProps;
    const conversation = conversations[conversationId];
    return {
      title: conversation.title,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      inputHeight: 35,
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  onContentSizeChange(e) {
    this.setState({ inputHeight: e.nativeEvent.contentSize.height });
  }

  onChangeText(text) {
    this.setState({ input: text });
  }

  onSendMessage() {
    const { navigation, screenProps } = this.props;
    const conversationId = navigation.getParam('conversationId', undefined);
    const { sendMessage } = screenProps;
    const { input } = this.state;
    sendMessage(input, conversationId);
    this.setState({ input: '' });
  }

  render() {
    const { navigation, screenProps } = this.props;
    const conversationId = navigation.getParam('conversationId', undefined);
    const { currentUserId, conversations } = screenProps;
    const conversation = conversations[conversationId];

    const { messages } = conversation || [];
    const sortedMessages = messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const { input, inputHeight } = this.state;

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
                sortedMessages.map((c) => (
                  <Message
                    content={c.content}
                    createdAt={c.createAt}
                    isSent={c.isSent}
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
                  onChangeText={this.onChangeText}
                  onContentSizeChange={this.onContentSizeChange}
                />
                <Button
                  style={styles.textInputButton}
                  title="Send"
                  onPress={this.onSendMessage}
                />
              </View>
            </KeyboardAccessoryView>
          </>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Chat.propTypes = {
  screenProps: PropTypes.shape({
    currentUserId: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
    conversations: ConversationsPropType,
  }).isRequired,
};

export default Chat;
