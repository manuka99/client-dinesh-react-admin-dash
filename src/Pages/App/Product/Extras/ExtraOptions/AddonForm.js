import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField, Divider, Link } from "@material-ui/core";
import api from "../../../../../util/api";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";
import CustomFeild from "../../../../../components/common/CustomFeild/CustomFeild";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  flexRowDiv: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    width: "100%",
  },
  flexColumnDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    width: "100%",
  },
  flexColumnDiv2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: theme.spacing(4),
    flexWrap: "wrap",
    width: "100%",
  },
}));

const initialData = {
  name: "",
  price: 0,
  image: "",
  layer_image: "",
};

function AddonForm({ eid, fetchOptionValues, oldOptionData }) {
  const [optionData, setOptionData] = useState(
    oldOptionData ? oldOptionData : initialData
  );
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const imageRef = useRef(null);
  const layerImageRef = useRef(null);
  const route_prefix = "http://localhost:8000/laravel-filemanager";
  const origin_prefix = "http://localhost:8000";
  const classes = useStyles();

  const newAddonSubmit = (e) => {
    e.preventDefault();
    setUpdateBtnLoading(true);
    api()
      .post(`/extras/values/store/${eid}`, optionData)
      .then((res) => {
        setOptionData(initialData);
        swal("Addon has been added successfully!");
        fetchOptionValues();
      })
      .catch((e) => console.log(e))
      .finally(() => setUpdateBtnLoading(false));
  };

  const updateAddonSubmit = (e) => {
    e.preventDefault();
    setUpdateBtnLoading(true);
    api()
      .post(`/extras/values/update/${oldOptionData.id}`, optionData)
      .then((res) => {
        swal("Addon has been updated successfully!");
        fetchOptionValues();
      })
      .catch((e) => console.log(e))
      .finally(() => setUpdateBtnLoading(false));
  };

  const handleOptionData = (e) => {
    setOptionData({ ...optionData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.removeEventListener("message", onRecieveImageUrls, false);
    // eslint-disable-next-line
  }, [optionData.image]);

  useEffect(() => {
    window.removeEventListener("message", onRecieveLayerImageUrls, false);
    // eslint-disable-next-line
  }, [optionData.layer_image]);

  const selectNewImage = () => {
    imageRef.current = window.open(
      route_prefix + "?type=file&multiple=false",
      "ProductImage",
      "width=900,height=600"
    );

    window.addEventListener("message", onRecieveImageUrls, false);
  };

  const selectNewLayerImage = () => {
    layerImageRef.current = window.open(
      route_prefix + "?type=file&multiple=false",
      "ProductImage",
      "width=900,height=600"
    );

    window.addEventListener("message", onRecieveLayerImageUrls, false);
  };

  const onRecieveImageUrls = (event) => {
    if (
      event.source === imageRef.current &&
      event.origin === origin_prefix &&
      Array.isArray(event.data)
    ) {
      setOptionData({ ...optionData, image: event.data[0].url });
    }
  };

  const onRecieveLayerImageUrls = (event) => {
    if (
      event.source === layerImageRef.current &&
      event.origin === origin_prefix &&
      Array.isArray(event.data)
    ) {
      setOptionData({ ...optionData, layer_image: event.data[0].url });
    }
  };

  return (
    <form
      className={`${classes.flexColumnDiv2}`}
      onSubmit={oldOptionData ? updateAddonSubmit : newAddonSubmit}
    >
      <div className={classes.flexColumnDiv}>
        <Typography variant="h5">
          {oldOptionData ? "Update Addon" : "New Addon"}
          <Divider />
        </Typography>

        <TextField
          label="Addon name"
          name="name"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ minWidth: "300px" }}
          value={optionData.name}
          onChange={handleOptionData}
          required
        />

        <CustomFeild
          label="Price"
          name="price"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ minWidth: "300px" }}
          value={optionData.price}
          onChange={handleOptionData}
          required
          prefix="Rs "
        />
      </div>
      <div className={classes.flexColumnDiv}>
        <Typography variant="subtitle2">* Addon display image</Typography>
        <Typography variant="body2">
          This image will be displayed to the user in the selecting tab, if no
          image is specified then a default image will be displayed. It is
          recomended to have a smaller (size) with high resolution image.
        </Typography>
        {optionData.image ? (
          <div className={classes.flexColumnDiv}>
            <img
              alt={optionData.name}
              src={optionData.image}
              width="100px"
              height="100px"
            />
            <div className={classes.flexRowDiv}>
              <Link onClick={selectNewImage}>Change image</Link>
              <Link
                onClick={() => setOptionData({ ...optionData, image: "" })}
                color="secondary"
              >
                Remove image
              </Link>
            </div>
          </div>
        ) : (
          <Link onClick={selectNewImage}>Select new image</Link>
        )}
      </div>

      <div className={classes.flexColumnDiv}>
        <Typography variant="subtitle2">* Addon layer image</Typography>
        <Typography variant="body2">
          This image will be displayed to the user after the selecting tab, if
          no image is specified then no image will be displayed. It is
          recomended to have a image of size equal to the product image with
          high resolution image. This layer image will be applied on top of the
          product main image.
        </Typography>
        {optionData.layer_image ? (
          <div className={classes.flexColumnDiv}>
            <img
              alt={optionData.name}
              src={optionData.layer_image}
              width="100px"
              height="100px"
            />
            <div className={classes.flexRowDiv}>
              <Link onClick={selectNewLayerImage}>Change image</Link>
              <Link
                onClick={() =>
                  setOptionData({ ...optionData, layer_image: "" })
                }
                color="secondary"
              >
                Remove image
              </Link>
            </div>
          </div>
        ) : (
          <Link onClick={selectNewLayerImage}>Select new image</Link>
        )}
      </div>

      <ButtonProgress
        name={oldOptionData ? "update option" : "Create addon"}
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        min="0"
        loading={updateBtnLoading}
      />
    </form>
  );
}

export default AddonForm;
