import React from 'react';
import Auth from '@aws-amplify/auth';
import AppNavigator from './AppNavigator';
import helpers from '../helpers';

/* eslint-disable no-tabs */
/*

CHAT TABLE

Columns             Type      Example
gig_ower_user_id    string    asdga-sdfasd-fasdas
interested_user_id  string    dsfad1-dafas-adsfas

MESSAGES TABLE

Columns 	    Type 	      Example
chat_id       string      string
messageId 	  string 	    12wafa-afsdf-asdffa
from_user_id 	string 	    dsfad1-dafas-adsfas
to_user_id 	  string 	    asdga-sdfasd-fasdas
content 	    string 	    hello world
create_at 	  timestamp 	2019-07-15 12:00:00

Krävs två tabeller i dynamodb.
Hämta alla chat

*/
/* eslint-enable no-tabs */

const awsUrl = 'https://jbht08al65.execute-api.eu-central-1.amazonaws.com/beta/gigs';

class CustomAppNavigator extends React.Component {
  static router = AppNavigator.router;

  constructor(props) {
    super(props);
    this.state = {
      gigs: [],
      chat: [],
      currentUserId: undefined,
    };
    this.addGig = this.addGig.bind(this);
    this.deleteGig = this.deleteGig.bind(this);
    this.getGigs = this.getGigs.bind(this);
  }

  componentDidMount = async () => {
    const user = await Auth.currentUserInfo();
    this.setState({ currentUserId: user.id });
    this.getGigs();
  }

  async getGigs() {
    try {
      const token = await helpers.token();
      const response = await fetch(awsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      const gigsRes = JSON.parse(json).Items;
      const newGigsFormatted = gigsRes.map((g) => ({ ...g, createdAt: new Date(g.createdAt) }));
      this.setState({ gigs: [...newGigsFormatted] });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async addGig(gig) {
    const { gigs, currentUserId } = this.state;
    const gigBody = { ...gig, userId: currentUserId };
    this.setState({ gigs: [...gigs, gigBody] });
    try {
      const token = await helpers.token();
      const response = await fetch(awsUrl, {
        method: 'POST',
        body: JSON.stringify({ ...gigBody, createdAt: gig.createdAt.toString() }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log('JSON: ', json)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async deleteGig(Id) {
    const { gigs } = this.state;
    const newGigs = gigs.filter((g) => g.Id !== Id);
    this.setState({ gigs: newGigs });
    try {
      const token = await helpers.token();
      const response = await fetch(awsUrl, {
        method: 'DELETE',
        body: JSON.stringify({ Id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addChat() {
    // TODO: Add chat to our state
  }

  render() {
    const { gigs, chat, currentUserId } = this.state;
    const { navigation } = this.props;

    return (
      <AppNavigator
        navigation={navigation}
        screenProps={{
          gigs,
          chat,
          currentUserId,
          addChat: this.addChat,
          addGig: this.addGig,
          getGigs: this.getGigs,
          deleteGig: this.deleteGig,
        }}
      />
    );
  }
}

export default CustomAppNavigator;
