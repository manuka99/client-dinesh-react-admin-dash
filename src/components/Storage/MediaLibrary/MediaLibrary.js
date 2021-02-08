import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  libaryMain: {
    display: "flex",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  libary: {
    flexBasis: "70%",
    height: "100vh",
    width: "100%",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: { flexBasis: "50%" },
  },
  details: {
    flexBasis: "30%",
    height: "100vh",
    width: "100%",
    overflow: "auto",
    backgroundColor: "#f3f3f3",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: { flexBasis: "50%" },
  },
}));

function MediaLibrary() {
  const classes = useStyles();
  return (
    <div className={classes.libaryMain}>
      <div className={classes.libary}></div>
      <div className={classes.details}></div>
    </div>
  );
}

export default MediaLibrary;
