import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";

const useStyles = makeStyles((theme) => ({
  gridDiv: {
    display: "grid",
    gridTemplateColumns: "60% 20%",
    gap: "2%",
    alignItems: "center",
  },
}));

function Selection({ fetchVariants }) {
  const [variationSelection, setVariationSelection] = useState(0);
  const [buttonLoading, setButtonLoading] = useState({
    go: false,
    variants: false,
  });
  const productContext = useContext(ProductContext);
  const classes = useStyles();

  const onSelectionGo = (e) => {
    setVariationSelection(e.target.value);
  };

  const onclickGo = () => {
    var url = "";
    switch (variationSelection) {
      case 0:
        return postUrl((url = ""));
      case 1:
        return postUrl(
          (url = `/product/variants/otherPosible/${productContext.product_id}`)
        );
      case 2:
        return postUrl(
          `/product/variants/allPosible/${productContext.product_id}`
        );
      case 3:
        return postUrl(
          `/product/variants/destroy-all/${productContext.product_id}`
        );
    }
  };

  const postUrl = (url) => {
    setButtonLoading({ ...buttonLoading, go: true });
    api()
      .post(url)
      .then((res) => {
        fetchVariants();
      })
      .catch((e) => console.log(e))
      .finally(() => setButtonLoading({ ...buttonLoading, go: false }));
  };

  return (
    <div>
      <div className={classes.gridDiv}>
        <FormControl size="small">
          <InputLabel id="variantSelection"></InputLabel>
          <Select
            onChange={onSelectionGo}
            variant="outlined"
            value={variationSelection}
          >
            <MenuItem value={0}>Add variation</MenuItem>
            <MenuItem value={1}>
              Create variations which are not present
            </MenuItem>
            <MenuItem value={2}>
              Create all variations by deleting existing
            </MenuItem>
            <MenuItem value={3}>Delete all variations</MenuItem>
          </Select>
        </FormControl>
        <ButtonProgress
          name="Go"
          variant="outlined"
          color="primary"
          size="small"
          loading={buttonLoading.go}
          handleButtonClick={onclickGo}
        />
      </div>
    </div>
  );
}

export default Selection;
