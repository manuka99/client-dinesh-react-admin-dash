import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { usePrompt } from "react-router-dom";
import RecoveryCodes from "../RecoveryCodesComponent/RecoveryCodes";
import api from "../../../../../util/api";
import { TwoFactorStateContext } from "../Main";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  qrCode: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    margin: "20px 0",
  },
}));

function EnableSuccess() {
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [qrCode, setQrCode] = useState("");
  const twoFactorStateContext = useContext(TwoFactorStateContext);
  const classes = useStyles();

  useEffect(() => {
    fetchQrCode();
    fetchRecoveryCodes();
  }, []);

  usePrompt(
    "Have you downloaded or copied your recovery codes and scan the Qr code ? these credential are required at your next sign in.",
    true
  );

  const promptBeforeExit = () => {
    swal({
      title: "Are you sure?",
      text:
        "Have you downloaded or copied your recovery codes and scan the Qr code, these credential are required at your next sign in.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        twoFactorStateContext.dispatch();
      } else {
        swal(
          "Download, print, or copy your recovery codes and scan the Qr code before continuing two-factor authentication."
        );
      }
    });
  };

  const fetchQrCode = () => {
    api()
      .get("/user/two-factor-qr-code")
      .then((res) => {
        setQrCode(res.data.svg);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRecoveryCodes = () => {
    api()
      .get("/user/two-factor-recovery-codes")
      .then((res) => {
        setRecoveryCodes(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <RecoveryCodes recoveryCodes={recoveryCodes} />
      </CardContent>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          2. Scan this barcode using your mobile.
        </Typography>
        <div className={classes.qrCode}>
          {qrCode && <span dangerouslySetInnerHTML={{ __html: qrCode }} />}
          <br />
          <Typography variant="caption">
            (If you find it difficult to scan the QR code please disable dark
            mode.)
          </Typography>
        </div>
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
        <br />
        <br />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={promptBeforeExit}
          fullWidth
          startIcon={<ArrowBackIcon />}
        >
          Back to Main Menu
        </Button>
      </CardContent>
    </div>
  );
}

export default EnableSuccess;
