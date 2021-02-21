import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  makeStyles,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import swal from "sweetalert";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";

const initialnewExtra = { display_name: "", select_count: "", extras_id: "" };

const styles = makeStyles((theme) => ({
  flexRowDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

export default function ExtraForm({
  fetchProductExtras,
  oldData,
  productVariantId,
}) {
  const classes = styles();
  const [newExtra, setNewExtra] = useState(oldData ? oldData : initialnewExtra);
  const [newExtraBtnLoader, setNewExtraBtnLoader] = useState(false);
  const [extras, setExtras] = useState([]);
  const productContext = useContext(ProductContext);
  const url = oldData
    ? `/extras/variant/update/${oldData.id}`
    : productVariantId
    ? `/extras/variant/store/${productVariantId}`
    : `/extras/product/variant/store/${productContext.product_id}`;

  const handleNewExtra = (e) => {
    setNewExtra({
      ...newExtra,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    api()
      .get(`/extras/index`)
      .then((res) => setExtras(res.data))
      .catch((e) => console.log(e));
  }, []);

  const saveNewProductAddon = (e) => {
    e.preventDefault();
    setNewExtraBtnLoader(true);
    api()
      .post(url, newExtra)
      .then((res) => {
        !oldData && setNewExtra(initialnewExtra);
        fetchProductExtras();
        swal("Add-ons were added successfully");
      })
      .catch((error) => {
        console.log(error);
        fetchProductExtras();
      })
      .finally(() => setNewExtraBtnLoader(false));
  };

  return (
    <div className={classes.flexRowDiv}>
      <form onSubmit={saveNewProductAddon}>
        <TextField
          label="Name"
          name="display_name"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ width: "100%" }}
          value={newExtra.display_name}
          onChange={handleNewExtra}
          required
        />
        <TextField
          label="Selection count"
          name="select_count"
          type="number"
          variant="outlined"
          color="primary"
          size="small"
          style={{ width: "100%" }}
          value={newExtra.select_count}
          onChange={handleNewExtra}
          className={classes.formControl}
          required
        />
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}
        >
          <InputLabel id="extras_id">Add-ons class</InputLabel>
          <Select
            id="extras_id"
            label="Add-ons class"
            value={newExtra.extras_id}
            name="extras_id"
            required
            onChange={handleNewExtra}
            MenuProps={{ disablePortal: true }}
          >
            <MenuItem value="">None</MenuItem>
            {extras.map((extra) => (
              <MenuItem key={extra.id} value={extra.id}>
                {extra.name} ({extra.count} add-ons)
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <ButtonProgress
            name="Save changes"
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            loading={newExtraBtnLoader}
          />
        </Box>
      </form>
    </div>
  );
}
