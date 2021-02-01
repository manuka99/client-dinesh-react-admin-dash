import React from "react";
import {
  clsx,
  useTheme,
  Drawer,
  List,
  Divider,
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
  MainDashStyles,
  Typography,
} from "../../../assets/StyleImports";
import SideNavItems from "./SideNavItems";
import { NavItems1, NavItems2 } from "./NavItems";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Avatar } from "@material-ui/core";
import store from "../../../Redux/store";

function SideNavBar({ open, handleDrawerOpen, handleDrawerClose }) {
  const classes = MainDashStyles();
  const theme = useTheme();
  const user_data = store.getState().currentUser.user_data;

  return (
    <Paper elevation={1}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.paper]: true,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className={`${classes.profile} ${!open && classes.hideProfile}`}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              src="/images/user-avatar.png"
            />
            <Typography variant="h6" className={classes.name}>
              {user_data.user.fname} {user_data.user.lname}
            </Typography>
            <Typography variant="body2" className={classes.name}>
              {user_data.roles.length > 0
                ? user_data.roles.map((role) => role.name)
                : "Guest mode"}
            </Typography>
          </div>
          <IconButton
            className={`${classes.drawerStatusIcon} ${classes.drawerIcon}`}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon className={classes.drawerIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.disabled}>Dashboard</Typography>
              }
            />
          </ListItem>
          <List>
            <SideNavItems
              drawerOpenStatus={open}
              navItems={NavItems1()}
              handleDrawerOpen={handleDrawerOpen}
            />
          </List>
          <Divider />
          <ListItem>
            <ListItemIcon className={classes.drawerIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.disabled}>
                  Other Actions
                </Typography>
              }
            />
          </ListItem>
          <List>
            <SideNavItems
              navItems={NavItems2()}
              handleDrawerOpen={handleDrawerOpen}
            />
          </List>
        </List>
      </Drawer>
    </Paper>
  );
}

export default React.memo(SideNavBar);
