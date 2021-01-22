import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import EnableComponent from "./EnableComponents/EnableComponent";
import DisableComponent from "./DisableComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  loaderWrapper: {
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Main() {
  const classes = useStyles();
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={classes.root}>
      {loading ? (
        <div className={classes.loaderWrapper}>
          <CircularProgress
            className={classes.loader}
            size="50px"
            disableShrink
          />
          ;
        </div>
      ) : isEnabled ? (
        <DisableComponent />
      ) : (
        <EnableComponent />
      )}
    </div>
  );
}

export default Main;
