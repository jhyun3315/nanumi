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
  try {
    const response = await axios.post(`${API_END_POINT}/users/login`, data);
    return response.data;
  } catch (error) {
    console.log('catch', error);
  }
};
