import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  CssBaseline,
  Typography,
  MainDashStyles,
} from "../../assets/StyleImports";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SideNavBar from "../../components/common/SideNavigation/SideNavBar";
import TopNavBar from "../../components/common/TopNavBar";

function PanelContainer() {
  const classes = MainDashStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Administration Dashboard";
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <TopNavBar open={open} handleDrawerOpen={handleDrawerOpen} />

      <SideNavBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Breadcrumb />

        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>

        <Outlet />
      </main>
    </div>
  );
}

export default PanelContainer;
