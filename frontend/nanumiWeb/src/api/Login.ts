import { API_END_POINT } from './constants';
import axiosInstance from './interceptor';

interface LoginData {
  email: string;
  password: string;
}
export const requestAdminLogin = async (data: LoginData) => {
  const response = await axiosInstance.post(
    `${API_END_POINT}/users/login`,
    data,
  );
  return response.data;
};
