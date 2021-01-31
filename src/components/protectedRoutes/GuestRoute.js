import { Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "../../util/auth";

function GuestRoute({ path, ...rest }) {
  const { userAuth, is2faRequired } = isLoggedIn();
  return is2faRequired ? (
    path === "/two-factor-challenge" ? (
      <Route {...rest} />
    ) : (
      <Navigate to={"/two-factor-challenge"} />
    )
  ) : !userAuth ? (
    <Route {...rest} />
  ) : (
    <Navigate to={"/406"} replace={true} />
  );
}

export default GuestRoute;
