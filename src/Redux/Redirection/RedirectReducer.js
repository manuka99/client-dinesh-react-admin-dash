import {CHANGE_REDIRECT_ROUTE} from "./RedirectActionTypes";

const initialState = {
  status: false,
  route: "",
};

export const RedirectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_REDIRECT_ROUTE:
      return {
        status: !state.status,
        route: action.payload,
      };
    default:
      return state;
  }
};
