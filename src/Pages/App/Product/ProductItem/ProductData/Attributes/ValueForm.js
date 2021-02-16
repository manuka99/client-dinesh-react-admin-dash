import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField, Divider, Link } from "@material-ui/core";
import swal from "sweetalert";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";

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
  value_name: "",
  value_image: "",
};

function ValueForm({ data, fetchOptions }) {
  const [optionData, setOptionData] = useState(data);
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const imageRef = useRef(null);
  const route_prefix = "http://localhost:8000/laravel-filemanager";
  const origin_prefix = "http://localhost:8000";
  const classes = useStyles();

  const updateValueSubmit = (e) => {
    e.preventDefault();
    setUpdateBtnLoading(true);
    api()
      .post(`/options/option_value/update/${optionData.id}`, optionData)
      .then((res) => {
        swal("Attribute has been updated successfully!");
        fetchOptions();
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
  }, [optionData.value_image]);

  const selectNewImage = () => {
    imageRef.current = window.open(
      route_prefix + "?type=file&multiple=false",
      "Value Image",
      "width=900,height=600"
    );

    window.addEventListener("message", onRecieveImageUrls, false);
  };

  const onRecieveImageUrls = (event) => {
    if (
      event.source === imageRef.current &&
      event.origin === origin_prefix &&
      Array.isArray(event.data)
    ) {
      setOptionData({ ...optionData, value_image: event.data[0].url });
    }
  };

  return (
    <form className={`${classes.flexColumnDiv2}`} onSubmit={updateValueSubmit}>
      <div className={classes.flexColumnDiv}>
        <Typography variant="h5">
          Update value
          <Divider />
        </Typography>

        <TextField
          label="Sub-attribute name"
          name="value_name"
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          style={{ minWidth: "300px" }}
          value={optionData.value_name}
          onChange={handleOptionData}
          required
        />
      </div>
      <div className={classes.flexColumnDiv}>
        <Typography variant="subtitle2">
          * Sub-attribute display image
        </Typography>
        <Typography variant="body2">
          This image will be displayed to the user in the selecting tab, if no
          image is specified then a default image will be displayed. It is
          recomended to have a smaller (size) with high resolution image.
        </Typography>
        {optionData.value_image ? (
          <div className={classes.flexColumnDiv}>
            <img
              alt={optionData.value_name}
              src={optionData.value_image}
              width="100px"
              height="100px"
            />
            <div className={classes.flexRowDiv}>
              <Link onClick={selectNewImage}>Change image</Link>
              <Link
                onClick={() =>
                  setOptionData({ ...optionData, value_image: "" })
                }
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

      <ButtonProgress
        name="update value"
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

export default ValueForm;
