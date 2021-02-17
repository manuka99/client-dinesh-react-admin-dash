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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
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
  gridDiv: {
    width: "100%",
    display: "grid",
    gap: "5%",
    gridTemplateColumns: "20% 75%",
    alignItems: "center",
  },
  flexDiv: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
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
}));

export default function Variant({
  optionsWithValues,
  productVariant,
  deleteChange,
}) {
  const [btnLoaders, setBtnLoaders] = useState({ delete: false });
  const classes = useStyles();

  const getSelectedOptionValue = (option_id) => {
    const product_varient_value = productVariant.product_varient_values.find(
      (product_varient_value) => {
        if (product_varient_value.option_id === option_id)
          return parseInt(product_varient_value.id);
      }
    );
    return product_varient_value ? product_varient_value.id : "";
  };

  const deleteVariant = () => {
    setBtnLoaders({ ...btnLoaders, delete: true });
    api()
      .delete(`/product/variants/destroy/${productVariant.id}`)
      .then((res) => deleteChange(res.data))
      .catch((e) => console.log(e))
      .finally(() => setBtnLoaders({ ...btnLoaders, delete: false }));
  };

  return (
    <Accordion>
      <AccordionSummary
        className={classes.root}
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <div
          aria-label="Acknowledge"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          className={classes.flexDiv}
          style={{ marginRight: "10px" }}
        >
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="subtitle2" color="textSecondary">
                #{productVariant.id}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <div className={classes.flexDiv}>
                {optionsWithValues.map((option) => {
                  if (option.option_values.length > 0)
                    return (
                      <FormControl
                        key={option.id}
                        size="small"
                        variant="outlined"
                        style={{ flexBasis: "30%", margin: "1%" }}
                      >
                        <InputLabel id={option.id}>{option.name}</InputLabel>
                        <Select
                          labelId={option.id}
                          id="size"
                          label={option.name}
                          value={getSelectedOptionValue(option.id)}
                          style={{ width: "100%" }}
                        >
                          {option.option_values.map((option_value) => {
                            return (
                              <MenuItem
                                key={option_value.id}
                                value={parseInt(option_value.id)}
                              >
                                {option_value.value_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    );
                })}
              </div>
            </Grid>
            <Grid item xs={1}>
              <ButtonProgress
                color="secondary"
                size="small"
                style={{ fontSize: "0.75rem" }}
                variant="contained"
                handleButtonClick={deleteVariant}
                loading={btnLoaders.delete}
                name="Delete"
              />
            </Grid>
          </Grid>
        </div>
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
