import React from 'react';
import Auth from '@aws-amplify/auth';
import { v1 } from 'uuid';
import AppNavigator from './AppNavigator';
import helpers from '../helpers';


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
      conversations: {},
      currentUserId: undefined,
      currentUserName: '',
    };
    this.addGig = this.addGig.bind(this);
    this.deleteGig = this.deleteGig.bind(this);
    this.getGigs = this.getGigs.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.getConversations = this.getConversations.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount = async () => {
    const user = await Auth.currentUserInfo();
    this.setState({ currentUserId: user.username, currentUserName: user.attributes.name });
    this.getGigs();
    this.getConversations();
  }

  async getGigs(currentLocation) {
    try {
      let latitude = 50;
      let longitude = 50;
      if (currentLocation) {
        longitude = currentLocation.coords.longitude;
        latitude = currentLocation.coords.latitude;
      }
      const token = await helpers.token();
      const url = `${GIGS_URL}?latitude=${latitude}&longitude=${longitude}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      const gigsRes = JSON.parse(json);
      // console.log('GET GIGS RESPONSE: ', gigsRes);
      const newGigsFormatted = gigsRes.map((g) => ({ ...g, createdAt: new Date(g.createdAt) }));
      this.setState({ gigs: [...newGigsFormatted] });
    } catch (error) {
      // eslint-disable-next-line no-console
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
      // console.log('JSON: ', json);
      this.setState({ conversations: json });
    } catch (error) {
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.log('JSON: ', json);
    } catch (error) {
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async createConversation(gigId, gigUserId, gigTitle, content) {
    const { currentUserId, currentUserName } = this.state;
    const createdAt = new Date().toString();
    const conversationId = v1();
    const messageId = v1();
    const userConversation1Id = v1();
    const userConversation2Id = v1();
    const conversation = {
      conversationId,
      currentUserId,
      currentUserName,
      gigUserId,
      gigId,
      gigTitle,
      content,
      createdAt,
      messageId,
      userConversation1Id,
      userConversation2Id,
    };
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
      // eslint-disable-next-line no-unused-vars
      const json = await response.json();
      this.getConversations();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    }
  }

  async sendMessage(content, conversationId) {
    const { conversations, currentUserId } = this.state;
    const id = v1();
    const message = {
      content,
      conversationId,
      createdAt: new Date().toString(),
      id,
      isSent: false,
      sender: currentUserId,
    };
    conversations[conversationId].messages.push(message);
    this.setState({ conversations });

    try {
      const token = await helpers.token();
      const response = await fetch(CONVERSATION_MESSAGE_URL, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // eslint-disable-next-line no-unused-vars
      const res = await response.json();
      if (res.statusCode === 200) {
        const { conversations: newConversations } = this.state;
        const allMessages = newConversations[conversationId].messages;
        const updatedMessage = allMessages.map((m) => {
          if (m.id === id) {
            const newM = m;
            newM.isSent = true;
          }
          return m;
        });
        newConversations[conversationId].messages = updatedMessage;
        this.setState({ conversations: newConversations });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    }
  }

  render() {
    const {
      gigs, conversations, currentUserId, name,
    } = this.state;
    const { navigation } = this.props;

    return (
      <AppNavigator
        navigation={navigation}
        screenProps={{
          gigs,
          conversations,
          currentUserId,
          name,
          createConversation: this.createConversation,
          getConversations: this.getConversations,
          addGig: this.addGig,
          getGigs: this.getGigs,
          deleteGig: this.deleteGig,
          sendMessage: this.sendMessage,
        }}
      />
    );
  }
}

export default CustomAppNavigator;
