import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import { Box, Grid } from "@material-ui/core";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
  rCodes: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  rCode: {
    flexBasis: "33.33333%",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "text",
  },
}));

function EnableSuccess({ recoveryCodes }) {
  const classes = useStyles();

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([recoveryCodes.join("\n")], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "pizza-apes-recovery-codes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const printHtml = () => {
    return (
      <div id="print_codes">
        <Grid container spacing={2}>
          {recoveryCodes.map((code) => {
            return (
              <Grid item xs={12} sm={4} md={3}>
                <li className={classes.rCode}>{code}</li>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  const printCodes = () => {};

  const copyToClipBoard = () => {
    var cb = document.getElementById("recovery_codes_id");
    cb.value = recoveryCodes.join("\n");
    cb.style.display = "block";
    cb.select();
    document.execCommand("copy");
    cb.style.display = "none";
    swal(
      "Copied succesfully!",
      "Recovery codes have been copied successfully. Treat your recovery codes with the same level of attention as you would your password.",
      "success"
    );
  };

  return (
    <div className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h6">
          Two factor authentication was successfully
          <span style={{ color: "#6CC070" }}> enabled.</span>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Use your phone as your second step to sign in. Two-factor
          authentication adds an additional layer of security to your account by
          requiring more than just a password to log in. Two-factor
          authentication adds an extra layer of security to your account. In
          addition to your username and password, you’ll need to enter a code
          that Pizza Apes sends to you via text or an app on your phone.
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>
            * Make sure that you follow the bellow two methods and save the
            codes and scan the qr code properly. You can disable Two Factor
            Authentication at any moment by confirming your password.
          </strong>
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom>
          1. Save these recovery codes.
        </Typography>
        <Typography variant="body2">
          Recovery codes are used to access your account in the event you cannot
          receive two-factor authentication codes.
        </Typography>
        <Box p={2} mt={2} mb={3} bgcolor="warning.light" color="white">
          <Typography variant="body2">
            Download, print, or copy your recovery codes before continuing
            two-factor authentication setup below.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {recoveryCodes.map((code) => {
            return (
              <Grid item xs={12} sm={4} md={3}>
                <li className={classes.rCode}>{code}</li>
              </Grid>
            );
          })}
        </Grid>
        <input
          id="recovery_codes_id"
          type="text"
          hidden
          style={{ display: "none" }}
        />
        <br />
        <Typography variant="subtitle2" color="error">
          Treat your recovery codes with the same level of attention as you
          would your password! We recommend saving them with a password manager
          such as Lastpass, 1Password, or Keeper.
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={downloadTxtFile}
          F
        >
          Download
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onclick={printCodes}
        >
          Print
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={copyToClipBoard}
        >
          Copy
        </Button>
      </CardActions>
      <br />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          2. Scan this barcode using your mobile.
        </Typography>
        <Typography variant="body2">
          Scan the image above with the two-factor authentication app on your
          phone.After scanning the barcode image, the app will display a
          six-digit code that you can enter after sign in with your credentials.
        </Typography>
        <br />
        <Typography variant="subtitle2" color="error">
          * You will not be able to access your account if you do not follow the
          above steps properly. You can request support from our team at any
          moment.
        </Typography>
      </CardContent>
    </div>
  );
}

export default EnableSuccess;
