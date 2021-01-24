import { Route, Navigate } from "react-router-dom";
import { isLoggedIn} from "../../util/auth";

function GuestRoute({ path, hasAnyRoles, ...rest }) {
  const { userAuth } = isLoggedIn(hasAnyRoles);
  return !userAuth ? (
    <Route {...rest} />
  ) : (
    <Navigate to={"/406"} replace={true} />
  );
}

export default GuestRoute;
