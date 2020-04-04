import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Dimensions } from 'react-native';
import FindGig from '../screens/FindGig';
import CreateGig from '../screens/CreateGig';
import SingleGig from '../screens/SingleGig';

const { width } = Dimensions.get('window');

const GigNavigator = createStackNavigator({
  FindGig: {
    screen: FindGig,
    navigationOptions: () => ({
      title: 'Find a Gig',
    }),
  },
  SingleGig: {
    screen: SingleGig,
    navigationOptions: () => ({
      title: 'Single Gig',
    }),
  },
});

export default createMaterialTopTabNavigator({
  GigNavigator,
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
      fontWeight: '700',
    },
    tabStyle: {
      width: width / 2,
      borderColor: 'red',
    },
    style: {
      paddingTop: 40,
    },
    indicatorStyle: {
      backgroundColor: 'lightblue',
      height: 5,
    },
  },
});
