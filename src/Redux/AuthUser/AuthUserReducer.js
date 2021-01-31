import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  USER_LOGIN,
  USER_2FA_REQUIRED,
  USER_LOGOUT,
  SET_APP_THEME,
} from "./AuthUserActionTypes";

const initialState = {
  login: false,
  is2faRequired: false,
  logout: false,
  error: "",
  user_data: "",
  loading: true,
  theme: null,
};

export const AuthUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user_data: action.payload,
        error: "",
        loading: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        user_data: "",
        error: action.payload,
        loading: false,
      };
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        is2faRequired: false,
        login: true,
        logout: false,
      };
    case USER_2FA_REQUIRED:
      return {
        ...state,
        is2faRequired: true,
        login: false,
        logout: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        is2faRequired: false,
        login: false,
        logout: true,
      };
    case SET_APP_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
