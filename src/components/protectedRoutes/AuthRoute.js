import { Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "../../util/auth";

function AuthRoute({ path, hasAnyRoles, ...rest }) {
  const { userAuth, userRoleValidated } = isLoggedIn(hasAnyRoles);

  // console.log(
  //   `For path: ${path}, userAuth: ${userAuth}, userRoleValidated: ${userRoleValidated}`
  // );

  return !userAuth ? (
    <Navigate to="/login" />
  ) : !userRoleValidated ? (
    <Navigate to="/403" replace={true} />
  ) : (
    <Route {...rest} />
  );
}

export default AuthRoute;
