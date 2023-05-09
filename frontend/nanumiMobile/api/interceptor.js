import {API_END_POINT} from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    if (user) {
      config.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
