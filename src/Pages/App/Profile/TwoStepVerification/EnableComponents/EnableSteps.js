import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { usePrompt } from "react-router-dom";
import RecoveryCodes from "../RecoveryCodesComponent/RecoveryCodes";
import api from "../../../../../util/api";
import { TwoFactorStateContext } from "../Main";
import swal from "sweetalert";
import QRcodeComponent from "../QRcodeComponent/QRcodeComponent";
import { Box, CircularProgress } from "@material-ui/core";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";
import ConfirmPassword from "../../../../../components/ConfirmPassword/ConfirmPassword";
import CancelIcon from "@material-ui/icons/Cancel";

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

function EnableSteps() {
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [qrCode, setQrCode] = useState("");
  const twoFactorStateContext = useContext(TwoFactorStateContext);
  const [isStepOne, setIsStepOne] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [tOTPCode, setTOTPCode] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchQrCode();
    fetchRecoveryCodes();
  }, []);

  usePrompt(
    "Have you downloaded or copied your recovery codes and scan the Qr code ? these credential are required at your next sign in after the set up procedure is completed.",
    true
  );

  const fetchQrCode = () => {
    api()
      .get("/user/two-factor-qr-code")
      .then((res) => {
        setQrCode(res.data.svg);
        console.log(res);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 423) {
            setIsConfirming(true);
          }
        }
      });
  };

  const fetchRecoveryCodes = () => {
    api()
      .get("/user/two-factor-recovery-codes")
      .then((res) => {
        setRecoveryCodes(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 423) {
            setIsConfirming(true);
          }
        }
      });
  };

  const handleMainClick = () => {
    if (isStepOne) {
      setIsStepOne(false);
    } else if (!isNaN(tOTPCode) && tOTPCode.length !== 6) {
      swal("Please enter the valid 6-digit-code from app");
    } else {
      //send the qr code validation and enable 2fa
      setLoading(true);
      api()
        .post("/user/two-factor-authentication-enable", { code: tOTPCode })
        .then((response) => {
          if (response.status === 200) twoFactorStateContext.dispatch();
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 422) {
              setErrors({ ...e.response.data });
            } else if (e.response.status === 423) {
              setIsConfirming(true);
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSubClick = () => {
    if (!isStepOne) {
      setIsStepOne(true);
    }
  };

  const handleTotpCode = (e) => {
    setTOTPCode(e.target.value);
    setErrors({});
  };

  const handlePasswordConfirm = (status = true) => {
    if (status) {
      handleMainClick();
    }
    setIsConfirming(false);
  };

  return (
    <div className={classes.root}>
      {isConfirming && (
        <ConfirmPassword handlePasswordConfirm={handlePasswordConfirm} />
      )}
      {recoveryCodes.length === 0 ? (
        <div className={classes.loaderWrapper}>
          <CircularProgress
            className={classes.loader}
            size="50px"
            disableShrink
          />
        </div>
      ) : (
        <React.Fragment>
          <CardContent>
            <Typography gutterBottom variant="h6">
              <span style={{ color: "#6CC070" }}>
                Set up Two factor authentication
              </span>
            </Typography>
            <Box mb={2}>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  api().delete("/user/two-factor-authentication");
                  twoFactorStateContext.dispatch();
                }}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Use your phone as your second step to sign in. Two-factor
              authentication adds an additional layer of security to your
              account by requiring more than just a password to log in.
              Two-factor authentication adds an extra layer of security to your
              account. In addition to your username and password, you’ll need to
              enter a code that Pizza Apes sends to you via text or an app on
              your phone.
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>
                * Make sure that you follow the bellow two methods and save the
                codes and scan the qr code properly. You can disable Two Factor
                Authentication at any moment by confirming your password.
              </strong>
            </Typography>
            {isStepOne && recoveryCodes.length > 0 && (
              <RecoveryCodes recoveryCodes={recoveryCodes} />
            )}
            {!isStepOne && qrCode && (
              <QRcodeComponent
                qrCode={qrCode}
                errors={errors}
                handleTotpCode={handleTotpCode}
              />
            )}

            <Typography variant="subtitle2" color="error">
              * You will not be able to access your account if you do not follow
              the above steps properly. You can request support from our team at
              any moment.
            </Typography>
            <br />
            <ButtonProgress
              disabled={true}
              size="large"
              variant="contained"
              color={!isStepOne ? "secondary" : "primary"}
              loading={loading}
              handleButtonClick={handleMainClick}
              fullWidth
              endIcon={isStepOne && <ArrowForwardIcon />}
              name={isStepOne ? "Next" : "Enable two factor authentication"}
            />
            {!isStepOne && (
              <Box mt={2}>
                <Button
                  disabled={!isStepOne && !qrCode}
                  size="medium"
                  variant="outlined"
                  color="primary"
                  onClick={handleSubClick}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Box>
            )}
          </CardContent>
        </React.Fragment>
      )}
    </div>
  );
}

export default EnableSteps;
