import React from 'react';
import Auth from '@aws-amplify/auth';
import AppNavigator from './AppNavigator';
import helpers from '../helpers';
import { v1 } from 'uuid';


// AWS API Gateway Endpoints
const GIGS_URL = 'https://jbht08al65.execute-api.eu-central-1.amazonaws.com/beta/gigs';
const CONVERSATION_URL = 'https://jbht08al65.execute-api.eu-central-1.amazonaws.com/beta/conversation';
const CONVERSATION_MESSAGE_URL = 'https://jbht08al65.execute-api.eu-central-1.amazonaws.com/beta/conversation/message';
const CONVERSATIONS_URL = 'https://jbht08al65.execute-api.eu-central-1.amazonaws.com/beta/conversations';

class CustomAppNavigator extends React.Component {
  static router = AppNavigator.router;

  constructor(props) {
    super(props);
    this.state = {
      gigs: [],
      chat: [],
      currentUserId: undefined,
      currentUserName: '',
    };
    this.addGig = this.addGig.bind(this);
    this.deleteGig = this.deleteGig.bind(this);
    this.getGigs = this.getGigs.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.getConversations = this.getConversations.bind(this);
  }

  componentDidMount = async () => {
    const user = await Auth.currentUserInfo();
    this.setState({ currentUserId: user.username, currentUserName: user.attributes.name });
    // this.getGigs();
    this.getConversations();
  }

  async getGigs() {
    try {
      const token = await helpers.token();
      const response = await fetch(GIGS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      const gigsRes = JSON.parse(json).Items;
      // console.log('GET GIGS RESPONSE: ', gigsRes);
      const newGigsFormatted = gigsRes.map((g) => ({ ...g, createdAt: new Date(g.createdAt) }));
      this.setState({ gigs: [...newGigsFormatted] });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async addGig(gig) {
    const { gigs, currentUserId, currentUserName } = this.state;
    const gigBody = { ...gig, userId: currentUserId, currentUserName };
    this.setState({ gigs: [...gigs, gigBody] });
    try {
      const token = await helpers.token();
      const response = await fetch(GIGS_URL, {
        method: 'POST',
        body: JSON.stringify({ ...gigBody, createdAt: gig.createdAt.toString() }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log('JSON: ', json);
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
      const response = await fetch(GIGS_URL, {
        method: 'DELETE',
        body: JSON.stringify({ Id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  /*
      Users
      ------
      cognitoId
      name
      id
      registered
              
      Conversation
      ------
      id: string
      name: string
      createdAt: date
              
      UserConversation
      ------
      userId
      conversationId
      
      Message
      -----
      id
      conversationId: string
      content: string
      createdAt: string
      sender: userId
      isSent: bool
  */
  // eslint-disable-next-line class-methods-use-this
  async createConversation(gigId, gigUserId, gigTitle, content) {
    const { currentUserId, currentUserName } = this.state;
    const createdAt = new Date().toString();
    const conversationId = v1();
    const messageId = v1();
    const conversation = { conversationId, currentUserId, currentUserName, gigUserId, gigId, gigTitle, content, createdAt, messageId };
    console.log('create Conversation: ', conversation);
    try {
      const token = await helpers.token();
      const response = await fetch(CONVERSATION_URL, {
        method: 'POST',
        body: JSON.stringify(conversation),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log('JSON: ', json);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getConversations() {
    try {
      const token = await helpers.token();
      const response = await fetch(CONVERSATIONS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log('JSON: ', json);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    const {
      gigs, chat, currentUserId, name,
    } = this.state;
    const { navigation } = this.props;

    return (
      <AppNavigator
        navigation={navigation}
        screenProps={{
          gigs,
          chat,
          currentUserId,
          name,
          createConversation: this.createConversation,
          addGig: this.addGig,
          getGigs: this.getGigs,
          deleteGig: this.deleteGig,
        }}
      />
    );
  }
}

export default CustomAppNavigator;
