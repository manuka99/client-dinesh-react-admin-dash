import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import ExtrasOption from "./ExtrasOption";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.neutral.brown,
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: theme.spacing(1),
  },
}));

function ExtrasOptions({ options, fetchOptions }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {options.map((option) => (
        <ExtrasOption
          key={option.id}
          option={option}
          fetchOptions={fetchOptions}
        />
      ))}
    </Paper>
  );
}

export default ExtrasOptions;
