import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({});
axiosInstance.interceptors.request.use(async function (config) {
  let token = await AsyncStorage.getItem('token');
  token = token ? JSON.parse(token) : '';
  
  config.headers.Authorization = `${token}`;
  return config;
});

export const BASE_URL = "http://192.168.1.7:4000"
export default axiosInstance;
