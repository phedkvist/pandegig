import React from 'react';
import { v1 } from 'uuid';
import AppNavigator from './AppNavigator';


// Temporary gigs for testing pruposes
const initialGigs = [
  {
    title: 'Maggan behöver hjälp',
    description: 'adsfgagdsf',
    earnings: '200',
    location: 'Fjollträsk',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan behöver hyra \'Speed\' nu!!!',
    description: 'adsfgagdsf',
    earnings: '200',
    location: 'Bromma',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan söker tinderdejt, 100spänn!',
    description: 'Bo i Nacka eller Ingarö <3',
    earnings: '100',
    location: 'Nacka',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan söker tinderdejt, 100spänn1!',
    description: 'Bo i Nacka eller Ingarö <3',
    earnings: '100',
    location: 'Nacka',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan söker tinderdejt, 100spänn2!',
    description: 'Bo i Nacka eller Ingarö <3',
    earnings: '100',
    location: 'Nacka',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan söker tinderdejt, 100spänn3!',
    description: 'Bo i Nacka eller Ingarö <3',
    earnings: '100',
    location: 'Nacka',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan söker tinderdejt, 100spänn4!',
    description: 'Bo i Nacka eller Ingarö <3',
    earnings: '100',
    location: 'Nacka',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan söker tinderdejt, 100spänn5!',
    description: 'Bo i Nacka eller Ingarö <3',
    earnings: '100',
    location: 'Nacka',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
  {
    title: 'Pierkan söker tinderdejt, 100spänn6!',
    description: 'Bo i Nacka eller Ingarö <3',
    earnings: '100',
    location: 'Nacka',
    phone: '0731234567',
    id: v1(),
    cardColor: '#eef9bf',
  },
];

/* eslint-disable no-tabs */
/*

MESSAGES TABLE

Columns 	    Type 	      Example
messageId 	  integer 	  1001
from_user_id 	integer 	  sender
to_user_id 	  integer 	  receiver
content 	    string 	    hello world
create_at 	  timestamp 	2019-07-15 12:00:00

*/
/* eslint-enable no-tabs */


class CustomAppNavigator extends React.Component {
  static router = AppNavigator.router;

  constructor(props) {
    super(props);
    this.state = {
      gigs: initialGigs,
      chat: [],
    };
    this.addGig = this.addGig.bind(this);
  }

  componentDidMount = () => {
    // TODO: Fetch all data including gigs and chat from server
  }

  // eslint-disable-next-line class-methods-use-this
  addGig(gig) {
    // TODO: Add gig to our state
    const { gigs } = this.state;
    this.setState({ gigs: [...gigs, gig] });
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
