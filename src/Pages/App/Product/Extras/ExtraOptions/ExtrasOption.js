import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, ButtonGroup, Divider } from "@material-ui/core";
import swal from "sweetalert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import api from "../../../../../util/api";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";
import AddBoxIcon from "@material-ui/icons/AddBox";
import NewAddon from "./NewAddon";
import EditOption from "./EditOption";
import OptionValue from "./OptionValue";

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
    gap: theme.spacing(3),
    flexWrap: "wrap",
    width: "100%",
    paddingTop: theme.spacing(3),
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

export default function ExtrasOption({ option, fetchOptions }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newAddon, setNewAddon] = useState(false);
  const [addons, setAddons] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetchOptionValues();
  }, []);

  const saveOptionValues = () => {
    setBtnLoading(true);
    api()
      .post(`/extras/values/store/${option.id}`)
      .then((res) => {
        swal("Addons were added successfully!");
        fetchOptions();
      })
      .catch((e) => {
        if (e.response && e.response.status === 422)
          swal(e.response.data.message);
      })
      .finally(() => setBtnLoading(false));
  };

  const deleteOption = () => {
    setDeleteBtnLoading(true);
    api()
      .delete(`/extras/destroy/${option.id}`)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setDeleteBtnLoading(false));
  };

  const fetchOptionValues = () => {
    api()
      .get(`/extras/get/${option.id}`)
      .then((res) => setAddons(res.data))
      .catch((e) => console.log(e));
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
        <Typography variant="h6">{option.name}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.flexColumnDiv}>
        <Typography className={classes.secondaryHeading}>
          {option.description}
        </Typography>
        <ButtonGroup variant="contained" size="small" color="primary">
          <Button
            style={{ borderRadius: "4px 0 0 4px" }}
            color="primary"
            onClick={() => setNewAddon(!newAddon)}
            startIcon={<AddBoxIcon fontSize="small" />}
          >
            Addon
          </Button>
          <Button
            style={{ borderRadius: "0" }}
            color="default"
            onClick={() => setEditMode(!editMode)}
            startIcon={<EditIcon fontSize="small" />}
          >
            Edit option
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
          <div className={classes.borderReverse}>
            <EditOption option={option} fetchOptions={fetchOptions} />
          </div>
        )}
        {newAddon && (
          <div className={classes.borderReverse}>
            <NewAddon eid={option.id} fetchOptionValues={fetchOptionValues} />
          </div>
        )}
        <div className={classes.border}>
          <Divider />
          <div className={classes.flexDiv}>
            {addons.map((addon) => (
              <OptionValue
                key={addon.id}
                addon={addon}
                fetchOptionValues={fetchOptionValues}
              />
            ))}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
