import React, { useContext, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  MenuItem,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import api from "../../../../util/api";
import ComponentModal from "../../../../components/Modals/ComponentModal";
import CategoryForm from "./CategoryForm";
import { PanelContext } from "../../../Panel/PanelContainer";

const useStyles = makeStyles((theme) => ({
  flexColumnDiv: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0),
  },
  flexRowDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(0),
    borderBottom: "2px solid #f3f3f3",
    "&:hover": {
      "& $otherOptions": {
        opacity: "1",
      },
    },
  },
  otherOptions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0",
    transition: "0.4s",
  },
}));

function AllCategories({ categories, fetchCategories }) {
  const panelContext = useContext(PanelContext);
  const [editCategory, setEditCategory] = useState({});
  const classes = useStyles();

  const deleteCategory = (id) => {
    panelContext.setLoading(true);
    api()
      .delete(`/categories/destroy/${id}`)
      .then((res) => fetchCategories())
      .catch((e) => console.log(e))
      .finally(() => panelContext.setLoading(false));
  };

  const CategoryItem = (category, spacing) => {
    return [
      <div className={classes.flexRowDiv}>
        <MenuItem
          key={category.id}
          style={{
            width: "90%",
            padding: `14px 10px 14px ${spacing}px`,
          }}
          value={category.id}
          name="id"
          size="small"
          color="primary"
        >
          <ListItemIcon>
            <img
              height="40px"
              width="40px"
              src={category.image ? category.image : "/images/no_image.jpg"}
              alt={`category-${category.id}`}
            />
          </ListItemIcon>
          <Typography variant="subtitle2">#{category.id}</Typography>
          <Typography style={{ marginLeft: "6px" }} variant="body2">
            {category.name}
          </Typography>
        </MenuItem>
        <div className={classes.otherOptions}>
          <Button
            color="secondary"
            size="small"
            onClick={() =>
              window.confirm(
                "Are you sure you want to delete this category and its sub-categories?"
              ) && deleteCategory(category.id)
            }
          >
            delete
          </Button>
          <Button
            color="primary"
            size="small"
            onClick={() => setEditCategory(category)}
          >
            edit
          </Button>
        </div>
      </div>,
      category.children &&
        category.children.map((x) => CategoryItem(x, spacing + 20)),
    ];
  };

  return (
    <Card>
      <ComponentModal
        title="Update category"
        status={editCategory.id ? true : false}
        closeModal={() => setEditCategory({})}
        component={
          <CategoryForm
            fetchCategories={fetchCategories}
            categories={categories}
            oldData={editCategory}
          />
        }
      />
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">All categories</Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <div className={classes.flexColumnDiv}>
        {categories.map((category) => CategoryItem(category, 20))}
      </div>
    </Card>
  );
}

export default AllCategories;
