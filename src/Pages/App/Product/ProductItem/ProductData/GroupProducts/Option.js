import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, ButtonGroup, TextField, Divider } from "@material-ui/core";
import OptionValue from "./OptionValue";
import AsyncSelect from "react-select/async";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import swal from "sweetalert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 46,
    "&$expanded": {
      minHeight: 56,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "10%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  flexDiv: {
    display: "flex",
    gap: "2%",
    flexWrap: "wrap",
    width: "100%",
  },
  flexColumnDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: theme.spacing(4),
    flexWrap: "wrap",
    width: "100%",
    paddingTop: theme.spacing(3),
  },
  flexColumnDiv2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    width: "100%",
  },
  flexColumnDiv3: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: theme.spacing(1),
    flexWrap: "wrap",
    width: "100%",
  },
  gridDiv: {
    width: "100%",
    display: "grid",
    gap: "5%",
    gridTemplateColumns: "60% 25%",
    alignItems: "center",
  },
}));

export default function Option({ option, fetchOptions }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [newProductNames, setNewProductNames] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [optionData, setOptionData] = useState(option);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setOptionData(option);
    // eslint-disable-next-line
  }, [editMode]);

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    return inputValue;
  };

  const onChangeSelectedOption = (e) => {
    console.log(e);
    setNewProductNames([...e]);
  };

  const loadOptions = (inputValue) => {
    if (inputValue.length > 3) {
      return api()
        .post("/search_products", { name: inputValue })
        .then((res) => {
          let options = res.data.map((product) => ({
            value: product.id,
            label: product.product_name,
          }));
          return options;
        })
        .catch((e) => {
          console.log(e);
          return [];
        });
    } else return [];
  };

  const saveOptionValues = () => {
    if (newProductNames.length > 0) {
      setBtnLoading(true);
      api()
        .post(`/options/option_value/${option.id}`, newProductNames)
        .then((res) => {
          swal("Products were added successfully!");
          fetchOptions();
          setNewProductNames([]);
        })
        .catch((e) => {
          if (e.response && e.response.status === 422)
            swal(e.response.data.message);
        })
        .finally(() => setBtnLoading(false));
    } else
      alert(
        "Type product names and select products to add. Feild cannot be empty."
      );
  };

  const deleteOption = () => {
    setDeleteBtnLoading(true);
    api()
      .delete(`/options/option/destroy/${option.id}`)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setDeleteBtnLoading(false));
  };

  const updateOptionData = (e) => {
    e.preventDefault();
    setUpdateBtnLoading(true);
    api()
      .post(`/options/option/update/${option.id}`, optionData)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setUpdateBtnLoading(false));
  };

  const handleOptionData = (e) => {
    setOptionData({ ...optionData, [e.target.name]: e.target.value });
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        className={classes.root}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>#{option.id}</Typography>
        <Typography className={classes.secondaryHeading}>
          {option.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.flexColumnDiv}>
        <ButtonGroup variant="contained" size="small" color="primary">
          <Button
            style={{ borderRadius: "4px 0 0 4px" }}
            color="primary"
            onClick={() => setEditMode(!editMode)}
            startIcon={<EditIcon fontSize="small" />}
          >
            Edit
          </Button>
          <ButtonProgress
            color="secondary"
            style={{ borderRadius: "0 4px 4px 0" }}
            loading={deleteBtnLoading}
            handleButtonClick={deleteOption}
            name="delete"
            startIcon={<DeleteIcon fontSize="small" />}
          />
        </ButtonGroup>

        {editMode && (
          <>
            <form
              className={`${classes.flexColumnDiv2}`}
              onSubmit={updateOptionData}
            >
              <Typography variant="subtitle2">
                Edit option data <Divider />
              </Typography>

              <TextField
                label="Option name"
                name="name"
                type="text"
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                defaultValue={option.name}
                onChange={handleOptionData}
                required
              />

              <TextField
                label="Selection count per option"
                name="select_count"
                type="number"
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                defaultValue={option.select_count}
                onChange={handleOptionData}
                InputProps={{ inputProps: { min: 0 } }}
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
          </>
        )}

        <div className={classes.flexColumnDiv3}>
          <Typography variant="subtitle2" gutterBottom>
            Type the first 4 letters of the product.
          </Typography>
          <div className={classes.gridDiv}>
            <AsyncSelect
              styles={{ width: "75%" }}
              isMulti
              name="pid"
              cacheOptions
              className="basic-multi-select"
              placeholder="Product names"
              loadOptions={loadOptions}
              value={newProductNames}
              defaultOptions
              onInputChange={handleInputChange}
              onChange={onChangeSelectedOption}
            />
            <ButtonProgress
              name="Add Products"
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              loading={btnLoading}
              handleButtonClick={saveOptionValues}
            />
          </div>
        </div>
        <div className={classes.flexDiv}>
          {option.values.map((value) => (
            <OptionValue
              key={value.id}
              value={value}
              fetchOptions={fetchOptions}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
