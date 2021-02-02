import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { CircularProgress, Divider } from "@material-ui/core";
import api from "../../../../../util/api";
import swal from "sweetalert";
import moment from "moment";
import DeviceDetector from "device-detector-js";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ComputerIcon from "@material-ui/icons/Computer";
import Error from "../../../../../components/alerts/Error";
import {
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from "@material-ui/core";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      margin: "0",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "48px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "148px",
    },
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    outline: "none",
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
    borderRadius: "20px",
    boxSizing: "border-box",
    padding: theme.spacing(4),
  },
  body: {
    marginTop: "12px",
    textAlign: "center",
  },
  loaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  activeSession: {
    color: theme.palette.neutral.main,
  },
  sessionIcon: {
    fontSize: "48px",
  },
}));

export default function SessionData({ id, onClose }) {
  const [loading, setloading] = useState(true);
  const [revokeLoading, setRevokeLoading] = useState(false);
  const [session, setsession] = useState({});
  const [current, setCurrent] = useState("");
  const [geoData, setGeoData] = useState({});
  const deviceDetector = new DeviceDetector();
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const device = deviceDetector.parse(session.user_agent);

  useEffect(() => {
    api()
      .get(`/user/active-sessions/${id}`)
      .then((res) => {
        setCurrent(res.data.current);
        setsession(res.data.session_data);
        setGeoData(res.data.geo_data);
        console.log(res.data);
      })
      .catch((error) => {
        // swal(error.message);
      })
      .finally(() => {
        setloading(false);
      });
  }, [id]);

  const revokeDevicePromt = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once revoked, you will be logged out from the revoked device and cannot undo the operation, but you can still log in by validating your credentials.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        revokeDevice();
      } else {
      }
    });
  };

  const revokeDevice = () => {
    setRevokeLoading(true);
    api()
      .post(`/user/revoke-session/${id}`)
      .then((res) => {
        if (res.data.success) swal("", res.data.success, "success");
        else if (res.data.error) swal("", res.data.error, "error");
      })
      .catch((error) => {
        // swal(error.message);
      })
      .finally(() => {
        setRevokeLoading(false);
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        closeAfterTransition
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={classes.root}>
            <div className={classes.paper}>
              <Box mt={4} mb={4}>
                <Typography
                  align="center"
                  gutterBottom
                  variant={mobileDevice ? "h6" : "h5"}
                >
                  Signed in device details
                </Typography>
                <Divider />
                <br />
                <Typography variant="body2" gutterBottom>
                  This is a list of devices that have logged into your account.
                  Revoke any device that you do not recognize. You can see your
                  sign-in history, including the dates and times that your
                  account was used. You can also see the IP addresses which were
                  used to access your account. These are the details displayed
                  from the device;
                </Typography>
                <ul style={{ listStylePosition: "outside" }}>
                  <li>IP address</li>
                  <li>Browser/App infomation</li>
                  <li>Device information</li>
                  <li>Accessed location</li>
                </ul>
                <br />
                {loading ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress
                      className={classes.loader}
                      size="50px"
                      disableShrink
                    />
                  </div>
                ) : session.id ? (
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    alignContent="center"
                    justify="center"
                  >
                    <Grid
                      container
                      xs={12}
                      sm={6}
                      direction="column"
                      alignItems="center"
                      alignContent="center"
                      justify="center"
                      spacing={2}
                      key={session.id}
                    >
                      <Grid item xs={12}>
                        {deviceDetector.parse(session.user_agent).device
                          .type === "desktop" ? (
                          <ComputerIcon
                            className={`${
                              current === session.id && classes.activeSession
                            } ${classes.sessionIcon}`}
                          />
                        ) : (
                          <PhoneAndroidIcon
                            className={`${
                              current === session.id && classes.activeSession
                            } ${classes.sessionIcon}`}
                          />
                        )}
                      </Grid>

                      <Grid
                        container
                        alignItems="center"
                        alignContent="center"
                        justify="center"
                        direction="column"
                        xs={12}
                      >
                        <Grid item>{session.ip_address}</Grid>
                        <Grid
                          item
                          className={
                            current === session.id && classes.activeSession
                          }
                        >
                          {current === session.id
                            ? "Current device"
                            : moment.unix(session.last_activity).fromNow()}
                        </Grid>
                        <Grid item>
                          {`${device.os.name} | ${device.client.name}`}
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <ButtonProgress
                          justify="flex-end"
                          variant="contained"
                          color="secondary"
                          size="small"
                          loading={revokeLoading}
                          handleButtonClick={revokeDevicePromt}
                          name="Revoke device"
                        />
                      </Grid>
                      <br />
                    </Grid>
                    <Grid
                      container
                      xs={12}
                      sm={6}
                      direction="column"
                      alignItems="flex-start"
                      alignContent="center"
                      justify="center"
                    >
                      <Typography variant="body2" gutterBottom>
                        <strong> Last location:</strong>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {`${geoData.city}, ${geoData.state_name}, ${geoData.country}`}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong> Time zone:</strong>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {`${geoData.timezone}`}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong> Device:</strong>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {`${device.device.type} | ${device.device.brand} | ${device.device.model}`}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong> Client:</strong>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {`${device.client.type} | ${device.client.name} | ${device.os.name}`}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Error message="Requested device data is not available as it may be deleted or invalid." />
                )}
                <div className={classes.buttonContainer}>
                  <Button color="primary" variant="outlined" onClick={onClose}>
                    close
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
