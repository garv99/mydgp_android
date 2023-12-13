import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_VERIFY_FAIL,
  LOGIN_VERIFY_REQUEST,
  LOGIN_VERIFY_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_VERIFY_FAIL,
  REGISTER_VERIFY_REQUEST,
  REGISTER_VERIFY_SUCCESS,
} from '../constants/UserConstants';
import axiosInstance, {BASE_URL} from '../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// send OTP FOR LOGIN
export const sendOTPLogin = contactNumber => async dispatch => {
  try {
    dispatch({type: LOGIN_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/login/otp/send`,
      {contactNumber},
      config,
    );

    dispatch({type: LOGIN_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Verify OTP & Login
export const loginViaOTP = contactNumber => async dispatch => {
  try {
    dispatch({type: LOGIN_VERIFY_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/login/otp/verify`,
      {contactNumber},
      config,
    );
    await AsyncStorage.setItem('token', JSON.stringify(data.token));

    dispatch({type: LOGIN_VERIFY_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOGIN_VERIFY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// send OTP FOR Registration
export const sendOTPRegistration = contactNumber => async dispatch => {
  try {
    dispatch({type: REGISTER_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/register/otp/send`,
      {contactNumber},
      config,
    );

    dispatch({type: REGISTER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Enter details for registration via OTP
export const EnterDetailsOPTPRegistration = registrationData => async dispatch => {
  try {
    dispatch({type: REGISTER_VERIFY_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/register/otp`,
      registrationData,
      config,
    );
    await AsyncStorage.setItem('token', JSON.stringify(data.token));

    dispatch({type: REGISTER_VERIFY_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: REGISTER_VERIFY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// load existing user
export const loadUser = () => async dispatch => {
  try {
    dispatch({type: LOAD_USER_REQUEST});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/me`, {});

    dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout user
export const logout = () => async dispatch => {
  try {
    await axiosInstance.get(`${BASE_URL}/api/v1/logout`);
    await AsyncStorage.clear();
    dispatch({type: LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Used to clear all the errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
