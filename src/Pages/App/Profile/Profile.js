import React from "react";
import Typography from "@material-ui/core/Typography";
import { Outlet, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { AppBar, Container, Divider, Paper } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import SecurityIcon from "@material-ui/icons/Security";
import PhonelinkLockIcon from "@material-ui/icons/PhonelinkLock";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "42px",
    width: "100%",
  },
  tabs: {
    width: "100%",
  },
  tab: {
    width: "100%",
    height: "72px",
    // overflow: "visible",
    // textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
  },
  appbar: {
    position: "relative",
    top: "-24px",
    color: "white",
    backgroundColor: theme.palette.primary.light,
  },
}));

function Profile() {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Divider />
      <Paper elevation={4} component={Container} maxWidth="xl">
        <div className={classes.root}>
          <AppBar
            elevation="8"
            variant="elevation"
            color="default"
            className={classes.appbar}
          >
            <Tabs
              centered="true"
              variant="fullWidth"
              value={pathname}
              aria-label="profile tabs"
              TabIndicatorProps={{
                style: { height: "4px" },
              }}
            >
              <Tab
                icon={<PersonIcon />}
                label="Profile"
                activeClassName="Mui-selected"
                to="/app/profile"
                value="/app/profile"
                component={NavLink}
                classes={{
                  root: classes.tab,
                }}
                wrapped
                end
              />
              <Tab
                label="Security"
                to="/app/profile/security"
                icon={<SecurityIcon />}
                value="/app/profile/security"
                activeClassName="Mui-selected"
                component={NavLink}
                classes={{
                  root: classes.tab,
                }}
                wrapped
              />
              <Tab
                label="two Step Verification"
                icon={<PhonelinkLockIcon />}
                to="/app/profile/two-step-verification"
                value="/app/profile/two-step-verification"
                activeClassName="Mui-selected"
                component={NavLink}
                classes={{
                  root: classes.tab,
                }}
                wrapped
              />
            </Tabs>
          </AppBar>
          <Box pb={5}>
            <Outlet />
          </Box>
        </div>
      </Paper>
    </React.Fragment>
  );
}

export default Profile;
