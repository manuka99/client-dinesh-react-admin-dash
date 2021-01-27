import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box, Divider } from "@material-ui/core";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import SaveIcon from "@material-ui/icons/Save";
import api from "../../../../util/api";
import Error from "../../../../components/alerts/Error";
import swal from "sweetalert";
import PasswordChange from "./PasswordChange";
import VerifyEmail from "./VerifyEmail";

function Security() {
  return (
    <React.Fragment>
      <PasswordChange />
      <VerifyEmail/>
    </React.Fragment>
  );
}

export default Security;
