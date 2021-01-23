import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        {"Pizza Apes "}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function TwoFactorChallenge() {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [isTOTP, setIsTOTP] = useState(false);
  const classes = useStyles();
  const codeRef = useRef("");

  const submitCode = (event) => {
    event.preventDefault();
    setLoading(true);
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
      email: "manukayasas99@gmail.com",
      password: "password",
    });
    setErrors({ ...errors, [event.target.name]: null });
  };

  const switchModes = () => {
    setIsTOTP(!isTOTP);
    console.log(codeRef);
    codeRef.current.value = "";
    setErrors({});
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6" gutterBottom>
          Two Factor Authentication Challenge
        </Typography>
        <Typography variant="body2" gutterBottom>
          Two factor authentication feature is enabled, therefore the user is
          required to input a six digit numeric token during the authentication
          process. This token is generated using a time-based one-time password
          (TOTP) that can be retrieved from any TOTP compatible mobile
          authentication application such as Google Authenticator.
        </Typography>
        <br />
        <Paper elevation={8}>
          <img
            width="340px"
            src="/images/what-is-two-factor-authentication.gif"
          />
        </Paper>
        <br />
        <Typography variant="subtitle2" color="textSecondary">
          {isTOTP
            ? " *Enter the TOTP code recieved on your mobile authentication application"
            : "* Enter any of the Recovery codes recieved when setting up two factor authentication."}
        </Typography>
        {errors.message && <Error message={errors.message} />}
        <form className={classes.form} onSubmit={submitCode}>
          <TextField
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
              loading={loading}
              startIcon={<LockIcon />}
            />
          </Box>

          <Grid container>
            <Grid item xs>
              <Button
                color="primary"
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
    </Container>
  );
}

export default TwoFactorChallenge;
