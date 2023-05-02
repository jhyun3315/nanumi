import axios from 'axios';
import {API_END_POINT} from './constant';

export const requestGetAllProduct = async (page, userId) => {
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
  );
  return response;
};

export const requestDeleteProduct = async productId => {
  try {
    const response = await axios.delete(
      `${API_END_POINT}/products/${productId}`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
