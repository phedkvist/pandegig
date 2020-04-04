import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Dimensions } from 'react-native';
import FindGig from '../screens/FindGig';
import CreateGig from '../screens/CreateGig';

const { width } = Dimensions.get('window');


export default createMaterialTopTabNavigator({
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
      fontWeight: '700',
    },
    tabStyle: {
      width: width / 2,
      borderColor: 'red',
    },
    style: {
      paddingTop: 50,
    },
    indicatorStyle: {
      backgroundColor: 'lightblue',
      height: 5,
    },
  },
});
