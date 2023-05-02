import React from 'react';
import StackNavigator from './navigator/StackNavigator';
import {StatusBar} from 'react-native';
import {RecoilRoot} from 'recoil';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

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
