import React, { useState, useContext } from "react";
import { Box, makeStyles, TextField } from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import swal from "sweetalert";
import { ProductContext } from "../../ProductItem";

const initialAttributeData = { name: "", type: "variant" };

const styles = makeStyles((theme) => ({
  flexRowDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
    width: "100%",
  },

  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

export default function AttributeForm({ fetchOptions, oldData }) {
  const classes = styles();
  const [attributeData, setAttributeData] = useState(
    oldData ? oldData : initialAttributeData
  );
  const [btnLoader, setBtnLoader] = useState(false);
  const productContext = useContext(ProductContext);
  const url = oldData
    ? `/options/option/update/${oldData.id}`
    : `/options/option/${productContext.product_id}`;

  const handleAttributeData = (e) => {
    setAttributeData({
      ...attributeData,
      type: "variant",
      [e.target.name]: e.target.value,
    });
  };

  const saveAttribute = (e) => {
    e.preventDefault();
    setBtnLoader(true);
    api()
      .post(url, attributeData)
      .then((res) => {
        fetchOptions();
        swal("Attribute was saved successfully");
        setAttributeData(initialAttributeData);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 422)
          swal(error.response.data.message);
        fetchOptions();
      })
      .finally(() => setBtnLoader(false));
  };

  return (
    <div className={classes.flexRowDiv}>
      <form onSubmit={saveAttribute}>
        <TextField
          label="Attribute name"
          name="name"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ width: "100%" }}
          value={attributeData.name}
          onChange={handleAttributeData}
          required
        />
        <Box mt={2}>
          <ButtonProgress
            name={oldData ? "update data" : "create new "}
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            loading={btnLoader}
          />
        </Box>
      </form>
    </div>
  );
}
