import React from 'react';
import Amplify from '@aws-amplify/core';
import AWSConfig from './aws-exports';
import Navigation from './navigation';

Amplify.configure(AWSConfig);

export default function App() {
  return <Navigation />;
}
