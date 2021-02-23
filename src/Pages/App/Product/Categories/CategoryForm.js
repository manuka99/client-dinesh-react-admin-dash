import React, { useState, useRef } from "react";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Divider,
  makeStyles,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  TextareaAutosize,
  Link,
} from "@material-ui/core";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../util/api";
import CategoryMenuItem from "../ProductItem/CategorySection/NewCategory/CategoryMenuItem";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  flexColumnDiv: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const initialNewCategoryData = {
  name: "",
  image: "",
  slug: "",
  description: "",
  root_id: "",
};

function CategoryForm({ categories, fetchCategories, oldData }) {
  const [newCategoryData, setNewCategoryData] = useState(
    oldData ? oldData : initialNewCategoryData
  );
  const [newCategoryBtnLoader, setNewCategoryBtnLoader] = useState(false);
  const route_prefix = "http://localhost:8000/laravel-filemanager";
  const origin_prefix = "http://localhost:8000";
  const windowRef = useRef(null);
  const classes = useStyles();
  const postUrl = oldData
    ? `/categories/update/${oldData.id}`
    : "/categories/new";

  const handleNewCategoryData = (e) => {
    setNewCategoryData({
      ...newCategoryData,
      [e.target.name]: e.target.value,
    });
  };

  const saveCategory = () => {
    if (newCategoryData.name !== "") {
      setNewCategoryBtnLoader(true);
      api()
        .post(postUrl, newCategoryData)
        .then((res) => {
          swal(
            oldData
              ? "Category was updated successfully"
              : "Category was added successfully"
          );
          !oldData && setNewCategoryData(initialNewCategoryData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setNewCategoryBtnLoader(false);
          fetchCategories();
        });
    } else alert("Category name is required");
  };

  const selectImage = () => {
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
      setNewCategoryData({ ...newCategoryData, image: event.data[0].url });
  };

  return (
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">
              {oldData ? "Update category" : " Add new category"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardContent className={classes.flexColumnDiv}>
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
            helperText="The name is how it appears on your site."
            required
          />
          <TextField
            label="Category slug"
            name="slug"
            type="text"
            variant="outlined"
            color="primary"
            size="small"
            style={{ width: "100%" }}
            value={newCategoryData.slug}
            helperText="The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
            onChange={handleNewCategoryData}
          />
          <FormControl variant="outlined" size="small">
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
            <FormHelperText>
              Assign a parent term to create a hierarchy. The term Jazz, for
              example, would be the parent of Bebop and Big Band.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <TextareaAutosize
              name="description"
              value={newCategoryData.description}
              onChange={handleNewCategoryData}
              rowsMin={6}
              placeholder="Description"
            />
            <FormHelperText>
              The description is not prominent by default; however, some themes
              may show it.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              Thumbnail
            </Typography>
            <img
              height="80px"
              onClick={selectImage}
              width="100px"
              src={
                newCategoryData.image
                  ? newCategoryData.image
                  : "/images/no_image.jpg"
              }
              alt="new-category"
            />
            {newCategoryData.image ? (
              <Link
                color="secondary"
                variant="body2"
                style={{ fontSize: "0.8rem" }}
                onClick={() =>
                  setNewCategoryData({ ...newCategoryData, image: "" })
                }
                gutterBottom
              >
                remove category image
              </Link>
            ) : (
              ""
            )}
          </FormControl>
          <ButtonProgress
            name={oldData ? "Update category" : "Create category"}
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            loading={newCategoryBtnLoader}
            handleButtonClick={saveCategory}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoryForm;
