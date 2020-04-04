import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoading from '../screens/AuthLoading';
import AuthNavigator from './AuthNavigator';
import AppTabNavigator from './CustomAppNavigator';


const NavigatorContainer = createSwitchNavigator({
  AuthLoading,
  Auth: AuthNavigator,
  App: AppTabNavigator,
});

export default createAppContainer(NavigatorContainer);
