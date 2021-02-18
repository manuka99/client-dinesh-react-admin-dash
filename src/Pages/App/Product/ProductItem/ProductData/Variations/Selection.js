import React, { useState, useContext } from "react";
import {
  FormControl,
  InputLabel,
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

function Selection({
  productVariants,
  setProductVariants,
  fetchVariants,
  posibleVariantCount,
}) {
  const [variationSelection, setVariationSelection] = useState(1);
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
    switch (variationSelection) {
      case 0:
        return true;
      case 1:
        if (posibleVariantCount > 0) return allPosible();
        else
          return alert(
            "Cannot create product variations since attributes are not created or available."
          );
      case 2:
        if (posibleVariantCount - productVariants.length > 0)
          return otherPosible();
        else
          return alert(
            "Cannot create new product variants since all variants with the given attributes are already created."
          );
      case 3:
        var confirm = window.confirm(
          "Are you sure you want to remove all product variants?"
        );
        confirm && destroyAll();
        return true;
      default:
        return true;
    }
  };

  const allPosible = () => {
    setButtonLoading({ ...buttonLoading, go: true });
    api()
      .post(`/product/variants/allPosible/${productContext.product_id}`)
      .then((res) => {
        alert(`${res.data.length} product variations have been added.`);
        setProductVariants(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setButtonLoading({ ...buttonLoading, go: false }));
  };

  const otherPosible = () => {
    setButtonLoading({ ...buttonLoading, go: true });
    api()
      .post(`/product/variants/otherPosible/${productContext.product_id}`)
      .then((res) => {
        alert(`${res.data.length} product variations have been added.`);
        setProductVariants([...productVariants, ...res.data]);
      })
      .catch((e) => console.log(e))
      .finally(() => setButtonLoading({ ...buttonLoading, go: false }));
  };

  const destroyAll = (url) => {
    setButtonLoading({ ...buttonLoading, go: true });
    api()
      .delete(`/product/variants/destroy-all/${productContext.product_id}`)
      .then((res) => {
        alert("All product variantions have been removed!");
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
            <MenuItem
              value={0}
              disabled={
                productVariants.length === 0 ||
                posibleVariantCount === productVariants.length
              }
            >
              Add variation
            </MenuItem>

            <MenuItem value={1} disabled={posibleVariantCount === 0}>
              Create all variations by deleting existing
            </MenuItem>
            <MenuItem
              value={2}
              disabled={
                productVariants.length === 0 ||
                posibleVariantCount === productVariants.length
              }
            >
              Create {posibleVariantCount - productVariants.length} variations
              which are not present
            </MenuItem>
            <MenuItem value={3} disabled={productVariants.length === 0}>
              Delete all variations
            </MenuItem>
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
