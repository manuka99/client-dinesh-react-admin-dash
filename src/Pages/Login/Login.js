import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

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
            setLoading(false);
            if (res.status === 200) {
              if (res.data.two_factor) {
                navigate("/two-factor-challenge");
              } else loginAuth();
            }
          })
          .catch((error) => {
            setLoading(false);
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
          });
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
              loading={loading}
              startIcon={<LockIcon />}
            />
          </Box>

          <Grid container>
            <Grid item xs>
              <Button variant="text" color="primary" size="small">
                Forgot password?
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" color="primary" size="small">
                {"Login as a customer?"}
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
