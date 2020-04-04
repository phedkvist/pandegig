import { createStackNavigator } from 'react-navigation-stack';
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';

export default createStackNavigator({
  ChatList: {
    screen: ChatList,
  },
  Chat: {
    screen: Chat,
  },
});
