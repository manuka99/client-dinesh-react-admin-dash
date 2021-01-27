import axios from "axios";
import store from "../Redux/store";
import { set_error_data, user_logout } from "../Redux";
import swal from "sweetalert";

export default function api(nonApi = false) {
  const api = axios.create({
    baseURL: `http://localhost:8000${nonApi ? "" : "/api"}`,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      //  const originalRequest = error.config;
      if (error.response) {
        if (error.response.status === 401) {
          store.dispatch(user_logout());
        } else if (error.response.status === 403) {
          //no required roles
          store.dispatch(
            set_error_data({
              title:
                " 403: You do not have permision for the requested content.",
              body:
                "You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation, if you think this is an mistake please refresh or try log in again.",
            })
          );
        } else if (error.response.status === 419) {
          swal("Unexpected error 419: Refresh the webpage and try again");
        } else if (error.response.status === 422) {
          //errors in form submit
          return Promise.reject(error);
        } else if (error.response.status === 423) {
          //password confirmation
          return Promise.reject(error);
        } else {
          swal(error.message);
          return Promise.reject(error);
        }
      } else {
        swal(error.message);
        return Promise.reject(error);
      }
    }
  );

  return api;
}
