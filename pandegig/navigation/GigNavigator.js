import { createStackNavigator } from 'react-navigation-stack';
import FindGig from '../screens/FindGig';
import SingleGig from '../screens/SingleGig';


export default createStackNavigator({
  FindGig: {
    screen: FindGig,
    navigationOptions: () => ({
      title: 'Find a Gig',
    }),
  },
  SingleGig: {
    screen: SingleGig,
    navigationOptions: () => ({
      title: '',
    }),
  },
});
