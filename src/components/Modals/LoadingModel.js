import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ProgressBar from "react-topbar-progress-indicator";
import {
  // useTheme,
  // useMediaQuery,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    width: 260,
    maxHeight: 200,
    height: "auto",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
  },
  body: {
    marginTop: "12px",
    textAlign: "center",
  },
}));

export default function LoadingModel({ status }) {
  const classes = useStyles();
  // const theme = useTheme();
  // const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={status}
        closeAfterTransition
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={status}>
          <div className={classes.paper}>
            <Box mt={4} mb={4}>
              <ProgressBar />
              <img
                className={classes.img}
                src="/images/progress/pizza-slices.gif"
                width="160px"
                alt="pizza-slices-progress"
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
