import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {

  },
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
  search: {

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
  }
});

const CHAT_LIST = [
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '1',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '2',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '3',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '4',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '5',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '6',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '7',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '8',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '9',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '10',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '11',
  },
  {
    name: 'Peter Forsberg',
    avatar: 'PH',
    lastActive: new Date('2020-04-20'),
    id: '12',
  }
];

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const ChatList = ({ navigation, chatList = CHAT_LIST }) => {
  const goToChat = useCallback(() => {
    navigation.navigate('Chat', { name: 'test' });
  }, [navigation]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // get messages
    wait(1000).then(() => setRefreshing(false));
  }, [setRefreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}></View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {chatList.map(c => (
          <TouchableOpacity
            key={c.id}
            style={styles.item}
            onPress={() => navigation.navigate('Chat', { chat: c, name: c.name })}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={{ textAlign: 'center', justifyContent: 'center' }}>{c.avatar}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{c.name}</Text>
              <Text style={styles.lastMessage}>Linus: Det låter bra - 18:32</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ChatList;
