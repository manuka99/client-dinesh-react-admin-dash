import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  Grid,
  Link,
} from "@material-ui/core";
import api from "../../../../../util/api";

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

function ProductImage({ setIsStorageOpen }) {
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
              Product image
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent className={classes.flexRowDiv}>
          <Link href="#" onClick={() => setIsStorageOpen(true)}>
            Set product image
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductImage;
