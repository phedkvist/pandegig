import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Auth from '@aws-amplify/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
    };
  }

  async componentDidMount() {
    await this.loadApp();
  }

  async loadApp() {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        this.setState({ userToken: user.signInUserSession.accessToken.jwtToken });
      })
      .catch(() => console.log('err signing in'));
    const { navigation } = this.props;
    const { userToken } = this.state;
    navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  }
}
