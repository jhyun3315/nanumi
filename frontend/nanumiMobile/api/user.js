import {API_END_POINT} from './constant';

import axios from 'axios';
import axiosInstance from './interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleApiError} from './authErrorHadnler';

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

export const requestGetProfile = async (userId, user, setUser, navigation) => {
  try {
    const response = await axiosInstance.get(
      `${API_END_POINT}/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    // 액세스 토큰이 만료됐으면
    handleApiError(error, user, setUser, navigation);
  }
};

export const requestProfileUpdate = async (userId, data) => {
  try {
    const response = await axiosInstance.patch(
      `${API_END_POINT}/users/${userId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const requsetUpdateCoordinate = async (userId, data) => {
  const response = await axiosInstance.patch(
    `${API_END_POINT}/users/address/${userId}`,
    data,
  );
  return response.data;
};
