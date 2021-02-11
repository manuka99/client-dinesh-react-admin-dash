import React, { useState, useContext } from "react";
import { Grid, Link, TextField, InputAdornment } from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import CurrencyFeild from "../../../../../../components/common/CurrencyFeild/CurrencyFeild";

function GeneralMain() {
  const [generalData, setGeneralData] = useState({});
  const [isSchedule, setIsSchedule] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const productContext = useContext(ProductContext);

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setGeneralData({ ...generalData, [name]: value });
  };

  const update = () => {
    setBtnLoading(true);
    api()
      .post(`/products/general_data/${productContext.product_id}`, generalData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e))
      .finally(() => setBtnLoading(false));
  };

  return (
    <Grid container style={{ width: "100%" }} spacing={2} direction="row">
      <Grid item xs={6}>
        <CurrencyFeild
          label="Regular price"
          variant="outlined"
          color="primary"
          fullWidth
          value={generalData.regular_price}
          name="regular_price"
          size="small"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyFeild
          label="Offer price"
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
          value={generalData.sale_price}
          name="offer_price"
          onChange={handleChange}
        />
      </Grid>

      {!isSchedule && (
        <Grid item xs={12}>
          <Link onClick={() => setIsSchedule(true)} variant="body2">
            Schedule
          </Link>
        </Grid>
      )}
      {isSchedule && (
        <React.Fragment>
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
                generalData.offer_from &&
                generalData.offer_from.replace(" ", "T")
              }
              onChange={(e) =>
                setGeneralData({
                  ...generalData,
                  offer_from: e.target.value.replace("T", " "),
                })
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
                generalData.offer_to && generalData.offer_to.replace(" ", "T")
              }
              name="offer_to"
              onChange={(e) =>
                setGeneralData({
                  ...generalData,
                  offer_to: e.target.value.replace("T", " "),
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={10}>
            <Link
              onClick={() => {
                setGeneralData({
                  ...generalData,
                  offer_from: "",
                  offer_to: "",
                });
                setIsSchedule(false);
              }}
              variant="body2"
            >
              Cancel
            </Link>
          </Grid>
        </React.Fragment>
      )}
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

export default GeneralMain;
