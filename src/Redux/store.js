import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthUserReducer } from "./AuthUser/AuthUserReducer";
import { ErrorReducer } from "./Errors/ErrorReducer";

const rootReducer = combineReducers({
  currentUser: AuthUserReducer,
  errors: ErrorReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
