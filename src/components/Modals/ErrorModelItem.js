import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { borders } from "@material-ui/system";
import {
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      backgroundColor: theme.palette.background.paper,
      border: "none",
      outline: "none",
      boxShadow: "4px 6px 5px #404040",
      borderRadius: "200px 40px 200px 80px",
      boxSizing:"border-box",
      padding: theme.spacing(2, 4, 3),
    },
    body: {
      marginTop: "12px",
      textAlign: "center",
    }
  })
);

export default function ErrorModelItem({ status, hideModel, message }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
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
              <Typography align="center" variant={mobileDevice ? "h6" : "h4"}>
                {message.title}
              </Typography>
              <Typography align="center" className={classes.body}>
                {message.body}
              </Typography>
              <div className={classes.imageContainer}>
                <img
                  alt="Under development"
                  className={classes.image}
                  src="/images/undraw_page_not_found_su7k.svg"
                />
              </div>
              <div className={classes.buttonContainer}>
                <Button color="primary" variant="outlined" onClick={hideModel}>
                  I understand
                </Button>
              </div>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
