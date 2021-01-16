import {
  SET_ERROR_DATA,
  SHOW_ERROR_DATA,
  DISMIS_ERROR_DATA,
} from "./ErrorActionTypes";

export const set_error_data = (message) => {
  return {
    type: SET_ERROR_DATA,
    payload: message,
  };
};

export const show_error_data = () => {
  return {
    type: SHOW_ERROR_DATA,
  };
};
export const dismiss_error_data = () => {
  return {
    type: DISMIS_ERROR_DATA,
  };
};
