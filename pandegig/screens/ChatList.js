import React, { useCallback, useState } from 'react';
import {
  View, StyleSheet, RefreshControl, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import ChatItemList from '../components/ChatListItem';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {

  },
  search: {

  },
});


function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const ChatList = ({ screenProps, navigation }) => {
  const { conversations } = screenProps;
  // console.log('CONVERSATIONS: ', conversations);
  const conversationsArray = Object.values(conversations);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // get messages
    wait(1000).then(() => setRefreshing(false));
  }, [setRefreshing]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {conversationsArray.map((c) => (
          <ChatItemList
            key={c.id}
            conversation={c}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

ChatList.propTypes = {
  screenProps: PropTypes.shape({
    conversations: PropTypes.objectOf(
      PropTypes.shape({
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
    ),
  }).isRequired,
};

export default ChatList;
