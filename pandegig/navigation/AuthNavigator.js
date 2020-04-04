import { createStackNavigator } from 'react-navigation-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

export default createStackNavigator({
  SignIn: {
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
});
