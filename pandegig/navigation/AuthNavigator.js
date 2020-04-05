import { createStackNavigator } from 'react-navigation-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

export default createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: () => ({
      title: '',
      headerStyle: {
        backgroundColor: '#2a6bcc',
        borderBottomColor: '#2a6bcc',
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
      },

    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#2a6bcc',
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
      },

    }),
  },
});
