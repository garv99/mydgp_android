import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_VERIFY_REQUEST,
  LOGIN_VERIFY_FAIL,
  LOGIN_VERIFY_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_VERIFY_REQUEST,
  REGISTER_VERIFY_SUCCESS,
  REGISTER_VERIFY_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERRORS,
  UPDATE_PROFILE_RESET,
  ON_DUTY_TOGGLE_REQUEST,
  ON_DUTY_TOGGLE_SUCCESS,
  ON_DUTY_TOGGLE_FAIL,
} from '../constants/UserConstants';

export const UserReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGIN_VERIFY_REQUEST:
    case LOAD_USER_REQUEST:
    case REGISTER_REQUEST:
    case REGISTER_VERIFY_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        cansendOtp: true,
      };
    case LOGIN_FAIL:
    case LOGIN_VERIFY_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        cansendOtp: false,
      };
    case LOGIN_VERIFY_SUCCESS:
    case LOAD_USER_SUCCESS:
    case REGISTER_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case REGISTER_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
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

// Update User Details
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case ON_DUTY_TOGGLE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case UPDATE_PROFILE_SUCCESS:
    case ON_DUTY_TOGGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
    case ON_DUTY_TOGGLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
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
