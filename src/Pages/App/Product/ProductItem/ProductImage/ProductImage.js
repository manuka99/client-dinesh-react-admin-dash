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
  CardMedia,
} from "@material-ui/core";
import api from "../../../../../util/api";
import StorageMain from "../../../../../components/Storage/StorageMain";

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

function ProductImage({ handleProductData }) {
  const classes = styles();
  const [productImage, setProductImage] = useState("");
  const route_prefix = "http://localhost:8000/laravel-filemanager";
  const [isStorageOpen, setIsStorageOpen] = useState(false);

  useEffect(() => {
    handleProductData("image", productImage);
  }, [productImage]);

  const selectImage = () => {
    window.open(
      route_prefix + "?type=file&multiple=false",
      "FileManager",
      "width=900,height=600"
    );

    window.addEventListener(
      "message",
      (event) => {
        console.log(event);
        if (event.origin !== "http://localhost:3000");
        {
          if (Array.isArray(event.data)) {
            setProductImage(event.data[0].url);
          }
        }
      },
      false
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <StorageMain status={isStorageOpen} setIsStorageOpen={setIsStorageOpen} />
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
          {productImage ? (
            <React.Fragment>
              <CardMedia
                component="img"
                alt="Product image"
                height="140"
                title="Product image"
                onClick={selectImage}
                image={productImage}
              />
              <Typography variant="subtitle2" gutterBottom>
                Click on the image to edit or update.
              </Typography>
              <Link href="#" onClick={() => setProductImage("")}>
                Remove product image
              </Link>
            </React.Fragment>
          ) : (
            <Link href="#" onClick={selectImage}>
              Set product image
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductImage;
