import React, {useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as encoding from 'text-encoding';
import StackNavigator from './navigator/StackNavigator';
import {
  NotificationListener,
  requestUserPermission,
} from './util/pushnotification_helper';

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
