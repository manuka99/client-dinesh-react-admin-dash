import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../util/api";
import Error from "../../components/alerts/Error";
import { LogIn as loginAuth } from "../../util/auth";
import ButtonProgress from "../../components/common/ButtonProgress/ButtonProgress";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Paper } from "@material-ui/core";
import FacebookIcon from "../../../src/icons/Facebook";
import GoogleIcon from "../../../src/icons/Google";
import Copyright from "../../components/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 2),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
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
}));

export default function Login() {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = useState(false);

  const [userLogin, setUserLogin] = React.useState({
    email: null,
    password: null,
    remember: false,
  });

  const classes = useStyles();
  let navigate = useNavigate();

  const handleForm = (event) => {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: null });
  };

  const handleCheck = (event) => {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.checked,
    });
  };

  const submitForm = (event) => {
    setErrors({});
    event.preventDefault();
    setLoading(true);
    api(true)
      .get("/sanctum/csrf-cookie")
      .then((res) => {
        api()
          .post("/login", userLogin)
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
                  message:
                    "To many attemps therefore please try again shortly.",
                });
              }
            }
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  return (
    <Container component="main" style={{ maxWidth: "640px" }}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar
          className={classes.avatar}
          style={{ height: "48px", width: "48px" }}
        />
        <Typography variant="h4">Pizza Apes</Typography>
        <Typography color="textSecondary" variant="body2">
          Sign in on the administration platform
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button
              color="primary"
              fullWidth
              startIcon={<FacebookIcon />}
              size="large"
              component="a"
              href="http://localhost:8000/auth/facebook/redirect"
              style={{ backgroundColor: "#0000ff", color: "white" }}
              variant="contained"
            >
              Login with Facebook
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              startIcon={<GoogleIcon />}
              size="large"
              variant="contained"
              component="a"
              href="http://localhost:8000/auth/google/redirect/api"
            >
              Login with Google
            </Button>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography align="center" color="textSecondary" variant="body1">
            or login with email address
          </Typography>
        </Box>
        {errors.message && <Error message={errors.message} />}
        <form className={classes.form} onSubmit={submitForm}>
          <TextField
            error={errors.email}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleForm}
            helperText={errors.email && errors.email}
          />
          <TextField
            error={errors.password}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleForm}
            helperText={errors.password && errors.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="true"
                name="remember"
                color="primary"
                onChange={handleCheck}
              />
            }
            label="Remember me"
          />
          <Box mt={1} mb={2}>
            <ButtonProgress
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              name="Sign In"
              size="large"
              loading={loading}
              startIcon={<LockIcon />}
            />
          </Box>

          <Grid container spacing={1}>
            <Grid item xs>
              <Button
                variant="text"
                color="primary"
                size="small"
                component={NavLink}
                to="/forgot-password"
              >
                Forgot password?
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" color="primary" size="small">
                {"Customer portal?"}
              </Button>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
