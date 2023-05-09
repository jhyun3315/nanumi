import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_END_POINT} from './constant';

export const handleApiError = async (error, user, setUser, navigation) => {
  if (error.response.data.code === 403) {
    const data = {
      email: user.email,
      accessToken: user.access_token,
      refreshToken: user.refresh_token,
    };
    console.log('resposne', data);
    const response = await axios.post(`${API_END_POINT}/users/isRTValid`, data);
    if (response.status === 200) {
      console.log(response);
      const updateUser = {
        ...user,
        access_token: response.data.accessToken,
        refresh_token: response.data.refreshToken,
      };
      console.log('재발급', updateUser);
      await AsyncStorage.setItem('user', JSON.stringify(updateUser));
      setUser(updateUser);
    }
    if (response.data.code === 400) {
      await AsyncStorage.removeItem('user');
      setUser({});
      console.log('리프레시도 만료');
      navigation.navigate('Login');
    }
  }
};
