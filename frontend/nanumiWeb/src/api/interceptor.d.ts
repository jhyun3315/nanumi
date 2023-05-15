import axios, { AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers?: Record<string, string>;
}

declare const axiosInstance: axios.AxiosInstance<CustomAxiosRequestConfig>;
export default axiosInstance;
