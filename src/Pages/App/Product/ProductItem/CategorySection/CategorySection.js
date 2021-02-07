import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../util/api";
import CategoryMenuItem from "./NewCategory/CategoryMenuItem";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import NewCategory from "./NewCategory/NewCategory";
import ProductCategories from "./ProductCategories/ProductCategories";

const styles = makeStyles((theme) => ({
  flexDiv: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  flexRowDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },
}));

function CategorySection() {
  const classes = styles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    api()
      .get("/categories")
      .then((res) => setCategories([...res.data.categories]))
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              Product categories
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent className={classes.flexRowDiv}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={12}>
              <ProductCategories categories={categories} />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <NewCategory
                categories={categories}
                fetchCategories={fetchCategories}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CategorySection;
