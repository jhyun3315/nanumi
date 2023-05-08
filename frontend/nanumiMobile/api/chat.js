import axios from 'axios';
import {API_END_POINT} from './constant';

export const requestCreateChatRoom = async data => {
  const response = await axios.post(`${API_END_POINT}/chat/room`, data);
  return response.data;
};

export const requestGetMyChatRoom = async userId => {
  const response = await axios.get(
    `${API_END_POINT}/chat/findmyroom?user=${userId}`,
  );
  return response.data;
};

export const requestGetTop20ChatLog = async roomId => {
  const response = await axios.get(
    `${API_END_POINT}/chat/chatlog?roomSeq=${roomId}`,
  );
  return response.data;
};
