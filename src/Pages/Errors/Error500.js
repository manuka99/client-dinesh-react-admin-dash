import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    width: 560,
    maxHeight: 300,
    height: "auto",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
}));

const Error500 = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    document.title = "Error 500";
  }, []);

  return (
    <Box mt={15}>
      <Typography align="center" variant={mobileDevice ? "h5" : "h4"}>
        500: Ooops, something went terribly wrong!
      </Typography>
      <Typography align="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Under development"
          className={classes.image}
          src="/images/undraw_server_down_s4lk.svg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button color="primary" component={NavLink} to="/" variant="outlined">
          Back to home
        </Button>
      </div>
    </Box>
  );
};

export default Error500;
