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
} from "../../../assets/StyleImports";
import SideNavItems from "./SideNavItems";
import { NavItems1 } from "./NavItems";
import Paper from "@material-ui/core/Paper";

function SideNavBar({ open, handleDrawerClose }) {
  const classes = MainDashStyles();
  const theme = useTheme();

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
          <SideNavItems navItems={NavItems1()} />
        </List>
        <Divider />
      </Drawer>
    </Paper>
  );
}

export default React.memo(SideNavBar);
