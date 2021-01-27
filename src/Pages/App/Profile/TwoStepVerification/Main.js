import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import EnableComponent from "./EnableComponents/EnableComponent";
import DisableComponent from "./DisableComponent";
import api from "./../../../../util/api";
export const TwoFactorStateContext = React.createContext();

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
  const [twoFactorStatusChanged, setTwoFactorStatusChanged] = useState(false);

  useEffect(() => {
    setLoading(true);
    api()
      .get("/user")
      .then((res) => {
        if (res.data) setIsEnabled(res.data.user.is_two_factor_enabled);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [twoFactorStatusChanged]);

  const update2faStatus = () => {
    setTwoFactorStatusChanged(!twoFactorStatusChanged);
  };

  return (
    <div className={classes.root}>
      <TwoFactorStateContext.Provider value={{ dispatch: update2faStatus }}>
        {loading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress
              className={classes.loader}
              size="50px"
              disableShrink
            />
          </div>
        ) : isEnabled ? (
          <DisableComponent />
        ) : (
          <EnableComponent />
        )}
      </TwoFactorStateContext.Provider>
    </div>
  );
}

export default Main;
