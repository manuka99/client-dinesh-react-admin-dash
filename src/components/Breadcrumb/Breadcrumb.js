import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Box } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import GrainIcon from "@material-ui/icons/Grain";

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      display: "flex",
      cursor: "pointer",
      textTransform: "capitalize",
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    textLink: {
      textTransform: "capitalize",
    },
  })
);

export function Breadcrumb() {
  const classes = useStyles();
  let location = useLocation();
  let currentRoutes = [];

  currentRoutes = location.pathname !== "/" ? location.pathname.split("/") : [];
  currentRoutes.shift();
  currentRoutes.shift();

  return (
    <Box mt={8} mb={3}>
      <Breadcrumbs aria-label="breadcrumb" maxItems={5}>
        <Link
          color="inherit"
          component={NavLink}
          to={"/"}
          className={classes.link}
        >
          <HomeIcon className={classes.icon} />
          Home
        </Link>

        {currentRoutes.length !== 0 && (
          <Link
            color="inherit"
            component={NavLink}
            to={"/app"}
            className={classes.link}
          >
            <GrainIcon className={classes.icon} />
            Panel
          </Link>
        )}

        {currentRoutes.length !== 0 ? (
          currentRoutes.length === 1 ? (
            <Typography className={classes.textLink} color="textPrimary">
              {currentRoutes[0]}
            </Typography>
          ) : (
            currentRoutes.map((route, index) => {
              return index !== currentRoutes.length - 1 ? (
                <Link
                  component={NavLink}
                  key={index}
                  color="inherit"
                  className={classes.link}
                  to={route}
                >
                  {route}
                </Link>
              ) : (
                <Typography
                  key={index}
                  className={classes.textLink}
                  color="textPrimary"
                >
                  {route}
                </Typography>
              );
            })
          )
        ) : (
          <Typography color="textPrimary" className={classes.textLink}>
            <GrainIcon className={classes.icon} />
            Panel
          </Typography>
        )}
      </Breadcrumbs>
    </Box>
  );
}

export default Breadcrumb;
