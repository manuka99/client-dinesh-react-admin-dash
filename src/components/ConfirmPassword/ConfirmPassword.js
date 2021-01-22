import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import store from "../../Redux/store";
import ButtonProgress from "../common/ButtonProgress/ButtonProgress";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "14px 0px",
    boxSizing: "border-box",
  },
  icon: {
    fontSize: "56px",
    display: "block",
    margin: "0 auto",
    border: "3px solid",
    borderColor: theme.palette.black,
    borderRadius: "50%",
    padding: "10px",
    boxSizing: "border-box",
  },
  typoCenter: {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
    maxWidth: "440px",
  },
  forms: {
    display: "block",
    margin: "0 auto",
    maxWidth: "620px",
    padding: "20px 10px",
  },
}));

function ConfirmPassword({ handlePasswordConfirm }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const classes = useStyles();
  const state = store.getState();
  const { currentUser } = state;

  const submitConfirmPassword = () => {
      setConfirmLoading(true);
      handlePasswordConfirm();
  };

  return (
    <Card elevation={4} className={classes.root}>
      <LockIcon className={classes.icon} />
      <CardContent>
        <Typography className={classes.typoCenter} gutterBottom variant="h6">
          Confirm Password
        </Typography>
        <Typography
          className={classes.typoCenter}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          You are trying to access a password protected content therefore user
          must validate their credentials befour proceeding.
        </Typography>
        <Grid className={classes.forms} container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              defaultValue={currentUser.user_data.user.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonProgress
              size="medium"
              color="secondary"
              name="Verify password"
              variant="outlined"
              loading={confirmLoading}
              handleButtonClick={submitConfirmPassword}
              startIcon={<LockOpenIcon />}
              spinColor="secondary"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ConfirmPassword;
