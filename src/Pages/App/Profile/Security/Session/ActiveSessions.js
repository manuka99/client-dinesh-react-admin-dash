import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, Button, CircularProgress, Divider } from "@material-ui/core";
import api from "../../../../../util/api";
import { makeStyles } from "@material-ui/core/styles";
import SyncIcon from "@material-ui/icons/Sync";
import moment from "moment";
import DeviceDetector from "device-detector-js";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ComputerIcon from "@material-ui/icons/Computer";
import SessionData from "./SessionData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  loaderWrapper: {
    display: "flex",
    padding: " 0 0  0 80px",
    boxSizing: "border-box",
  },
  sessions_wrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(4),
  },
  activeSession: {
    color: theme.palette.neutral.main,
  },
}));

function ActiveSessions() {
  const [requestLoading, setRequestLoading] = useState(true);
  const [sessionsData, setSessionsData] = useState({});
  const classes = useStyles();
  const deviceDetector = new DeviceDetector();
  const [moreOnSession, setMoreOnSession] = useState("");

  useEffect(() => {
    if (requestLoading) {
      api()
        .get("/user/active-sessions")
        .then((res) => {
          console.log(res.data);
          setSessionsData({ ...res.data });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setRequestLoading(false);
        });
    }
  }, [requestLoading]);

  const cancelSeeMoreOnSession = () => {
    setMoreOnSession("");
  };

  return (
    <Box mt={3} mb={3}>
      {moreOnSession && (
        <SessionData id={moreOnSession} onClose={cancelSeeMoreOnSession} />
      )}
      <Typography variant="h6" gutterBottom>
        Signed in devices
      </Typography>
      <Divider />
      <br />
      <Typography variant="body2" gutterBottom>
        This is a list of devices that have logged into your account. Revoke any
        device that you do not recognize. You can see your sign-in history,
        including the dates and times that your account was used. You can also
        see the IP addresses which were used to access your account. These are
        the details displayed from the device;
      </Typography>
      <ul style={{ listStylePosition: "outside" }}>
        <li>IP address</li>
        <li>Browser/App infomation</li>
        <li>Device information</li>
        <li>Accessed location</li>
      </ul>
      <Box mt={3}>
        {requestLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress
              className={classes.loader}
              size="50px"
              disableShrink
            />
          </div>
        ) : (
          <React.Fragment>
            <div className={classes.sessions_wrap}>
              {sessionsData.sessions.map((session) => {
                return (
                  <Grid
                    container
                    xs={6}
                    sm={4}
                    md={3}
                    direction="column"
                    alignItems="center"
                    alignContent="center"
                    justify="center"
                    spacing={2}
                    key={session.id}
                  >
                    <Grid item xs={12}>
                      {deviceDetector.parse(session.user_agent).device.type ===
                      "desktop" ? (
                        <ComputerIcon
                          className={
                            sessionsData.current === session.id &&
                            classes.activeSession
                          }
                          fontSize="large"
                        />
                      ) : (
                        <PhoneAndroidIcon
                          className={
                            sessionsData.current === session.id &&
                            classes.activeSession
                          }
                          fontSize="large"
                          F
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
                          sessionsData.current === session.id &&
                          classes.activeSession
                        }
                      >
                        {sessionsData.current === session.id
                          ? "Current device"
                          : moment.unix(session.last_activity).fromNow()}
                      </Grid>
                      <Grid item>
                        {`${
                          deviceDetector.parse(session.user_agent).os.name
                        } | ${
                          deviceDetector.parse(session.user_agent).client.name
                        }`}
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        justify="flex-end"
                        variant="contained"
                        color="primary"
                        onClick={() => setMoreOnSession(session.id)}
                        size="small"
                        style={{ textTransform: "none", padding: "0" }}
                      >
                        more
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
            <br />
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setRequestLoading(true)}
              startIcon={<SyncIcon />}
            >
              Refresh device list
            </Button>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

export default ActiveSessions;
