import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProgressBar from "react-topbar-progress-indicator";

const styles = makeStyles((theme) => ({
  img: {
    display: "block",
    margin: "100px auto",
  },
}));

function DashboardFallback() {
  const classes = styles();
  return (
    <div>
      <ProgressBar />
      <img
        className={classes.img}
        src="/images/progress/pizza-slices.gif"
        width="240px"
        alt="pizza-slices-progress"
      />
    </div>
  );
}

export default DashboardFallback;
