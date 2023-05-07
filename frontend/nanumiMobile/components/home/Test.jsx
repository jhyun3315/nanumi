import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const Test = () => {
  const client = useRef(null);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () =>
        new SockJS(`https://k8b103.p.ssafy.io/api/ws-stomp`),
      onConnect: () => {
        console.log('연결됐다.');
      },
    });

    client.current.activate();
  };

  useEffect(() => {
    connect();

    return () => {
      client.current.deactivate();
    };
  }, []);

  return (
    <View>
      <Text>Chat Room</Text>
    </View>
  );
};

export default Test;
