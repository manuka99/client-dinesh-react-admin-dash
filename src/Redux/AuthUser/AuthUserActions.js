import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
  SET_APP_THEME,
} from "./AuthUserActionTypes";
import api from "../../util/api";

export const fetch_auth_user_data_success = (userData) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: userData,
  };
};

export const fetch_auth_user_data_error = (error) => {
  return {
    type: FETCH_USER_ERROR,
    payload: error,
  };
};

export const fetch_auth_user_data_request = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const user_login = () => {
  return {
    type: USER_LOGIN,
  };
};

export const user_logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const set_app_theme = (theme) => {
  return {
    type: SET_APP_THEME,
    payload: theme,
  };
};

//side effects
export const fetch_user_data = () => {
  return (dispatch) => {
    dispatch(fetch_auth_user_data_request());
    api()
      .get("/redux/user")
      .then((res) => {
        console.log("ssss");
        const payload = {
          user: res.data.user,
          roles: res.data.roles,
        };
        dispatch(fetch_auth_user_data_success(payload));
        if (payload.user !== null && payload.user.id) dispatch(user_login());
        else dispatch(user_logout());
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500)
            dispatch(
              fetch_auth_user_data_error(
                "User must log in to access protected features."
              )
            );
          else dispatch(fetch_auth_user_data_error(error.message));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          dispatch(fetch_auth_user_data_error(error.message));
        }
        console.log(error.config);
      });
  };
};
