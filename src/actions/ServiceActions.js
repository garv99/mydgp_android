import axiosInstance, {BASE_URL} from '../Axios';
import {
  GET_ALL_SERVICES_FAIL,
  GET_ALL_SERVICES_REQUESTS,
  GET_ALL_SERVICES_SUCCESS,
} from '../constants/ServiceConstants';

// get all services
export const getAllServices = () => async dispatch => {
  try {
    dispatch({type: GET_ALL_SERVICES_REQUESTS});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/services`);

    dispatch({type: GET_ALL_SERVICES_SUCCESS, payload: data.services});
  } catch (error) {
    dispatch({
      type: GET_ALL_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};
