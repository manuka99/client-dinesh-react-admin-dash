import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
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
import useStateCallback from "../../../../../../components/customHooks/useStateCallback";
import { useSnackbar } from "notistack";
import VariantForm from "./VariantForm";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
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
  labelSmall: {
    fontSize: "0.9rem",
  },
}));

function Variant({
  optionsWithValues,
  productVariant,
  deleteChange,
  dataChangeHandler,
  setErrors,
}) {
  const [btnLoaders, setBtnLoaders] = useState({ delete: false, save: false });

  const [currentProductVariant, setCurrentProductVariant] = useStateCallback(
    productVariant
  );
  const [variantOptionChanged, setVariantOptionChanged] = useState(false);
  const [variantChanged, setVariantChanged] = useState(false);
  const [variantDeleted, setVariantDeleted] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    if (variantChanged) dataChangeHandler(currentProductVariant);
    // eslint-disable-next-line
  }, [variantOptionChanged, currentProductVariant]);

  useEffect(() => {
    if (variantDeleted) {
      setTimeout(() => {
        deleteChange(currentProductVariant.id);
      }, 1000);
    }
    // return () => clearTimeout(deleteTimer);
    // eslint-disable-next-line
  }, [variantDeleted]);

  // to render option id
  const getSelectedOptionValue = useCallback((option_id) => {
    const product_varient_value = currentProductVariant.product_varient_values.find(
      (product_varient_value) => {
        return product_varient_value.option_id === option_id;
      }
    );
    return product_varient_value ? product_varient_value.id : "";
  }, []);

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
    if (
      window.confirm("Are you sure you want to delete this product variant?")
    ) {
      setBtnLoaders({ ...btnLoaders, delete: true });
      // productContext.mainLoader(true);
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
        .finally(() => {
          setBtnLoaders({ ...btnLoaders, delete: false });
          // productContext.mainLoader(false);
        });
    }
  };

  const DragHandle = sortableHandle(() => (
    <Typography
      variant="subtitle2"
      style={{
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: "0.7rem",
        fontWeight: "bold",
      }}
    >
      #{currentProductVariant.id}
    </Typography>
  ));

  const handleEventDataChange = (e) => {
    handleVariantData(e.target.name, e.target.value);
  };

  const handleVariantData = (name, value) => {
    setVariantChanged(true);
    setCurrentProductVariant({
      ...currentProductVariant,
      [name]: value,
    });
  };

  return (
    <Accordion
      style={{
        position: variantDeleted ? "relative" : "static",
        right: variantDeleted ? "120%" : "0",
        transition: "right 1s ease",
      }}
    >
      <AccordionSummary
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
            <Grid item xs={10}>
              <div
                className={classes.flexDiv}
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
              >
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
                          style={{
                            width: "100%",
                            fontSize: "0.85rem",
                            textTransform: "none",
                            padding: "0",
                          }}
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
                style={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  padding: "0 12px",
                }}
                handleButtonClick={deleteVariant}
                loading={btnLoaders.delete}
                name="remove"
              />
            </Grid>
          </Grid>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.flexColumnDiv}>
        <VariantForm
          setErrors={setErrors}
          currentProductVariant={currentProductVariant}
          handleEventDataChange={handleEventDataChange}
          handleVariantData={handleVariantData}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default React.memo(Variant);
