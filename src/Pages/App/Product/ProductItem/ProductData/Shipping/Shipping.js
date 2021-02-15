import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  InputLabel,
  makeStyles,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import { useSnackbar } from "notistack";
import CustomFeild from "../../../../../../components/common/CustomFeild/CustomFeild";
import swal from "sweetalert";

const initialData = {
  weight: 0,
  height: 0,
  width: 0,
  length: 0,
  shipping_class: 0,
};

const useStyles = makeStyles((theme) => ({
  flexDiv: {
    display: "grid",
    gridTemplateColumns: "25% 75%",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

function Shipping() {
  const [shipping, setShipping] = useState(initialData);
  const [btnLoading, setBtnLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const productContext = useContext(ProductContext);
  const classes = useStyles();

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setShipping({ ...shipping, [name]: value });
  };

  useEffect(() => {
    productContext.mainLoader(true);
    api()
      .get(`/products/simple_bundle/${productContext.product_id}`)
      .then((res) => setShipping({ ...res.data.shipping }))
      .catch((error) => {
        if (error.response && error.response.status === 422)
          swal(error.response.data.message);
      })
      .finally(() => productContext.mainLoader(false));
    // eslint-disable-next-line
  }, []);

  const update = () => {
    setBtnLoading(true);
    api()
      .post(`/products/simple_bundle/${productContext.product_id}`, shipping)
      .then((res) => {
        enqueueSnackbar("Product data saved !", { variant: "success" });
      })
      .catch((error) => {
        if (error.response && error.response.status === 422)
          swal(error.response.data.message);
      })
      .finally(() => setBtnLoading(false));
  };

  return (
    <Grid container style={{ width: "100%" }} spacing={2} direction="row">
      <Grid item xs={12}>
        <InputLabel className={classes.flexDiv}>
          Weight:
          <CustomFeild
            prefix="Kg "
            variant="outlined"
            color="primary"
            fullWidth
            value={shipping.weight}
            name="weight"
            size="small"
            onChange={handleChange}
          />
        </InputLabel>
      </Grid>
      <Grid item xs={12}>
        <InputLabel id="weight" className={classes.flexDiv}>
          Dimensions:
          <div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <CustomFeild
                  prefix="Cm "
                  variant="outlined"
                  color="primary"
                  placeholder="length"
                  fullWidth
                  value={shipping.length}
                  name="length"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomFeild
                  prefix="Cm "
                  variant="outlined"
                  color="primary"
                  placeholder="width"
                  fullWidth
                  value={shipping.width}
                  name="width"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomFeild
                  prefix="Cm "
                  variant="outlined"
                  color="primary"
                  placeholder="height"
                  fullWidth
                  value={shipping.height}
                  name="height"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </InputLabel>
      </Grid>
      <Grid item xs={12}>
        <InputLabel className={classes.flexDiv}>
          Shipping class:
          <FormControl size="small">
            <Select
              variant="outlined"
              onChange={handleChange}
              name="shipping_class"
              value={shipping.shipping_class}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={1}>Pizza</MenuItem>
            </Select>
          </FormControl>
        </InputLabel>
      </Grid>
      <Grid item xs={10}>
        <ButtonProgress
          name="update"
          color="primary"
          variant="contained"
          size="small"
          loading={btnLoading}
          handleButtonClick={update}
        />
      </Grid>
    </Grid>
  );
}

export default Shipping;
