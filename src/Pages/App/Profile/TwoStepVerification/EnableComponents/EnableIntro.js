import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import ScreenLockPortraitIcon from "@material-ui/icons/ScreenLockPortrait";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";
import EnableSteps from "./EnableSteps";
import ConfirmPassword from "../../../../../components/ConfirmPassword/ConfirmPassword";
import Error from "../../../../../components/alerts/Error";
import api from "../../../../../util/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
  icon: {
    fontSize: "46px",
    display: "block",
    margin: "0 auto",
  },
}));

function EnableIntro() {
  const classes = useStyles();
  const [btnLoader, setBtnLoader] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isEnableSteps, setIsEnableSteps] = useState(false);

  const enable_2fa = () => {
    setBtnLoader(true);
    api()
      .post("/user/two-factor-authentication")
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          setIsEnableSteps(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          if (err.response.status === 423) {
            setErrors([...errors, err.response.data]);
            setIsConfirming(true);
          }
        }
      })
      .finally(() => {
        setBtnLoader(false);
      });
  };

  const handlePasswordConfirm = (status = true) => {
    if (status) {
      enable_2fa();
    } else {
      setErrors([
        ...errors,
        { message: "Password verification cancelled with error code 419" },
      ]);
    }
    setIsConfirming(false);
  };

  return (
    <div className={classes.root}>
      {isEnableSteps ? (
        <EnableSteps />
      ) : (
        <React.Fragment>
          {isConfirming && (
            <ConfirmPassword handlePasswordConfirm={handlePasswordConfirm} />
          )}
          <Typography variant="body2" color="textSecondary">
            Two-factor authentication adds an extra layer of security to your
            account. In addition to your username and password, you’ll need to
            enter a code that Pizza Apes sends to you via text or an app on your
            phone.
          </Typography>
          <Box mt={3}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <CardActionArea className={classes.introItem}>
                  <LockIcon className={classes.icon} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      When you sign in to Pizza Apes you’ll enter your username
                      and password, like always.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardActionArea className={classes.introItem}>
                  <ScreenLockPortraitIcon className={classes.icon} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      When logging in from a new browser, you’ll need to enter
                      an additional code from your phone or tablet.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardActionArea className={classes.introItem}>
                  <LockOpenIcon className={classes.icon} />
                  <CardContent>
                    <Typography variant="body" color="textSecondary">
                      Once you enter the code on the website, you’ll be logged
                      into Pizza Apes.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Grid>
            </Grid>
          </Box>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="subtitle2">
                Use an application on your phone to get two-factor
                authentication codes when prompted.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We recommend using an application such as Authy, 1Password, or
                LastPass Authenticator. These applications support secure backup
                of your authentication codes in the cloud and can be restored if
                you lose access to your device.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <ButtonProgress
              size="medium"
              variant="contained"
              color="primary"
              fullWidth
              name="set up two step verification"
              loading={btnLoader}
              handleButtonClick={enable_2fa}
              spinColor="primary"
            />
          </CardActions>
          {errors.map((error, index) => {
            return <Error key={index} message={error.message} />;
          })}
        </React.Fragment>
      )}
    </div>
  );
}

export default EnableIntro;
