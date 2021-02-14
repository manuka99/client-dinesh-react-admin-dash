import React, { useState, useContext } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { ProductContext } from "../../ProductItem";

const initialNewOptionData = { name: "", select_count: "", type: "bundle" };

const styles = makeStyles((theme) => ({
  flexRowDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
    width: "100%",
  },
  formMainHide: {
    overflow: "hidden",
    transition: "0.5s ease",
    maxHeight: "0px",
    width: "100%",
  },
  formMainShow: {
    overflow: "visible",
    transition: "0.5s ease",
    maxHeight: "15em",
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

function NewOption({ fetchOptions }) {
  const classes = styles();
  const [newOptionData, setNewOptionData] = useState(initialNewOptionData);
  const [newOptionBtnLoader, setNewOptionBtnLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const productContext = useContext(ProductContext);

  const handleNewOptionData = (e) => {
    setNewOptionData({
      ...newOptionData,
      type: "bundle",
      [e.target.name]: e.target.value,
    });
  };

  const createNewOption = (e) => {
    e.preventDefault();
    setNewOptionBtnLoader(true);
    api()
      .post(`/options/option/${productContext.product_id}`, newOptionData)
      .then((res) => {
        fetchOptions();
        swal("Option was added successfully");
        setNewOptionData(initialNewOptionData);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422)
          swal(error.response.data.message);
        fetchOptions();
      })
      .finally(() => setNewOptionBtnLoader(false));
  };

  return (
    <div className={classes.flexRowDiv}>
      <Button
        variant="text"
        size="small"
        color="primary"
        startIcon={
          showForm ? (
            <IndeterminateCheckBoxIcon size="small" />
          ) : (
            <AddBoxIcon size="small" />
          )
        }
        onClick={() => setShowForm(!showForm)}
      >
        New option
      </Button>
      <form
        className={`${showForm ? classes.formMainShow : classes.formMainHide} ${
          classes.flexRowDiv
        }`}
        onSubmit={createNewOption}
      >
        <TextField
          label="Option name"
          name="name"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ width: "100%" }}
          value={newOptionData.name}
          onChange={handleNewOptionData}
          required
        />

        <TextField
          label="Selection count per option"
          name="select_count"
          type="number"
          variant="outlined"
          color="primary"
          size="small"
          style={{ width: "100%" }}
          value={newOptionData.select_count}
          onChange={handleNewOptionData}
          InputProps={{ inputProps: { min: 0 } }}
          required
        />

        <ButtonProgress
          name="create option"
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          min="0"
          fullWidth
          loading={newOptionBtnLoader}
        />
      </form>
    </div>
  );
}

export default NewOption;
