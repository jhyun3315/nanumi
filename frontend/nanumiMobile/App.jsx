import React from 'react';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as encoding from 'text-encoding';
import StackNavigator from './navigator/StackNavigator';

const queryClient = new QueryClient();
const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
