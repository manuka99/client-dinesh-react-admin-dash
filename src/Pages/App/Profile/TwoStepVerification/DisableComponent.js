import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import { Grid } from "@material-ui/core";
import RecoveryCodes from "./RecoveryCodesComponent/RecoveryCodes";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
}));

function DisableComponent() {
  const classes = useStyles();

  const [rCodesLoading, setRCodesLoading] = useState(false);
  const [disable2faLoading, setDisable2faLoading] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState(["24323"]);

  const handleDisable2fa = () => {
    setDisable2faLoading(true);
  };

  const handleGetRecoveryCodes = () => {
    setRCodesLoading(true);
  };

  return (
    <div className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.image}
          component="img"
          alt="Contemplative Reptile"
          height="240"
          image="/images/CBM-Corporate-Two-Step-Verification.png"
          title="Contemplative Reptile"
        />
      </CardActionArea>

      <CardContent>
        <CardActionArea>
          <Typography gutterBottom variant="h6">
            Two factor authentication is
            <span style={{ color: "#6CC070" }}> enabled.</span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Use your phone as your second step to sign in. Two-factor
            authentication adds an additional layer of security to your account
            by requiring more than just a password to log in.
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Two-factor authentication adds an extra layer of security to your
            account. In addition to your username and password, you’ll need to
            enter a code that Pizza Apes sends to you via text or an app on your
            phone.
          </Typography>
          <br />
          <Button size="small" variant="outlined" color="primary">
            Learn More
          </Button>
        </CardActionArea>
        {recoveryCodes.length > 0 && (
          <RecoveryCodes recoveryCodes={recoveryCodes} />
        )}

        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={4.4}>
            <ButtonProgress
              size="small"
              variant="contained"
              color="primary"
              name="Refresh recovery codes"
              spinColor="primary"
              loading={rCodesLoading}
              handleButtonClick={handleGetRecoveryCodes}
            />
          </Grid>
          <Grid item xs={7.6}>
            <ButtonProgress
              size="small"
              variant="contained"
              color="secondary"
              name="Disable two factor authentication"
              spinColor="secondary"
              loading={disable2faLoading}
              handleButtonClick={handleDisable2fa}
            />
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
}

export default DisableComponent;
