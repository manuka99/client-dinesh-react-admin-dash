import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CssBaseline, MainDashStyles } from "../../assets/StyleImports";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SideNavBar from "../../components/common/SideNavigation/SideNavBar";
import TopNavBar from "../../components/common/TopNavBar";

function PanelContainer() {
  const classes = MainDashStyles();
  let location = useLocation();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Administration Dashboard";
  }, []);

  useEffect(() => {
    console.log("route changed");
    console.log(location);
  }, [location]);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <TopNavBar open={open} handleDrawerOpen={handleDrawerOpen} />

      <SideNavBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <main className={`${classes.content} ${open && classes.constentShift}`}>
        
        <div className={classes.toolbar} />
    
        <Breadcrumb />

        <Box mb={6}>
          <Outlet />
        </Box>
      </main>
    </div>
  );
}

export default PanelContainer;
