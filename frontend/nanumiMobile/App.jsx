import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import StackNavigator from './navigator/StackNavigator';

const App = () => {
  return (
    <>
      <StatusBar />
      <StackNavigator />
    </>
  );
};

export default App;
