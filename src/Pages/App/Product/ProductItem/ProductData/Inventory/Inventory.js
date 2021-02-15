import React, { useState, useContext, useEffect } from "react";
import {
  CardActionArea,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import { useSnackbar } from "notistack";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import swal from "sweetalert";

const initialData = {
  sku_id: "",
  manage_stock: 0,
  stock_qty: 0,
  low_stock_threshold: "",
  back_orders: 0,
  order_limit_count: "",
  order_limit_days: "",
};

function Inventory() {
  const [inventory, setInventory] = useState(initialData);
  const [btnLoading, setBtnLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const productContext = useContext(ProductContext);

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setInventory({ ...inventory, [name]: value });
  };

  useEffect(() => {
    productContext.mainLoader(true);
    api()
      .get(`/products/simple_bundle/${productContext.product_id}`)
      .then((res) => setInventory({ ...res.data.inventory }))
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
      .post(`/products/simple_bundle/${productContext.product_id}`, inventory)
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
    <Grid container style={{ width: "100%" }} spacing={1} direction="row">
      <Grid item xs={12}>
        <TextField
          label="Sku ID"
          variant="outlined"
          color="primary"
          fullWidth
          value={inventory.sku_id}
          name="sku_id"
          size="small"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <CardActionArea style={{ padding: "14px 0" }}>
          <Typography variant="body1" gutterBottom>
            Stock management
          </Typography>
          <Divider />
          <FormControlLabel
            control={
              <Checkbox
                checked={inventory.manage_stock === 1 ? true : false}
                onChange={(e) =>
                  setInventory({
                    ...inventory,
                    manage_stock: e.target.checked ? 1 : 0,
                  })
                }
                name="manage_stock"
                color="primary"
              />
            }
            label="Manage stock at product level"
          />
        </CardActionArea>
      </Grid>
      {inventory.manage_stock === 1 && (
        <React.Fragment>
          <Grid item xs={6}>
            <TextField
              label="Stock QTY"
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
              name="stock_qty"
              type="number"
              value={inventory.stock_qty}
              onChange={(e) =>
                setInventory({
                  ...inventory,
                  stock_qty: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Low stock threshold"
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
              type="number"
              value={inventory.low_stock_threshold}
              name="low_stock_threshold"
              onChange={(e) =>
                setInventory({
                  ...inventory,
                  low_stock_threshold: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inventory.back_orders === 1 ? true : false}
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      back_orders: e.target.checked ? 1 : 0,
                    })
                  }
                  name="back_orders"
                  color="primary"
                />
              }
              label={
                <Typography variant="subtitle2">
                  Allow back-orders when stock runs out
                </Typography>
              }
            />
          </Grid>
        </React.Fragment>
      )}
      <Grid item xs={12}>
        <CardActionArea style={{ padding: "14px 0" }}>
          <Typography variant="body1">
            Limit orders for individual users
          </Typography>
          <Divider />
        </CardActionArea>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Order limit count"
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
          value={inventory.order_limit_count}
          name="order_limit_count"
          type="number"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Order limit days"
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
          value={inventory.order_limit_days}
          name="order_limit_days"
          type="number"
          onChange={handleChange}
        />
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

export default Inventory;
