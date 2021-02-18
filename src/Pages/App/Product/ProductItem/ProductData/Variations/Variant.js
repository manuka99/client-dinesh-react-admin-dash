import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { sortableHandle } from "react-sortable-hoc";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import { ProductContext } from "../../ProductItem";
import useStateCallback from "../../../../../../components/customHooks/useStateCallback";
import { useSnackbar } from "notistack";
import swal from "sweetalert";

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
  delete: {
    position: "relative",
    right: "120%",
    transition: "right 100s ease",
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
}));

export default function Variant({
  optionsWithValues,
  productVariant,
  deleteChange,
  dataChangeHandler,
  setErrors,
}) {
  const [btnLoaders, setBtnLoaders] = useState({ delete: false, save: false });
  const productContext = useContext(ProductContext);
  const [currentProductVariant, setCurrentProductVariant] = useStateCallback(
    productVariant
  );
  const [variantOptionChanged, setVariantOptionChanged] = useState(false);
  const [variantChanged, setVariantChanged] = useState(false);
  const [variantDeleted, setVariantDeleted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    if (variantChanged) {
      console.log("data changed");
      dataChangeHandler(variantChanged);
    }
    // eslint-disable-next-line
  }, [variantOptionChanged, currentProductVariant]);

  useEffect(() => {
    if (variantDeleted) {
      setTimeout(() => {
        deleteChange(currentProductVariant.id);
        setVariantDeleted(false);
      }, 660);
    }
    // return () => clearTimeout(deleteTimer);
    // eslint-disable-next-line
  }, [variantDeleted]);

  // to render option id
  const getSelectedOptionValue = (option_id) => {
    const product_varient_value = currentProductVariant.product_varient_values.find(
      (product_varient_value) => {
        return product_varient_value.option_id === option_id;
      }
    );
    return product_varient_value ? product_varient_value.id : "";
  };

  //on change option
  const onChangeOption = (e) => {
    const option_id = e.target.name;
    const option_value_id = e.target.value;
    var option_found = false;

    var variant = currentProductVariant;

    //eslint-disable-next-line
    variant.product_varient_values.map((product_varient_value) => {
      if (product_varient_value.option_id === option_id) {
        product_varient_value.id = option_value_id;
        option_found = true;
      }
    });
    // create a new option value
    if (!option_found) {
      var option = {
        id: option_value_id,
        option_id: option_id,
      };
      variant.product_varient_values.push(option);
    }

    setVariantChanged(true);
    setCurrentProductVariant(
      variant,
      setVariantOptionChanged(!variantOptionChanged)
    );
  };

  const deleteVariant = () => {
    setBtnLoaders({ ...btnLoaders, delete: true });
    api()
      .delete(`/product/variants/destroy/${currentProductVariant.id}`)
      .then((res) => {
        if (res.data === currentProductVariant.id) {
          enqueueSnackbar("Variant was deleted successfully", {
            variant: "success",
          });
          setVariantDeleted(true);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setBtnLoaders({ ...btnLoaders, delete: false }));
  };

  const saveVariant = () => {
    setBtnLoaders({ ...btnLoaders, save: true });
    api()
      .post(`/product/variants/update/${productContext.product_id}`, [
        currentProductVariant,
      ])
      .then((res) =>
        enqueueSnackbar("All data have been saved", { variant: "success" })
      )
      .catch((e) => {
        if (e.response && e.response.status === 422) {
          swal("Error occured when saving data");
          setErrors(e.response.data);
        }
      })
      .finally(() => setBtnLoaders({ ...btnLoaders, save: false }));
  };

  const DragHandle = sortableHandle(() => (
    <Typography variant="subtitle2" color="textSecondary">
      #{currentProductVariant.id}
    </Typography>
  ));

  return (
    <Accordion
      style={{
        position: variantDeleted ? "relative" : "static",
        right: variantDeleted ? "120%" : "0",
        transition: "right 1s ease",
      }}
    >
      <AccordionSummary
        className={classes.root}
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <div className={classes.flexDiv} style={{ marginRight: "10px" }}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={1} style={{ cursor: "all-scroll" }}>
              <DragHandle />
            </Grid>
            <Grid
              item
              xs={10}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
              <div className={classes.flexDiv} aria-label="Acknowledge">
                {/* eslint-disable-next-line */}
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
                          id={option.id}
                          name={option.id}
                          label={option.name}
                          value={getSelectedOptionValue(option.id)}
                          onChange={onChangeOption}
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="">None</MenuItem>
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
            <Grid
              item
              xs={1}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
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
        <ButtonProgress
          color="primary"
          size="small"
          style={{ fontSize: "0.75rem" }}
          variant="contained"
          handleButtonClick={saveVariant}
          loading={btnLoaders.save}
          name="Save changes"
        />
      </AccordionDetails>
    </Accordion>
  );
}
