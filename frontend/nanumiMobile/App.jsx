import React from 'react';
import StackNavigator from './navigator/StackNavigator';
import {StatusBar} from 'react-native';
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <StatusBar />
      <StackNavigator />
    </RecoilRoot>
  );
};

export default App;
