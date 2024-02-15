import {
  CLEAR_ERRORS,
  GET_COMPLETED_BOOKINGS_FAIL,
  GET_COMPLETED_BOOKINGS_REQUEST,
  GET_COMPLETED_BOOKINGS_SUCCESS,
  GET_FUTURE_BOOKINGS_FAIL,
  GET_FUTURE_BOOKINGS_SUCCESS,
  GET_FUTURE_BOOKINGS_REQUEST,
  GET_CURRENT_BOOKINGS_REQUEST,
  GET_CURRENT_BOOKINGS_SUCCESS,
  GET_CURRENT_BOOKINGS_FAIL,
  UPDATE_BOOKING_STATUS_REQUEST,
  UPDATE_BOOKING_STATUS_SUCCESS,
  UPDATE_BOOKING_STATUS_FAIL,
} from '../constants/BookingsConstants';

// get completed bookings of a usere
export const completedBookingsReducer = (
  state = {completedBookings: []},
  action,
) => {
  switch (action.type) {
    case GET_COMPLETED_BOOKINGS_REQUEST:
      return {
        loading: true,
        completedBookings: [],
      };
    case GET_COMPLETED_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        completedBookings: action.payload,
      };
    case GET_COMPLETED_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        completedBookings: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

// get future bookings of a usere
export const futureBookingsReducer = (
  state = {futureBookings: []},
  action,
) => {
  switch (action.type) {
    case GET_FUTURE_BOOKINGS_REQUEST:
      return {
        loading: true,
        futureBookings: [],
      };
    case GET_FUTURE_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        futureBookings: action.payload,
      };
    case GET_FUTURE_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        futureBookings: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

// get current bookings of a usere
export const currentBookingsReducer = (
  state = {currentBookings: []},
  action,
) => {
  switch (action.type) {
    case GET_CURRENT_BOOKINGS_REQUEST:
      return {
        loading: true,
        currentBookings: [],
      };
    case GET_CURRENT_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBookings: action.payload,
      };
    case GET_CURRENT_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentBookings: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

// update booking status
export const updateBookingStatusReducer = (
  state = {},
  action,
) => {
  switch (action.type) {
    case UPDATE_BOOKING_STATUS_REQUEST:
      return {
        loading: true
      };
    case UPDATE_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        isUpdated: true
      };
    case UPDATE_BOOKING_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdated: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};