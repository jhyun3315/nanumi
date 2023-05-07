import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
const Test = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const roomId = 1;
  const sender = 100;
  useEffect(() => {
    // WebSocket 클라이언트 객체 생성
    const ws = new WebSocket('ws:///172.30.1.3:8080/ws/websocket', {
      origin: '*',
      withCredentials: true,
    });

    // WebSocket 클라이언트 객체 연결 시도
    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);

      // Send join message
      const joinMessage = {
        type: 'TALK',
        roomId: roomId,
        sender: sender,
        message: 'joined the chat',
      };
      ws.send(JSON.stringify(joinMessage));
    };

    // WebSocket 클라이언트 객체 연결 해제 시
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    ws.onerror = e => {
      console.log(e);
    };
    // WebSocket 클라이언트 객체로부터 메시지 수신 시
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message received:', message);

      // 새 메시지를 배열의 첫 번째 위치에 추가하여 보여줌
      setMessages(prevState => [message, ...prevState]);
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (socket !== null) {
        socket.close();
      }
    };
  }, []);
  const sendMessage = messageText => {
    if (socket !== null) {
      const message = {
        type: 'TALK',
        roomId: roomId,
        sender: sender,
        message: messageText,
      };
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <View>
      <Text>Chat Room</Text>
      {messages.map((message, index) => (
        <Text key={index}>{`${message.sender}: ${message.message}`}</Text>
      ))}
    </View>
  );
};

export default Test;
