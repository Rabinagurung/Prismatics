import AsyncStorage from '@react-native-async-storage/async-storage';
import axs from 'axios';
import { updateRefreshToken } from '../utils/auth';

const baseurl = 'https://firestore.googleapis.com/v1';
const project_Id = 'prismatics-a497c';

const url = `${baseurl}/projects/${project_Id}/databases/(default)/documents`;

const axios = axs.create({
  baseURL: url,
});

// const refereshToken = await AsyncStorage.getItem('refreshToken');
//request intercept to axios

axios.interceptors.request.use(async (req) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

//Response interceptor to unwrap data and handle token refresh
axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken'); // Function to get the current refresh token
      const newAccessToken = await updateRefreshToken(refreshToken); // Function to refresh the access token
      if (newAccessToken) {
        // Update the Authorization header with the new token
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
