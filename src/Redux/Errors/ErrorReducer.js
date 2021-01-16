import {
  SET_ERROR_DATA,
  SHOW_ERROR_DATA,
  DISMIS_ERROR_DATA,
} from "./ErrorActionTypes";

const initialState = {
  message: "",
  show: false,
};

export const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_DATA:
      return {
        message: action.payload,
        show: true,
      };
    case SHOW_ERROR_DATA:
      return {
        ...state,
        show: true,
      };
    case DISMIS_ERROR_DATA:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default ErrorReducer;
