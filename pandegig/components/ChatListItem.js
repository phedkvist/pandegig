import React, { useCallback } from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  item: {
    height: 80,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 4,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: 'lightblue',
    textAlign: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    marginBottom: 7,
  },
  lastMessage: {
    color: 'gray',
  },
});

const ChatListItem = ({ navigation, conversation }) => {
  const onNavigateToChat = useCallback(() => {
    navigation.navigate('Chat', { conversation });
  }, [navigation, conversation]);

  const { id, user, title } = conversation;
  const split = user.username.split(' ');
  const avatar = split.length > 1 ? split[0][0] + split[1][0] : split[0][0];
  const sortedMessages = conversation.messages.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );
  const lastMessage = sortedMessages[sortedMessages.length - 1].content;
  return (
    <TouchableOpacity
      key={id}
      style={styles.item}
      // eslint-disable-next-line react/jsx-no-bind
      onPress={onNavigateToChat}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={{ textAlign: 'center', justifyContent: 'center' }}>
            {avatar}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

ChatListItem.propTypes = {
  conversation: PropTypes.shape({
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        conversationId: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        isSent: PropTypes.bool.isRequired,
        sender: PropTypes.string.isRequired,
      }),
    ),
    createdAt: PropTypes.string.isRequired,
    gigId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      cognitoId: PropTypes.string.isRequired,
      registered: PropTypes.bool.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ChatListItem;
