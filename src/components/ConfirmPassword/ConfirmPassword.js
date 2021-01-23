import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import store from "../../Redux/store";
import ButtonProgress from "../common/ButtonProgress/ButtonProgress";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import BlockIcon from "@material-ui/icons/Block";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    padding: "14px 0px",
    boxSizing: "border-box",
    outline: "none",
    border: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "620px",
    padding: "20px 10px",
    boxSizing: "border-box",
  },
}));

function ConfirmPassword({ handlePasswordConfirm }) {
  const state = store.getState();
  const { currentUser } = state;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [userData, setUserData] = useState({
    email: currentUser.user_data.user.email,
  });
  const [errors, setErrors] = useState([]);

  const classes = useStyles();

  const submitConfirmPassword = () => {
    setConfirmLoading(true);
    handlePasswordConfirm();
  };

  const cancelVerification = () => {
    setModalOpen(false);
    handlePasswordConfirm(false);
  };

  const handleFormChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <Fade in={modalOpen}>
        <Card elevation={12} className={classes.root}>
          <LockIcon className={classes.icon} />
          <CardContent>
            <Typography
              className={classes.typoCenter}
              gutterBottom
              variant="h6"
            >
              Confirm Password
            </Typography>
            <Typography
              className={classes.typoCenter}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              You are trying to access a password protected content therefore
              user must validate their credentials befour proceeding.
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
                  onChange={handleFormChange}
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
                  autoFocus
                  helperText=""
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonProgress
                  size="medium"
                  color="primary"
                  name="Verify password"
                  variant="outlined"
                  loading={confirmLoading}
                  handleButtonClick={submitConfirmPassword}
                  startIcon={<LockOpenIcon />}
                  spinColor="primary"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="medium"
                  color="secondary"
                  variant="outlined"
                  loading={confirmLoading}
                  handleButtonClick={cancelVerification}
                  startIcon={<BlockIcon />}
                  onClick={cancelVerification}
                  fullWidth
                >
                  Cancel verification
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
}

export default ConfirmPassword;
