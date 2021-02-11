import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthUserReducer } from "./AuthUser/AuthUserReducer";
import { ErrorReducer } from "./Errors/ErrorReducer";
import { RedirectReducer } from "./Redirection/RedirectReducer";

const rootReducer = combineReducers({
  currentUser: AuthUserReducer,
  errors: ErrorReducer,
  redirect: RedirectReducer,
});

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(logger, thunk))
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
