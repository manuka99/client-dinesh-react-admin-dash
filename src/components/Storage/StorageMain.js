import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { NavLink } from "react-router-dom";
import {
  Box,
  CardActionArea,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UploadImage from "./UploadImage/UploadImage";
import MediaLibrary from "./MediaLibrary/MediaLibrary";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "none",
    outline: "none",
    width: "90%",
    height: "90%",
    margin: "auto",
    overflow: "hidden",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function StorageMain({ status, setIsStorageOpen }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Modal
      className={classes.modal}
      open={status}
      closeAfterTransition
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={status}>
        <Paper className={classes.paper}>
          <CardActionArea
            style={{
              position: "relative",
              display: "flex",
              height: "7vh",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" align="right">
              Storage bucket
            </Typography>
            <Button
              style={{
                position: "absolute",
                right: "20px",
              }}
              variant="contained"
              color="secondary"
              onClick={() => setIsStorageOpen(false)}
            >
              close
            </Button>
          </CardActionArea>
          <AppBar
            style={{
              height: "6vh",
            }}
            position="static"
            elevation={0}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Upload media" {...a11yProps(0)} />
              <Tab label="Media library" {...a11yProps(1)} />
              <Tab label="Extras" {...a11yProps(2)} disabled />
            </Tabs>
          </AppBar>
          <div style={{ height: "77vh", overflow: "auto" }}>
            <TabPanel style={{ display: value === 0 ? "block" : "none" }}>
              <UploadImage />
            </TabPanel>
            <TabPanel style={{ display: value === 1 ? "block" : "none" }}>
              <MediaLibrary />
            </TabPanel>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
}
