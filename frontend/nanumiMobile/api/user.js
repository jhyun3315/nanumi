import {API_END_POINT} from './constant';

import axios from 'axios';

export const requestEmailDuplicateCheck = async email => {
  const response = await axios.get(`${API_END_POINT}/users/check/${email}`);
  return response.data;
};

export const requestSignup = async data => {
  const response = await axios.post(`${API_END_POINT}/users/join`, data);
  return response.data;
};

export const requestLogin = async data => {
  const response = await axios.post(`${API_END_POINT}/users/login`, data);
  return response.data;
};

export const requestGetProfile = async userId => {
  const response = await axios.get(`${API_END_POINT}/users/${userId}`);
  return response.data;
};

export const requestProfileUpdate = async (userId, data) => {
  const response = await axios.patch(`${API_END_POINT}/users/${userId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requsetUpdateCoordinate = async (userId, data) => {
  const response = await axios.patch(
    `${API_END_POINT}/users/address/${userId}`,
    data,
  );
  return response.data;
};
