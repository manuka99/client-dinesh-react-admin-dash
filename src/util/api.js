import axios from "axios";
import { LogOut } from "./auth";
import store from "../Redux/store";
import { set_error_data } from "../Redux";

export default function api(nonApi = false) {
  const api = axios.create({
    baseURL: `http://localhost:8000${nonApi ? "" : "/api"}`,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      //  const originalRequest = error.config;
      if (error.response.status === 401) {
        LogOut();
        return Promise.reject({ status: 401, errors: ["Unauthorized"] });
      }
      if (error.response.status === 403) {
        store.dispatch(set_error_data("not a admin"));
        return Promise.reject({ status: 403, errors: ["Not an admin"] });
      } else if (error.response.status === 422) {
        let errors = Object.values(error?.response?.data?.errors || {});

        return Promise.reject({
          status: 422,
          errorsRaw: errors,
          errors: errors.reduce((error) => error),
        });
      }
      return Promise.reject(error);
    }
  );

  return api;
}
