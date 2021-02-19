import React, { useState, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Link,
  Typography,
  Divider,
  CardActionArea,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import { ProductContext } from "../../ProductItem";
import { useSnackbar } from "notistack";
import swal from "sweetalert";
import CustomFeild from "../../../../../../components/common/CustomFeild/CustomFeild";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  labelSmall: {
    fontSize: "0.9rem",
  },
  gridDiv: {
    display: "grid",
    gridTemplateColumns: "25% 75%",
    alignItems: "center",
    gap: theme.spacing(0),
  },
}));

export default function VariantForm({
  currentProductVariant,
  handleEventDataChange,
  handleVariantData,
  setErrors,
}) {
  const [btnLoaders, setBtnLoaders] = useState({ save: false });
  const productContext = useContext(ProductContext);
  const windowRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const route_prefix = "http://localhost:8000/laravel-filemanager";
  const origin_prefix = "http://localhost:8000";

  const saveVariant = () => {
    setBtnLoaders({ ...btnLoaders, save: true });
    api()
      .post(`/product/variants/update/${productContext.product_id}`, [
        currentProductVariant,
      ])
      .then((res) =>
        enqueueSnackbar("All data have been saved", { variant: "success" })
      )
      .catch((e) => {
        if (e.response && e.response.status === 422) {
          swal("Error occured when saving data");
          setErrors(e.response.data);
        }
      })
      .finally(() => setBtnLoaders({ ...btnLoaders, save: false }));
  };

  const selectVariantImage = () => {
    windowRef.current = window.open(
      route_prefix + "?type=file&multiple=false",
      "ProductImage",
      "width=900,height=600"
    );

    window.addEventListener("message", onRecieveImageUrls, false);
  };
  const onRecieveImageUrls = (event) => {
    if (
      event.source === windowRef.current &&
      event.origin === origin_prefix &&
      Array.isArray(event.data)
    )
      handleVariantData("image", event.data[0].url);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridRowGap: "10px",
          gridTemplateColumns: "repeat(4, auto)",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          style={{ border: "2px solid #ccc", gridRow: "1/3" }}
          height="100%"
          width="110px"
          onClick={selectVariantImage}
          alt={`product-variant-${currentProductVariant.id}-image`}
          src={
            currentProductVariant.image
              ? currentProductVariant.image
              : "/images/no_image.jpg"
          }
        />

        <TextField
          label="SKU ID"
          size="small"
          fullWidth
          name="sku_id"
          variant="outlined"
          value={currentProductVariant.sku_id}
          onChange={handleEventDataChange}
          style={{ gridColumn: "3 / 5" }}
        />

        <div
          style={{
            gridColumn: "3 / 5",
            border: "2px solid #f3f3f3",
            borderLeft: "none",
            borderRight: "none",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={currentProductVariant.enable}
                onChange={handleVariantData}
                name="enable"
                color="primary"
                onChange={(e) =>
                  handleVariantData("enable", e.target.checked ? 1 : 0)
                }
                icon={<VisibilityOffIcon />}
                checkedIcon={<VisibilityIcon />}
              />
            }
            label="Variant availability"
            classes={{ label: classes.labelSmall }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={currentProductVariant.manage_stock}
                onChange={(e) =>
                  handleVariantData("manage_stock", e.target.checked ? 1 : 0)
                }
                name="manage_stock"
                color="primary"
              />
            }
            label="Manage stock"
            classes={{ label: classes.labelSmall }}
          />
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomFeild
            prefix="Rs "
            label="Regular price"
            variant="outlined"
            color="primary"
            fullWidth
            value={currentProductVariant.regular_price}
            name="regular_price"
            size="small"
            onChange={handleEventDataChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFeild
            prefix="Rs "
            label="Offer price"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            value={currentProductVariant.offer_price}
            name="offer_price"
            onChange={handleEventDataChange}
          />
        </Grid>

        {currentProductVariant.schedule_offer !== 1 && (
          <Grid item xs={12}>
            <Link
              onClick={() => handleVariantData("schedule_offer", 1)}
              variant="body2"
            >
              Schedule
            </Link>
          </Grid>
        )}
        {currentProductVariant.schedule_offer === 1 && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Offer from"
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                name="offer_from"
                type="datetime-local"
                value={
                  currentProductVariant.offer_from &&
                  currentProductVariant.offer_from.replace(" ", "T")
                }
                onChange={(e) =>
                  handleVariantData(
                    "offer_from",
                    e.target.value.replace("T", " ")
                  )
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Offer to"
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                type="datetime-local"
                value={
                  currentProductVariant.offer_to &&
                  currentProductVariant.offer_to.replace(" ", "T")
                }
                name="offer_to"
                onChange={(e) =>
                  handleVariantData(
                    "offer_to",
                    e.target.value.replace("T", " ")
                  )
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={10}>
              <Link
                onClick={() => {
                  handleVariantData("schedule_offer", 0);
                }}
                variant="body2"
                color="secondary"
              >
                Cancel schedule
              </Link>
            </Grid>
          </>
        )}
        {/* stock */}
        {currentProductVariant.manage_stock === 1 && (
          <React.Fragment>
            <Grid item xs={12}>
              <CardActionArea style={{ paddingTop: "8px" }}>
                <Typography
                  variant="subtitle2"
                  style={{ fontSize: "1rem" }}
                  gutterBottom
                >
                  Stock management
                  <Divider />
                </Typography>
              </CardActionArea>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Stock QTY"
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                name="stock_qty"
                type="number"
                value={currentProductVariant.stock_qty}
                onChange={handleEventDataChange}
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
                value={currentProductVariant.low_stock_threshold}
                name="low_stock_threshold"
                onChange={handleEventDataChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      currentProductVariant.back_orders === 1 ? true : false
                    }
                    onChange={(e) =>
                      handleVariantData("back_orders", e.target.checked ? 1 : 0)
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
        {/* order limit */}
        <Grid item xs={12}>
          <CardActionArea style={{ paddingTop: "8px" }}>
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
            value={currentProductVariant.order_limit_count}
            name="order_limit_count"
            type="number"
            onChange={handleEventDataChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Order limit days"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            value={currentProductVariant.order_limit_days}
            name="order_limit_days"
            type="number"
            onChange={handleEventDataChange}
          />
        </Grid>
        {/* shipping */}
        <Grid item xs={12}>
          <CardActionArea style={{ paddingTop: "8px" }}>
            <Typography variant="body1">Product shipping management</Typography>
            <Divider />
          </CardActionArea>
        </Grid>
        <Grid item xs={12}>
          <InputLabel
            className={classes.gridDiv}
            classes={{ root: classes.labelSmall }}
          >
            Weight:
            <CustomFeild
              prefix="Kg "
              variant="outlined"
              color="primary"
              fullWidth
              value={currentProductVariant.weight}
              name="weight"
              size="small"
              onChange={handleEventDataChange}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={12}>
          <InputLabel
            id="weight"
            className={classes.gridDiv}
            classes={{ root: classes.labelSmall }}
          >
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
                    value={currentProductVariant.length}
                    name="length"
                    size="small"
                    onChange={handleEventDataChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomFeild
                    prefix="Cm "
                    variant="outlined"
                    color="primary"
                    placeholder="width"
                    fullWidth
                    value={currentProductVariant.width}
                    name="width"
                    size="small"
                    onChange={handleEventDataChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomFeild
                    prefix="Cm "
                    variant="outlined"
                    color="primary"
                    placeholder="height"
                    fullWidth
                    value={currentProductVariant.height}
                    name="height"
                    size="small"
                    onChange={handleEventDataChange}
                  />
                </Grid>
              </Grid>
            </div>
          </InputLabel>
        </Grid>
        <Grid item xs={12}>
          <InputLabel
            className={classes.gridDiv}
            classes={{ root: classes.labelSmall }}
          >
            Shipping class:
            <FormControl size="small">
              <Select
                variant="outlined"
                onChange={handleEventDataChange}
                name="shipping_class"
                value={currentProductVariant.shipping_class}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={1}>Pizza</MenuItem>
              </Select>
            </FormControl>
          </InputLabel>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "10px" }}>
          <ButtonProgress
            color="primary"
            size="small"
            fullWidth
            style={{ fontSize: "0.75rem" }}
            variant="contained"
            handleButtonClick={saveVariant}
            loading={btnLoaders.save}
            name="Save changes"
          />
        </Grid>
      </Grid>
    </>
  );
}
