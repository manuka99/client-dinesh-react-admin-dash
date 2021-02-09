import React, { useState, useEffect } from "react";
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
  const classes = styles();
  const [productGalleryImageUrls, setProductGalleryImageUrls] = useState([]);
  const route_prefix = "http://localhost:8000/laravel-filemanager";

  useEffect(() => {
    //save to db
    console.log(productGalleryImageUrls);
  }, [productGalleryImageUrls]);

  const selectImages = () => {
    window.open(
      route_prefix + "?type=file&multiple=true",
      "FileManager",
      "width=900,height=600"
    );

    window.addEventListener(
      "message",
      (event) => {
        console.log(event);
        if (event.origin === "http://localhost:3000");
        {
          if (Array.isArray(event.data)) {
            var urls = new Array();
            event.data.map((image) => {
              urls.push(image.url);
            });
            setProductGalleryImageUrls([...productGalleryImageUrls, ...urls]);
          }
        }
      },
      false
    );
  };

  const clearImage = (index) => {
    setProductGalleryImageUrls([
      ...productGalleryImageUrls.slice(0, index),
      ...productGalleryImageUrls.slice(index + 1),
    ]);
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
          {productGalleryImageUrls.length > 0 && (
            <Grid container spacing={2}>
              {productGalleryImageUrls.map((url, index) => (
                <Grid item xs={2} md={4}>
                  <div className={classes.imageDiv}>
                    <div className={classes.cancelIconDiv}>
                      {index}
                      <CancelIcon
                        className={classes.cancelIcon}
                        onClick={() => clearImage(index)}
                      />
                    </div>
                    <CardMedia
                      key={index}
                      component="img"
                      alt="Product image"
                      height="80"
                      title="Product image"
                      image={url}
                      className={classes.image}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
          <Link href="#" onClick={selectImages}>
            Add product gallery images
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductGallery;
