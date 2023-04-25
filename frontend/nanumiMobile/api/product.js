import axios from 'axios';
import {API_END_POINT} from './constant';

export const getAllProduct = async () => {
  const response = await axios.get(`${API_END_POINT}/products`);
  return response;
};
