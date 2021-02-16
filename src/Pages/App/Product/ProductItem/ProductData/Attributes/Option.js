import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Button,
  ButtonGroup,
  TextField,
  Divider,
  Link,
} from "@material-ui/core";
import OptionValue from "./OptionValue";
import AsyncSelect from "react-select/async";
import swal from "sweetalert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import AttributeForm from "./AttributeForm";

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

const initialData = {
  name: "",
  type: "variant",
};

export default function Option({ option, fetchOptions }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [newValueNames, setNewValueNames] = useState(initialData);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onChangeInput = (e) => {
    setNewValueNames({
      ...newValueNames,
      type: "variant",
      [e.target.name]: e.target.value,
    });
  };

  const saveOptionValues = () => {
    if (newValueNames.name !== "") {
      setBtnLoading(true);
      api()
        .post(`/options/option_value/${option.id}`, newValueNames)
        .then((res) => {
          swal("Sub-attributes were added successfully!");
          fetchOptions();
          setNewValueNames(initialData);
        })
        .catch((e) => {
          if (e.response && e.response.status === 422)
            swal(e.response.data.message);
        })
        .finally(() => setBtnLoading(false));
    } else alert("Type sub attributes names. Feild cannot be empty.");
  };

  const deleteOption = () => {
    setDeleteBtnLoading(true);
    api()
      .delete(`/options/option/destroy/${option.id}`)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setDeleteBtnLoading(false));
  };

  const deleteAllSubAttributes = () => {
    setDeleteBtnLoading(true);
    api()
      .delete(`/options/option_value/destroy-all/${option.id}`)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setDeleteBtnLoading(false));
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
        <span className={classes.secondaryHeading}>
          Atribute name: {option.name}
          <br />
          Sub attribute count: {option.values.length}
          <br />
        </span>
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
            <div className={`${classes.flexColumnDiv2}`}>
              <Typography variant="subtitle2">
                Edit option data <Divider />
              </Typography>
              <AttributeForm fetchOptions={fetchOptions} oldData={option} />
            </div>
          </>
        )}

        <div className={classes.flexColumnDiv3}>
          <Typography variant="subtitle2" gutterBottom>
            Seperate multiple sub-attributes with commas.
          </Typography>
          <div className={classes.gridDiv}>
            <TextField
              styles={{ width: "75%" }}
              name="name"
              size="small"
              variant="outlined"
              label="Sub-attributes"
              value={newValueNames.name}
              onChange={onChangeInput}
            />
            <ButtonProgress
              name="Add Sub-attributes"
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

        {option.values.length > 1 && (
          <Link onClick={deleteAllSubAttributes} color="secondary">
            Delete all sub-attributes
          </Link>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
