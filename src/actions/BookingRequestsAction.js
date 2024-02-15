import axiosInstance, {BASE_URL} from '../Axios';
import {
  CLEAR_ERRORS,
  GET_ALL_BOOKING_REQUESTS_FAIL,
  GET_ALL_BOOKING_REQUESTS_REQUEST,
  GET_ALL_BOOKING_REQUESTS_SUCCESS,
  UPDATE_BOOKING_REQUEST_STATUS_FAIL,
  UPDATE_BOOKING_REQUEST_STATUS_REQUEST,
  UPDATE_BOOKING_REQUEST_STATUS_SUCCESS,
} from '../constants/BookingRequestsConstants';

// get all booking requests
export const getAllBookingRequests = () => async dispatch => {
  try {
    dispatch({type: GET_ALL_BOOKING_REQUESTS_REQUEST});
    const {data} = await axiosInstance.get(
      `${BASE_URL}/api/v1/bookingrequests`,
    );

    dispatch({
      type: GET_ALL_BOOKING_REQUESTS_SUCCESS,
      payload: data.bookingRequests,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_BOOKING_REQUESTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update status of booking request
export const updateBookingRequestStatus =
  ({bookingRequestId, status}) =>
  async dispatch => {
    try {
      dispatch({type: UPDATE_BOOKING_REQUEST_STATUS_REQUEST});

      const config = {headers: {'Content-Type': 'application/json'}};
      const {data} = await axiosInstance.post(
        `${BASE_URL}/api/v1/bookingrequests/updateStatus/${bookingRequestId}`,
        {status},
        config,
      );

      dispatch({
        type: UPDATE_BOOKING_REQUEST_STATUS_SUCCESS,
        payload: data.booking,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BOOKING_REQUEST_STATUS_FAIL,
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
