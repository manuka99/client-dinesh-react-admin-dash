import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../util/api";
import Error from "../../components/alerts/Error";
import { LogIn as loginAuth } from "../../util/auth";
import ButtonProgress from "../../components/common/ButtonProgress/ButtonProgress";
import LockIcon from "@material-ui/icons/Lock";
import { Button, Paper } from "@material-ui/core";
import Copyright from "../../components/Copyright";
import store from "../../Redux/store";
import {fetch_user_data } from "../../Redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 2),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.neutral.reverse,
    color: theme.palette.neutral.straight,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  user_details: {
    flexGrow: 1,
    margin: theme.spacing(1, 0, 2, 0),
  },
}));

function TwoFactorChallenge() {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [data, setData] = useState({});
  const [isTOTP, setIsTOTP] = useState(true);
  const classes = useStyles();
  const codeRef = useRef("");
  const state = store.getState().currentUser;
  const user_data = state.user_data;

  const submitCode = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(data);
    api()
      .post("/two-factor-challenge", data)
      .then((res) => {
        loginAuth();
      })
      .catch((error) => {
        if (error.response) {
          let status = error.response.status;
          let data = error.response.data;
          if (status === 422) {
            setErrors({ message: data.message, ...data.errors });
            console.log(errors);
          } else if (status === 429) {
            setErrors({
              message: "To many attemps therefore please try again shortly.",
            });
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForm = (event) => {
    setData({
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: null });
  };

  const switchModes = () => {
    setIsTOTP(!isTOTP);
    console.log(codeRef);
    codeRef.current.value = "";
    setErrors({});
  };

  const logout = () => {
    setLoadingLogout(true);
    api()
      .post("/forget/two-factor-login")
      .then((res) =>  store.dispatch(fetch_user_data()))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoadingLogout(false);
      });
  };

  return (
    <Container component="main" style={{ maxWidth: "640px" }}>
      <Paper>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            style={{ height: "48px", width: "48px" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" gutterBottom>
            Two Factor Authentication Challenge
          </Typography>
          <Typography variant="body2" gutterBottom>
            Two factor authentication feature is enabled, therefore the user is
            required to input a six digit numeric token during the
            authentication process. This token is generated using a time-based
            one-time password (TOTP) that can be retrieved from any TOTP
            compatible mobile authentication application such as Google
            Authenticator.
          </Typography>

          <div className={classes.user_details}>
            <Grid container spacing={6} justify="center">
              <Grid item xs={1}>
                <Avatar />
              </Grid>
              <Grid item xs={7}>
                <Grid container direction="column">
                  <Typography variant="body2">
                    <strong>
                      {user_data.user.fname} {user_data.user.lname}
                    </strong>
                  </Typography>
                  <Typography variant="body2">
                    {user_data.user.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <ButtonProgress
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  name="logout"
                  size="small"
                  loading={loadingLogout}
                  handleButtonClick={logout}
                />
              </Grid>
            </Grid>
          </div>
          <Box mt={2} mb={3}>
            <Paper elevation={8}>
              <img
                width="340px"
                alt="What is two factor authentication"
                src="/images/what-is-two-factor-authentication.gif"
              />
            </Paper>
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            {isTOTP
              ? " *Enter the TOTP code recieved on your mobile authentication application"
              : "* Enter any of the Recovery codes recieved when setting up two factor authentication."}
          </Typography>
          {errors.message && <Error message={errors.message} />}
          <form className={classes.form} onSubmit={submitCode}>
            <TextField
              required
              inputRef={codeRef}
              error={isTOTP ? errors.code : errors.recovery_code}
              variant="outlined"
              margin="normal"
              fullWidth
              label={isTOTP ? "TOTP token" : "Recovery code"}
              name={isTOTP ? "code" : "recovery_code"}
              autoFocus
              onChange={handleForm}
              helperText={isTOTP ? errors.code : errors.recovery_code}
            />
            <Box mt={1} mb={2}>
              <ButtonProgress
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                name="Verify code"
                size="large"
                loading={loading}
                startIcon={<LockIcon />}
              />
            </Box>

            <Grid container>
              <Grid item xs>
                <Button
                  color="secondary"
                  size="small"
                  variant="text"
                  onClick={switchModes}
                >
                  {isTOTP ? "No access for mobile?" : "Enter TOTP code"}
                </Button>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Paper>
    </Container>
  );
}

export default TwoFactorChallenge;
