import {API_END_POINT} from './constant';

import axios from 'axios';
import axiosInstance from './interceptor';

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
  const response = await axiosInstance.get(`${API_END_POINT}/users/${userId}`);
  return response.data;
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

export const requestBlockUser = async (userId, data) => {
  const response = await axiosInstance.post(
    `${API_END_POINT}/block/${userId}`,
    data,
  );
  return response.data;
};

export const requsetGetBlockUser = async userId => {
  const response = await axiosInstance.get(`${API_END_POINT}/block/${userId}`);
  return response.data;
};

export const requestClearBlockUser = async (userId, data) => {
  const response = await axiosInstance.patch(
    `${API_END_POINT}/block/${userId}`,
    data,
  );
  return response.data;
};

export const requestReportUser = async (userId, data) => {
  const response = await axiosInstance.post(
    `${API_END_POINT}/reports/${userId}`,
    data,
  );
  return response.data;
};
