import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
} from "./AuthUserActionTypes";

const initialState = {
  error: "",
  user_data: "",
  loading: true,
};

export const AuthUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...initialState,
        user_data: action.payload,
        loading: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...initialState,
        error: action.payload,
        loading: false,
      };
    case FETCH_USER_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    default:
      return state;
  }
};
