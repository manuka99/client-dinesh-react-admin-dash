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

function VariantsContainer({
  optionsWithValues,
  setProductVariants,
  productVariants,
}) {
  const classes = useStyles();

  const deleteChange = (id) => {
    var deletedVariantIndex = productVariants.findIndex((productVariant) => {
      if (productVariant.id === id) return true;
    });
    if (deletedVariantIndex >= 0)
      setProductVariants([
        ...productVariants.slice(0, deletedVariantIndex),
        ...productVariants.slice(
          deletedVariantIndex + 1,
          productVariants.length
        ),
      ]);
  };
  return (
    <div className={classes.root}>
      {productVariants.map((productVariant) => (
        <Variant
          optionsWithValues={optionsWithValues}
          productVariant={productVariant}
          deleteChange={deleteChange}
        />
      ))}
    </div>
  );
}

export default VariantsContainer;
