import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({});
axiosInstance.interceptors.request.use(async function (config) {
  let token = await AsyncStorage.getItem('token');
  token = token ? JSON.parse(token) : '';
  
  config.headers.Authorization = `${token}`;
  return config;
});

// stag - https://my-dgp-backend.onrender.com
// local - http://192.168.1.8:4000

export const BASE_URL = "https://my-dgp-backend.onrender.com"
export default axiosInstance;
