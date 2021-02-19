import React, { useState, useContext, useEffect } from "react";
import {
  Select,
  FormControl,
  CardActionArea,
  Typography,
  InputLabel,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { ProductContext } from "../../ProductItem";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import { useSnackbar } from "notistack";

function DefaultVariant({ productVariants }) {
  const [default_variant, setDefault_variant] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const productContext = useContext(ProductContext);
  const { enqueueSnackbar } = useSnackbar();

  const onChangeOption = (e) => {
    setDefault_variant(e.target.value);
  };

  //fetch product
  useEffect(() => {
    api()
      .get(`/products/${productContext.product_id}`)
      .then((res) => setDefault_variant(res.data.productData.default_variation))
      .catch((e) => console.log(e));
  }, []);

  const saveData = () => {
    setBtnLoader(true);
    api()
      .post(`/products/${productContext.product_id}`, {
        default_variation: default_variant,
      })
      .then((res) =>
        enqueueSnackbar("Default variant have been saved", {
          variant: "success",
        })
      )
      .catch((e) => console.log(e))
      .finally(() => setBtnLoader(false));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <CardActionArea>
          <Typography
            variant="subtitle2"
            style={{ fontSize: "1rem" }}
            gutterBottom
          >
            * Default variant
          </Typography>
          <Typography variant="body2">
            When you create product variations in Pizza Apes, you should create
            the default combination of those attributes. Otherwise, the add to
            cart button on your product page will appear as disabled until the
            users select the combination of attributes they want. The problem is
            that many of them simply see that the button is blocked, think that
            the page doesn’t work, and leave. That’s why if you have variable
            products in your store, creating default product attributes is
            important.
          </Typography>
        </CardActionArea>
      </Grid>
      <Grid item xs={4}>
        <FormControl
          size="small"
          variant="outlined"
          style={{
            width: "100%",
          }}
        >
          <InputLabel id="default_variant_id">Select variant id</InputLabel>
          <Select
            labelId="default_variant_id"
            id="default_variant_id"
            name="default_variation"
            label="Select variant id"
            value={default_variant}
            onChange={onChangeOption}
            style={{
              width: "100%",
              fontSize: "0.85rem",
            }}
          >
            <MenuItem value="">None</MenuItem>
            {productVariants.map((productVariant) => {
              return (
                <MenuItem key={productVariant.id} value={productVariant.id}>
                  {productVariant.id}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <ButtonProgress
          name="save"
          variant="outlined"
          color="primary"
          size="small"
          loading={btnLoader}
          handleButtonClick={saveData}
        />
      </Grid>
    </Grid>
  );
}

export default DefaultVariant;
