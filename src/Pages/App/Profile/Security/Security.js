import React from "react";
import PasswordChange from "./PasswordChange";
import VerifyEmail from "./VerifyEmail";
import ActiveSessions from "./Session/ActiveSessions";

function Security() {
  return (
    <React.Fragment>
      <PasswordChange />
      <VerifyEmail />
      <ActiveSessions />
    </React.Fragment>
  );
}

export default Security;
