import React from 'react';
import StackNavigator from './navigator/StackNavigator';
import {StatusBar} from 'react-native';
import {RecoilRoot} from 'recoil';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <RecoilRoot>
      <PaperProvider>
        <StatusBar />
        <StackNavigator />
      </PaperProvider>
    </RecoilRoot>
  );
};

export default App;
