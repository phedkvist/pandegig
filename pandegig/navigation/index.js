import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AuthLoading from '../screens/AuthLoading';
import FindGig from '../screens/FindGig';
import CreateGig from '../screens/CreateGig';
import Settings from '../screens/Settings';
import Chat from '../screens/Chat';

const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
});

const { width } = Dimensions.get('window');

const GigStackNavigator = createMaterialTopTabNavigator({
  FindGig: {
    screen: FindGig,
    navigationOptions: () => ({
      title: 'Find a Gig',
    }),
  },
  CreateGig: {
    screen: CreateGig,
    navigationOptions: () => ({
      title: 'Create a Gig',
    }),
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      width: width / 2,
    },
    style: {
      paddingTop: 50,
    },
  },
});

const AppTabNavigator = createBottomTabNavigator(
  {
    Gigs: {
      screen: GigStackNavigator,
    },
    Chat: {
      screen: Chat,
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

const AppNavigator = createSwitchNavigator({
  AuthLoading,
  Auth: AuthStackNavigator,
  App: AppTabNavigator,
});

export default createAppContainer(AppNavigator);
