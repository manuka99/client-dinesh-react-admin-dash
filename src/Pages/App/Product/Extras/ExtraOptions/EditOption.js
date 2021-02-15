import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField, Divider } from "@material-ui/core";
import api from "../../../../../util/api";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";

const useStyles = makeStyles((theme) => ({
  flexColumnDiv2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    width: "100%",
  },
}));

function EditOption({ option, fetchOptions }) {
  const [optionData, setOptionData] = useState(option);
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const classes = useStyles();

  const updateOptionData = (e) => {
    e.preventDefault();
    setUpdateBtnLoading(true);
    api()
      .post(`/extras/update/${option.id}`, optionData)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setUpdateBtnLoading(false));
  };

  const handleOptionData = (e) => {
    setOptionData({ ...optionData, [e.target.name]: e.target.value });
  };

  return (
    <form className={`${classes.flexColumnDiv2}`} onSubmit={updateOptionData}>
      <Typography variant="h5">
        Edit option data <Divider />
      </Typography>

      <TextField
        label="Option name"
        name="name"
        type="text"
        variant="outlined"
        color="primary"
        size="small"
        style={{ minWidth: "320px" }}
        defaultValue={option.name}
        onChange={handleOptionData}
        required
      />

      <TextField
        label="Short description"
        name="description"
        type="text"
        variant="outlined"
        color="primary"
        size="small"
        style={{ minWidth: "320px" }}
        defaultValue={option.description}
        onChange={handleOptionData}
        required
      />

      <ButtonProgress
        name="update option"
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

export default EditOption;
