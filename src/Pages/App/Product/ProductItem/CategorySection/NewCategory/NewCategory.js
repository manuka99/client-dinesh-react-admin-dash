import React, { useState } from "react";
import {
  Box,
  makeStyles,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import CategoryMenuItem from "./CategoryMenuItem";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

const initialNewCategoryData = { name: "", slug: "", root_id: "" };

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
    transition: "0.8s ease",
    maxHeight: "0px",
    width: "100%",
  },
  formMainShow: {
    overflow: "visible",
    transition: "0.8s ease",
    maxHeight: "15em",
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

function NewCategory({ categories, fetchCategories }) {
  const classes = styles();
  const [newCategoryData, setnewCategoryData] = useState(
    initialNewCategoryData
  );
  const [newCategoryBtnLoader, setNewCategoryBtnLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleNewCategoryData = (e) => {
    setnewCategoryData({
      ...newCategoryData,
      [e.target.name]: e.target.value,
    });
  };

  const createNewCategory = (e) => {
    e.preventDefault();
    setNewCategoryBtnLoader(true);
    api()
      .post("/categories/new", newCategoryData)
      .then((res) => {
        fetchCategories();
        swal("Category was added successfully");
        setnewCategoryData(initialNewCategoryData);
      })
      .catch((error) => {
        console.log(error);
        fetchCategories();
      })
      .finally(() => setNewCategoryBtnLoader(false));
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
        New category
      </Button>
      <form
        className={showForm ? classes.formMainShow : classes.formMainHide}
        onSubmit={createNewCategory}
      >
        <TextField
          label="Category name"
          name="name"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ width: "100%" }}
          value={newCategoryData.name}
          onChange={handleNewCategoryData}
          required
        />
        <TextField
          className={classes.formControl}
          label="Category slug"
          name="slug"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ width: "100%" }}
          value={newCategoryData.slug}
          onChange={handleNewCategoryData}
        />
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}
        >
          <InputLabel id="parent_category">Parent category</InputLabel>
          <Select
            id="parent_category"
            label="Parent category"
            value={newCategoryData.root_id}
            name="root_id"
            onChange={handleNewCategoryData}
            MenuProps={{ disablePortal: true }}
          >
            <MenuItem value="">None</MenuItem>
            {categories.map((category) => CategoryMenuItem(category, 16))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <ButtonProgress
            name="create category"
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            loading={newCategoryBtnLoader}
          />
        </Box>
      </form>
    </div>
  );
}

export default NewCategory;
