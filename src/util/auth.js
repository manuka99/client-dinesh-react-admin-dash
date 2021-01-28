import store from "../Redux/store";
import {fetch_user_data } from "../Redux";
import api from "./api";

export function LogIn() {
  store.dispatch(fetch_user_data());
}

export function LogOut() {
  api()
    .post("/logout")
    .then((res) => {})
    .catch((error) => {})
    .finally(() => {
      store.dispatch(fetch_user_data());
    });
}

export function isLoggedIn(roles = null) {
  const state = store.getState().currentUser;
  const user_data = state.user_data;

  let userAuth = false;
  let userRoleValidated = false;

  if (user_data !== null && user_data.user !== null && user_data.user.id)
    userAuth = true;

  if (userAuth) {
    if (roles !== undefined && roles !== null && roles.length !== 0)
      userRoleValidated = roleValidated(roles, user_data);
    else userRoleValidated = true;
  }

  return { userAuth, userRoleValidated };
}

const roleValidated = (roles, user_data) => {
  let validated = false;
  if (roles != null && user_data.roles != null) {
    roles.forEach((role) => {
      user_data.roles.forEach((user_role) => {
        if (role === user_role.name) {
          console.log(`Role: ${role}, ${user_role.name}`);
          validated = true;
        }
      });
    });
  }
  return validated;
};

// const mapStateToProps = (state) => {
//   return {
//     userData: state.user_data,
//     error: state.error,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetch_user_data: () => dispatch(fetch_user_data()),
//   };
// };

// export const logIn = () => {
//   Cookies.set("pizza_backend_is_user_logged_in", true, {
//     expires: 86400,
//     sameSite: "lax",
//   });
// };

// export const logOut = () => {
//   if (typeof window !== "undefined") {
//     // remove logged in user's cookie and redirect to login page
//     Cookies.remove("pizza_backend_is_user_logged_in", {
//       expires: 86400,
//       sameSite: "lax",
//     });
//   }
// };

// export const isLoggedIn = (reqCookies = null) => {
//   // if we don't have request cookies, get the cookie from client
//   if (!reqCookies) {
//     return !!Cookies.get("pizza_backend_is_user_logged_in");
//   }

//   // otherwise get cookie from server
//   return !!cookie.parse(reqCookies).pizza_backend_is_user_logged_in;
// };
