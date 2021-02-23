import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Divider,
  Box,
} from "@material-ui/core";
import api from "../../../../util/api";
import CategoryForm from "./CategoryForm";
import AllCategories from "./AllCategories";

function CategoriesMain() {
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
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">Category management</Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              Product categories for your store can be managed here. To change
              the order of categories on the front-end you can drag and drop to
              sort them. To see more categories listed click the "screen
              options" link at the top-right of this page.
            </Typography>
            <Typography variant="body2" gutterBottom>
              The “slug” is the URL-friendly version of the name. It is usually
              all lowercase and contains only letters, numbers, and hyphens.
            </Typography>
            <Typography variant="body2">
              Assign a parent term to create a hierarchy. The term Jazz, for
              example, would be the parent of Bebop and Big Band.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <CategoryForm
              categories={categories}
              fetchCategories={fetchCategories}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AllCategories
              categories={categories}
              fetchCategories={fetchCategories}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default CategoriesMain;
