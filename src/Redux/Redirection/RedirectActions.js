import {CHANGE_REDIRECT_ROUTE} from "./RedirectActionTypes";

export const change_redirect_route = (route) => {
  return {
    type: CHANGE_REDIRECT_ROUTE,
    payload: route,
  };
};
