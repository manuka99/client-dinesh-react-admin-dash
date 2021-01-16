import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
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

//side effects
export const fetch_user_data = () => {
  return (dispatch) => {
    dispatch(fetch_auth_user_data_request());
    api()
      .get("/user")
      .then((res) => {
        const payload = {
          user: res.data.user,
          roles: res.data.roles,
        };
        dispatch(fetch_auth_user_data_success(payload));
      })
      .catch((error) => {
        dispatch(fetch_auth_user_data_error(error));
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          if (error.response.status === 500)
            dispatch(
              fetch_auth_user_data_error(
                "User must log in to access protected features."
              )
            );
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
};
