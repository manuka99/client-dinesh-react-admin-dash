import React, { useState, useContext } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Variant from "./Variant";
import api from "../../../../../../util/api";
import { useSnackbar } from "notistack";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import { ProductContext } from "../../ProductItem";
import Error from "../../../../../../components/alerts/Error";
import swal from "sweetalert";
//drag stuff
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import DefaultVariant from "./DefaultVariant";
// switch
import Switch from "@material-ui/core/Switch";
import VariantDrag from "./VariantDrag";
import Alert from "@material-ui/lab/Alert";
import useStateCallback from "../../../../../../components/customHooks/useStateCallback";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 1),
    backgroundColor: theme.palette.neutral.brown,
  },
}));

function VariantsContainer({
  optionsWithValues,
  setProductVariants,
  handleNewVariantData,
  productVariants,
  posibleVariantCount,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [btnLoaders, setBtnLoaders] = useState({ saveAll: false });
  const productContext = useContext(ProductContext);
  const [enableDrag, setEnableDrag] = useStateCallback(false);
  const [errors, setErrors] = useState([]);
  const classes = useStyles();

  var newVariantsData = productVariants;

  // remove the deleted index from the list
  const deleteChange = (id) => {
    var deletedVariantIndex = newVariantsData.findIndex((productVariant) => {
      return productVariant.id === id;
    });
    if (deletedVariantIndex >= 0) {
      setProductVariants([
        ...newVariantsData.slice(0, deletedVariantIndex),
        ...newVariantsData.slice(
          deletedVariantIndex + 1,
          newVariantsData.length
        ),
      ]);
    }
  };

  //add the new variant data to the old array
  const dataChangeHandler = (newProductVariant) => {
    var oldVariantIndex = newVariantsData.findIndex(
      (productVariant) => newProductVariant.id === productVariant.id
    );
    if (oldVariantIndex >= 0) {
      newVariantsData = [
        ...newVariantsData.slice(0, oldVariantIndex),
        newProductVariant,
        ...newVariantsData.slice(oldVariantIndex + 1, newVariantsData.length),
      ];
      handleNewVariantData(newVariantsData);
    }
  };

  const saveAllVariants = () => {
    setBtnLoaders({ ...btnLoaders, saveAll: true });
    setProductVariants(newVariantsData);
    api()
      .post(
        `/product/variants/update/${productContext.product_id}`,
        newVariantsData
      )
      .then((res) =>
        enqueueSnackbar("All data have been saved", { variant: "success" })
      )
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          swal("Error occured when saving data");
          setErrors(error.response.data);
        }
      })
      .finally(() => setBtnLoaders({ ...btnLoaders, saveAll: false }));
  };

  const SortableItem = SortableElement(({ value }) => (
    <VariantDrag optionsWithValues={optionsWithValues} productVariant={value} />
  ));

  const SortableList = React.memo(
    SortableContainer(({ items }) => {
      return (
        <ul style={{ padding: "0" }}>
          {items.map((productVariant, index) => (
            <SortableItem
              index={index}
              key={productVariant.id}
              value={productVariant}
            />
          ))}
        </ul>
      );
    })
  );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setProductVariants(arrayMove(newVariantsData, oldIndex, newIndex));
  };

  const enableDragandDrop = () => {
    setProductVariants(newVariantsData);
    setEnableDrag(!enableDrag);
  };

  return (
    <div className={classes.root}>
      {errors.length > 0 && (
        <Box m={2}>
          {errors.map((error) => (
            <Error key={error.id} message={error.message} />
          ))}
        </Box>
      )}
      <Box mb={4}>
        <DefaultVariant productVariants={productVariants} />
      </Box>
      <Paper className={classes.paper}>
        <Typography
          variant="h6"
          style={{ paddingLeft: "6px", marginBottom: "14px" }}
        >
          Product variations ({productVariants.length} /{posibleVariantCount})
        </Typography>
        <FormControlLabel
          style={{ paddingLeft: "10px" }}
          control={
            <Switch
              checked={enableDrag}
              onChange={enableDragandDrop}
              color="primary"
              name="draganddroptoggler"
              size="small"
            />
          }
          label={
            <Typography variant="body2">
              {!enableDrag
                ? "Enable drag and drop to arrange variants order."
                : "Disable drag and drop."}
            </Typography>
          }
        />

        <Box mt={1}>
          {!enableDrag ? (
            <Alert severity="warning" style={{ marginTop: "10px" }}>
              <Typography variant="body2" color="secondary">
                Do not delete or remove multiple variants at once, please wait
                until the request variant to completely be deleted.
              </Typography>
            </Alert>
          ) : (
            <>
              <Typography variant="caption" gutterBottom>
                (Long click on the product variant <b> ID </b> to drag and
                drop.)
              </Typography>
              <Alert severity="warning" style={{ marginTop: "10px" }}>
                <Typography variant="body2" color="secondary">
                  Product variant editting has been disabled to improve
                  performance when using drag and grop to arrane variants.
                </Typography>
              </Alert>
            </>
          )}
        </Box>

        <Box mt={1}>
          {enableDrag ? (
            <SortableList
              items={productVariants}
              onSortEnd={onSortEnd}
              useWindowAsScrollContainer
            />
          ) : (
            productVariants.map((productVariant) => (
              <Variant
                key={productVariant.id}
                optionsWithValues={optionsWithValues}
                productVariant={productVariant}
                deleteChange={deleteChange}
                dataChangeHandler={dataChangeHandler}
                setErrors={setErrors}
              />
            ))
          )}

          <Box mt={2}>
            <Grid item xs={3}>
              <ButtonProgress
                variant="contained"
                color="primary"
                loading={btnLoaders.saveAll}
                handleButtonClick={saveAllVariants}
                name="Save All variants"
                size="small"
                fullWidth
              />
            </Grid>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default React.memo(VariantsContainer);
