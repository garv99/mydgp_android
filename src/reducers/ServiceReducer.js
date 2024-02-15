import { GET_ALL_SERVICES_FAIL, GET_ALL_SERVICES_REQUESTS, GET_ALL_SERVICES_SUCCESS } from "../constants/ServiceConstants";

export const serviceReducer = (state = {services: []}, action) => {
  switch(action.type) {
    case GET_ALL_SERVICES_REQUESTS:
      return {
        loading: true,
        services: []
      }
    case GET_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload
      }
      case GET_ALL_SERVICES_FAIL:
        return {
        ...state,
        loading: false,
        error: action.payload,
        services: []
      }
    default:
      return {
        ...state
      }
  }
}