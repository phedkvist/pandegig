import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Settings from '../screens/Settings';
import ChatNavigator from './ChatNavigator';
import GigNavigator from './GigNavigator';

export default createBottomTabNavigator(
  {
    Gigs: {
      screen: GigNavigator,
    },
    Chat: {
      screen: ChatNavigator,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = Ionicons;
        let iconName;
        const size = 25;
        if (routeName === 'Home') {
          iconName = 'home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        } else if (routeName === 'Chat') {
          iconName = 'chat';
        } else if (routeName === 'Gigs') {
          iconName = 'dashboard';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={size} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2a6bcc',
      inactiveTintColor: 'gray',
    },
  },
);
