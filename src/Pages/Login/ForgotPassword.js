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
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../util/api";
import Error from "../../components/alerts/Error";
import ButtonProgress from "../../components/common/ButtonProgress/ButtonProgress";
import LockIcon from "@material-ui/icons/Lock";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import swal from "sweetalert";

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

export default function ForgotPassword() {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = React.useState({
    email: "",
  });

  const classes = useStyles();

  const handleForm = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: null });
  };

  const submitForm = (event) => {
    setErrors({});
    event.preventDefault();
    setLoading(true);
    api(true)
      .get("/sanctum/csrf-cookie")
      .then((res) => {
        api()
          .post("/forgot-password", userData)
          .then((res) => {
            setLoading(false);
            if (res.status === 200) {
              swal(
                "",
                `Password reset link has been set to the email address: ${userData.email}`,
                "success"
              );
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
              } else swal(error.message);
            } else swal(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Reset your password
        </Typography>
        <Typography variant="body2">
          Enter your user account's verified email address and we will send you
          a password reset link.
        </Typography>
        {errors.message && <Error message={errors.message} />}
        <form className={classes.form} onSubmit={submitForm}>
          <TextField
            error={errors.email}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleForm}
            helperText={errors.email && errors.email}
          />
          <Box mt={1} mb={2}>
            <ButtonProgress
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              name="Send password reset email"
              loading={loading}
            />
          </Box>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Container>
  );
}
