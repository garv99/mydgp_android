import axiosInstance, { BASE_URL } from "../Axios";
import { ALL_LEAVES_FAIL, ALL_LEAVES_REQUEST, ALL_LEAVES_SUCCESS, APPLY_LEAVE_FAIL, APPLY_LEAVE_REQUEST, APPLY_LEAVE_SUCCESS, CLEAR_ERRORS } from "../constants/LeaveConstants";

// apply for a leave
export const applyLeave = (leaveData) => async dispatch => {
  try {
    dispatch({type: APPLY_LEAVE_REQUEST});

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.post(`${BASE_URL}/api/v1/leave/new`, leaveData, config);

    dispatch({type: APPLY_LEAVE_SUCCESS, payload: data.leave});
  } catch (error) {
    dispatch({
      type: APPLY_LEAVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all leaves
export const getAllLeaves = () => async dispatch => {
  try {
    dispatch({ type: ALL_LEAVES_REQUEST })
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/leave/all`);
    
    dispatch({ type: ALL_LEAVES_SUCCESS, payload: data.leaves })
  } catch (error) {
    dispatch({
      type: ALL_LEAVES_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Used to clear all the errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};