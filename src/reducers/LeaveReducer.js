import {
  ALL_LEAVES_FAIL,
  ALL_LEAVES_REQUEST,
  ALL_LEAVES_SUCCESS,
  APPLY_LEAVE_FAIL,
  APPLY_LEAVE_REQUEST,
  APPLY_LEAVE_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/LeaveConstants';

export const applyLeaveReducer = (state = {leave: {}}, action) => {
  switch (action.type) {
    case APPLY_LEAVE_REQUEST:
      return {
        loading: true,
      };
    case APPLY_LEAVE_SUCCESS:
      return {
        loading: false,
        isApplied: true,
        leave: action.payload,
      };
    case APPLY_LEAVE_FAIL:
      return {
        loading: false,
        isApplied: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// get all leaves of the user
export const getLeavesReducer = (state = {leaves: []}, action) => {
  switch (action.type) {
    case ALL_LEAVES_REQUEST:
      return {
        loading: true,
      };
    case ALL_LEAVES_SUCCESS:
      return {
        loading: false,
        leaves: action.payload,
      };
    case ALL_LEAVES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
