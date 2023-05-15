import axios from 'axios';
import { API_END_POINT } from './constants';

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
      config.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const user = JSON.parse(localStorage.getItem('user'));

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
          localStorage.setItem('user', JSON.stringify(updateUser));
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${updateUser.access_token}`;
          return axiosInstance(originalRequest);
        }
        if (response.data.code === 400) {
          localStorage.removeItem('user');
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
