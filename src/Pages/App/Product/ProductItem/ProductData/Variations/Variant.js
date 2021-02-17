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
import AsyncSelect from "react-select/async";
import swal from "sweetalert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";

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

export default function Variant({ optionsWithValues, productVariant }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        <Typography className={classes.heading}>
          #{productVariant.id}
        </Typography>
        <Typography className={classes.secondaryHeading}>
          {productVariant.regular_price}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.flexColumnDiv}>
        <span className={classes.secondaryHeading}>
          Atribute name:
          <br />
          Sub attribute count:
          <br />
        </span>
      </AccordionDetails>
    </Accordion>
  );
}
