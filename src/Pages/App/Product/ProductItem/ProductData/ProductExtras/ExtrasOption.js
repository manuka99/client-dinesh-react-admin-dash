import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, ButtonGroup, Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import OptionValue from "./OptionValue";
import ExtraForm from "./ExtraForm";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 46,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    flexBasis: "6%",
  },
  secondaryHeading: {
    width: "100%",
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  flexDiv: {
    display: "flex",
    gap: "2%",
    flexWrap: "wrap",
    width: "100%",
    marginTop: theme.spacing(2),
  },
  border: {
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
  borderReverse: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.neutral.reverse}`,
    width: "100%",
  },
}));

export default function ExtrasOption({ option, fetchProductExtras }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteOption = () => {
    setDeleteBtnLoading(true);
    api()
      .delete(`/extras/variant/destroy/${option.id}`)
      .then((res) => fetchProductExtras())
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
        <Typography className={classes.heading} variant="subtitle2">
          #{option.id}
        </Typography>
        <Typography variant="h6">{option.display_name}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.flexColumnDiv}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "70% 25%",
            gap: "5%",
          }}
        >
          <span className={classes.secondaryHeading}>
            Display name: {option.display_name} <br />
            Add-ons count: {option.count}
            <br />
            Selection count: {option.select_count}
            <br />
          </span>
          <ButtonProgress
            color="secondary"
            size="small"
            variant="contained"
            loading={deleteBtnLoading}
            handleButtonClick={deleteOption}
            name="delete"
            startIcon={<DeleteIcon fontSize="small" />}
          />
        </div>
        <Button
          variant="text"
          size="small"
          color="primary"
          startIcon={
            editMode ? (
              <IndeterminateCheckBoxIcon size="small" />
            ) : (
              <AddBoxIcon size="small" />
            )
          }
          onClick={() => setEditMode(!editMode)}
        >
          Edit add-ons
        </Button>
        {editMode && (
          <ExtraForm fetchProductExtras={fetchProductExtras} oldData={option} />
        )}
        <div className={classes.border}>
          <Divider />
          <div className={classes.flexDiv}>
            {option.extrasValues.map((addon) => (
              <OptionValue
                key={addon.id}
                addon={addon}
                fetchProductExtras={fetchProductExtras}
              />
            ))}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
