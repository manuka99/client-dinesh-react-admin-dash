import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  Link,
  CardMedia,
  Grid,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import api from "../../../../../util/api";
import { ProductContext } from "../ProductItem";
import useStateCallback from "../../../../../components/customHooks/useStateCallback";

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
  imageDiv: {
    position: "relative",
    width: "100%",
    height: "80px",
    "&:hover": {
      "& $cancelIconDiv": {
        opacity: "1",
      },
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    zIndex: "1",
  },
  cancelIconDiv: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(232, 232, 232, 0.8)",
    zIndex: "2",
    opacity: "0",
    transition: "0.6s",
  },
  cancelIcon: {
    zIndex: "3",
    width: "20px",
    width: "40px",
    color: "#ff0000",
  },
}));

function ProductGallery() {
  const productContext = useContext(ProductContext);
  const [productGalleryImages, setProductGalleryImages] = useStateCallback([]);
  const classes = styles();
  const route_prefix = "http://localhost:8000/laravel-filemanager";
  const windowRef = useRef(null);

  useEffect(() => {
    //fetch gallery images
    productContext.mainLoader(true);
    api()
      .get(`/products/${productContext.product_id}`)
      .then((res) => {
        setProductGalleryImages([...res.data.productGalleryImages]);
      })
      .catch((errors) => console.log(errors))
      .finally(() => productContext.mainLoader(false));
  }, []);

  useEffect(() => {
    //clear events
    return () =>
      window.removeEventListener("message", onRecieveImageUrls, false);
  }, [productGalleryImages]);

  const selectImages = () => {
    //open popup to seklect images
    windowRef.current = window.open(
      route_prefix + "?type=file&multiple=true",
      "ProductGallery",
      "width=900,height=600"
    );
    window.addEventListener("message", onRecieveImageUrls, false);
  };

  const onRecieveImageUrls = (event) => {
    // selected images on the file manager
    if (event.source === windowRef.current) {
      if (event.origin === "http://localhost:3000");
      {
        if (Array.isArray(event.data)) {
          var newImages = new Array();
          event.data.map((image) => {
            image.pid = productContext.product_id;
            image.type = "product";
            newImages.push(image);
          });
          setProductGalleryImages(
            [...productGalleryImages, ...newImages],
            updateGalleryDB
          );
        }
      }
    }
  };

  const updateGalleryDB = (data) => {
    // update new images to db
    productContext.mainLoader(true);
    api()
      .post(`/gallery/${productContext.product_id}`, { images: data })
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
      .finally(() => productContext.mainLoader(false));
  };

  const clearImage = (index) => {
    setProductGalleryImages(
      [
        ...productGalleryImages.slice(0, index),
        ...productGalleryImages.slice(index + 1),
      ],
      updateGalleryDB
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              Product gallery
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent className={classes.flexRowDiv}>
          {productGalleryImages.length > 0 && (
            <Grid container spacing={2}>
              {productGalleryImages.map((image, index) => (
                <Grid item xs={2} md={4}>
                  <div className={classes.imageDiv}>
                    <div className={classes.cancelIconDiv}>
                      <CancelIcon
                        className={classes.cancelIcon}
                        onClick={() => clearImage(index)}
                      />
                    </div>
                    <CardMedia
                      key={index}
                      component="img"
                      alt={image.name}
                      height="80"
                      title={image.name}
                      image={image.url}
                      className={classes.image}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
          <Link onClick={selectImages}>Add product gallery images</Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductGallery;
