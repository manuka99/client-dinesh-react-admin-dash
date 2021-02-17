import React, { useState, useEffect, useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import Variant from "./Variant";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}));

function VariantsContainer({ optionsWithValues, productVariants }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {productVariants.map((productVariant) => (
        <Variant
          optionsWithValues={optionsWithValues}
          productVariant={productVariant}
        />
      ))}
    </div>
  );
}

export default VariantsContainer;
