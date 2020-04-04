import React from 'react';
import AppNavigator from './AppNavigator';

class CustomAppNavigator extends React.Component {
  static router = AppNavigator.router;

  constructor(props) {
    super(props);
    this.state = {
      gigs: [],
      chat: [],
    };
  }

  componentDidMount = () => {
    // TODO: Fetch all data including gigs and chat from server
  }

  // eslint-disable-next-line class-methods-use-this
  addGig() {
    // TODO: Add gig to our state
  }

  // eslint-disable-next-line class-methods-use-this
  addChat() {
    // TODO: Add chat to our state
  }

  render() {
    const { gigs, chat } = this.state;
    const { navigation } = this.props;

    return (
      <AppNavigator
        navigation={navigation}
        screenProps={{
          gigs,
          chat,
          addChat: this.addChat,
          addGig: this.addGig,
        }}
      />
    );
  }
}

export default CustomAppNavigator;
