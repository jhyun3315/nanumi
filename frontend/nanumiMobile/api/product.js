import axios from 'axios';
import {API_END_POINT} from './constant';

export const requestGetAllProduct = async (page, userId) => {
  const response = await axios.get(
    `${API_END_POINT}/products/${userId}?page=${page}`,
  );
  return response.data;
};
