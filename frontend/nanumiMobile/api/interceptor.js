import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_END_POINT} from './constant';
import {navigationRef} from '../navigator/StackNavigator';

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    if (user && user.access_token) {
      config.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    if (error.response.status === 401 && !originalRequest._retry && user) {
      originalRequest._retry = true;
      try {
        const data = {
          email: user.email,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
        };
        const response = await axios.post(
          `${API_END_POINT}/users/isRTValid`,
          data,
        );
        if (response.data.accessToken) {
          const updateUser = {
            ...user,
            access_token: response.data.accessToken,
            refresh_token: response.data.refreshToken,
          };
          await AsyncStorage.setItem('user', JSON.stringify(updateUser));
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${updateUser.access_token}`;
          return axiosInstance(originalRequest);
        }
        if (response.data.code === 400) {
          await AsyncStorage.removeItem('user');
          navigationRef.current?.navigate('Login');
          return Promise.reject(error);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
