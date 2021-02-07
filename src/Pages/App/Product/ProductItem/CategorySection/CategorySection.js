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
import CategoryMenuItem from "./CategoryMenuItem";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import NewCategory from "./NewCategory";

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
  categories_div: {
    overflow: "auto",
    width: "100%",
  },
}));

function CategorySection({ handleProductData }) {
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
          <Grid container spacing={4}>
            <Grid item xs={6} md={12}>
              <Typography variant="subtitle2">All categories</Typography>
              <div className={classes.categories_div}></div>
            </Grid>
            <Grid item xs={6} md={12}>
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
