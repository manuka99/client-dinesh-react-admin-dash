import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import store from "../../Redux/store";
import { connect } from "react-redux";
import { set_app_theme } from "../../Redux";

const IOSSwitch = withStyles((theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

function ThemeSwitch({ theme, set_app_theme }) {
  const handleChange = () => {
    set_app_theme(theme === "dark" ? "light" : "dark");
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={theme === "dark"}
            onChange={handleChange}
            name="checked"
          />
        }
        label="Dark mode"
      />
    </FormGroup>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.currentUser.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_app_theme: (theme) => dispatch(set_app_theme(theme)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);
