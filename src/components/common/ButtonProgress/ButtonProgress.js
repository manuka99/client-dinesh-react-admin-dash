import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      position: "relative",
      display: "inline-block",
    },
    buttonProgress: {
      color: theme.palette.primary.main,
      position: "absolute",
      top: "20%",
      left: "45%",
    },
  })
);

function ButtonProgress({ loading, handleButtonClick, name }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        disabled={loading}
        onClick={handleButtonClick}
        startIcon={<SaveIcon />}
      >
        {name}
      </Button>
      {loading && (
        <CircularProgress size={26} className={classes.buttonProgress} />
      )}
    </div>
  );
}

export default ButtonProgress;
