import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import api from "../../../../../util/api";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";

const initialNewOptionData = { name: "", description: "" };

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

function NewExtra({ fetchOptions }) {
  const classes = styles();
  const [newOptionData, setNewOptionData] = useState(initialNewOptionData);
  const [newOptionBtnLoader, setNewOptionBtnLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleNewOptionData = (e) => {
    setNewOptionData({
      ...newOptionData,
      [e.target.name]: e.target.value,
    });
  };

  const createNewOption = (e) => {
    e.preventDefault();
    setNewOptionBtnLoader(true);
    api()
      .post(`/extras/store`, newOptionData)
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
    <Card>
      <CardContent className={classes.flexRowDiv}>
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
          New extras option
        </Button>
        {showForm && (
          <form className={classes.flexRowDiv} onSubmit={createNewOption}>
            <TextField
              label="Extras option name"
              name="name"
              type="text"
              variant="outlined"
              color="primary"
              size="small"
              style={{ minWidth: "320px" }}
              value={newOptionData.name}
              onChange={handleNewOptionData}
              required
            />

            <TextField
              label="Short description"
              name="description"
              type="text"
              variant="outlined"
              color="primary"
              size="small"
              style={{ minWidth: "320px" }}
              value={newOptionData.description}
              onChange={handleNewOptionData}
              required
            />

            <ButtonProgress
              name="create option"
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              min="0"
              loading={newOptionBtnLoader}
            />
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default NewExtra;
