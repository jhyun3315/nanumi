import axios from 'axios';
import {API_END_POINT} from './constant';

export const requestGetAllProduct = async (userId, page) => {
  const response = await axios.get(
    `${API_END_POINT}/products/${userId}?page=${page}`,
  );
  return response.data;
};

export const requestGetDetailProduct = async productId => {
  const response = await axios.get(
    `${API_END_POINT}/products/detail/${productId}`,
  );
  return response.data;
};

export const requestGetCategoryProduct = async (categoryId, userId, page) => {
  const response = await axios.get(
    `${API_END_POINT}/products/categories/${categoryId}/${userId}?page=${page}`,
  );
  return response.data;
};

export const requestCreateProduct = async (userId, data) => {
  const response = await axios.post(
    `${API_END_POINT}/products/${userId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const requestDeleteProduct = async productId => {
  const response = await axios.delete(`${API_END_POINT}/products/${productId}`);
  return response.data;
};

export const requsetGetDivideProduct = async (userId, page) => {
  const response = await axios.get(
    `${API_END_POINT}/users/products/${userId}?page=${page}`,
  );
  return response.data;
};
