import React from "react";
import { isLoggedIn } from "../util/auth";

export default function withAuth(Component) {

  const AuthComponent = (props) => {
    return <Component {...props} />;
  };

  AuthComponent.getInitialProps = (context) => {
    const isUserLoggedIn = isLoggedIn(context.req.headers.cookie);

    //   console.log("cookiee: ", context?.req?.headers?.cookie);
      
    if (!isUserLoggedIn) {
      window.push = "/login";
    }

    return { user: { isLoggedIn: isUserLoggedIn } };
  };

  return AuthComponent;
}
