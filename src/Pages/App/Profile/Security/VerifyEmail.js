import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box, Button, CircularProgress, Divider } from "@material-ui/core";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import SaveIcon from "@material-ui/icons/Save";
import api from "../../../../util/api";
import Error from "../../../../components/alerts/Error";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  loaderWrapper: {
    display: "flex",
    padding: " 0 0  0 80px",
    boxSizing: "border-box",
  },
}));

function VerifyEmail() {
  const [userData, setuserData] = useState({});
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [request, setRequest] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (request) {
      api()
        .get("/user")
        .then((res) => {
          setuserData(res.data.user);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.data);
          } else swal(error.message);
        })
        .finally(() => {
          setRequest(false);
        });
    }
  }, [request]);

  const verifyEmail = () => {
    if (userData.email_verified_at !== null)
      swal(
        "",
        "Your email address has been already verified, nothing to do more. You can update your email address by updating your profile.",
        "success"
      );
    else {
      setVerifyLoading(true);
      api()
        .post("/email/verification-notification")
        .then((res) => {
          swal(
            "",
            `Verification link has been sent to the email address: ${userData.email}`,
            "success"
          );
        })
        .catch((error) => {
          swal(error.message);
        })
        .finally(() => {
          setVerifyLoading(false);
        });
    }
  };

  return (
    <Box mt={2} mb={3}>
      <Typography variant="h6" gutterBottom>
        Primary email address
      </Typography>
      <Divider />
      <br />
      <Typography variant="body2" gutterBottom>
        Your primary email is used to reach you in case we detect unusual
        activity in your account or you accidentally get locked out. Your
        primary email will be used as the recovery email address which helps you
        to reset your password if:
      </Typography>
      <ul style={{ listStylePosition: "outside" }}>
        <li>You forget your password</li>
        <li>Someone else is using your account</li>
        <li>You’re locked out of your account for another reason</li>
      </ul>
      <Box mt={3}>
        {request ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress
              className={classes.loader}
              size="50px"
              disableShrink
            />
          </div>
        ) : (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                value={userData.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ButtonProgress
                handleButtonClick={verifyEmail}
                loading={verifyLoading}
                variant="contained"
                color={userData.email_verified_at ? "primary" : "secondary"}
                spinColor={userData.email_verified_at ? "primary" : "secondary"}
                name={
                  userData.email_verified_at
                    ? "Verified"
                    : "send verification link"
                }
                startIcon={
                  userData.email_verified_at ? (
                    <DoneOutlineIcon />
                  ) : (
                    <LockIcon />
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setRequest(true)}
              >
                Refresh verification state
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default VerifyEmail;
