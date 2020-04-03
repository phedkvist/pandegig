import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';

const ChatList = ({ navigation }) => {
  const goToChat = useCallback(() => {
    navigation.navigate('Chat', { name: 'test' });
  }, [navigation]);
  return (
    <View>
      <Text>Chat List</Text>
      <Button
        onPress={goToChat}
      >
        Chat Item
      </Button>
    </View>
  );
};
export default ChatList;
