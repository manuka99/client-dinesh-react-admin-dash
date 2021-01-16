import React from "react";
import { NavLink } from "react-router-dom";
import {
  clsx,
  useTheme,
  Drawer,
  List,
  Divider,
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListItem,
  ListItemIcon,
  ListItemText,
  InboxIcon,
  MailIcon,
  MainDashStyles,
} from "../../assets/StyleImports";

function SideNavBar({ open, handleDrawerClose }) {
  const classes = MainDashStyles();
  const theme = useTheme();
  return (
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
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          key="moveLogin"
          button
          component={NavLink}
          to="/login"
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Run" />
        </ListItem>
        <ListItem
          key="signup"
          button
          component={NavLink}
          to="/panel"
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Run" />
        </ListItem>
        <ListItem
          key="fruits"
          button
          component={NavLink}
          to="/panel/fruits"
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Run" />
        </ListItem>
        <ListItem
          key="fruits-res"
          button
          component={NavLink}
          to="/panel/fruits/fruit"
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Run" />
        </ListItem>
        <ListItem
          key="login"
          activeClassName="Mui-selected"
          button
          component={NavLink}
          to="/panel//login"
          exact
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Run" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}

export default SideNavBar;
