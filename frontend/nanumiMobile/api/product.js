import axios from 'axios';
import axiosInstance from './interceptor';
import {API_END_POINT} from './constant';

export const requestGetAllProduct = async (userId, page) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/products/${userId}?page=${page}`,
  );
  return response.data;
};

export const requestGetDetailProduct = async productId => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/products/detail/${productId}`,
  );
  return response.data;
};

export const requestGetCategoryProduct = async (categoryId, userId, page) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/products/categories/${categoryId}/${userId}?page=${page}`,
  );
  return response.data;
};

export const requestCreateProduct = async (userId, data) => {
  const response = await axiosInstance.post(
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

export const requestUpdateProduct = async (productId, data) => {
  const response = await axiosInstance.patch(
    `${API_END_POINT}/products/${productId}`,
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
  const response = await axiosInstance.delete(
    `${API_END_POINT}/products/${productId}`,
  );
  return response.data;
};

export const requestSearchProduct = async (words, userId, page) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/products/search/${words}/${page}/${userId}`,
  );
  return response.data;
};

// 나눔중인 상품 목록
export const requsetGetDividingProduct = async (userId, page) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/users/matches/${userId}?page=${page}`,
  );
  return response.data;
};

// 나눔한 물건
export const requestGetDividedProductList = async (userId, page) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/users/products/${userId}?page=${page}`,
  );
  return response.data;
};

// 나눔받은 물건
export const requestGetReceivedProductList = async (userId, page) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/users/given/${userId}?page=${page}`,
  );
  return response.data;
};

//나눔 진행중
export const requestGetDonationingProductList = async (userId, page) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/users/matching/${userId}?page=${page}`,
  );
  return response.data;
};

export const requestDonationReceived = async (productId, userId) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/products/application/${productId}/${userId}`,
  );
  return response.data;
};

export const requestGetMatchingUsers = async (productId, userId) => {
  const response = await axiosInstance.get(
    `${API_END_POINT}/matches/${productId}/${userId}`,
  );
  return response.data;
};
