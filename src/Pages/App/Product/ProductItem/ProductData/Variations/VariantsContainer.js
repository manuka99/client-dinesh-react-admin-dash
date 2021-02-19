import React, { useState, useContext } from "react";
import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
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
  const [errors, setErrors] = useState([]);
  const classes = useStyles();

  var newVariantsData = productVariants;

  // remove the deleted index from the list
  const deleteChange = (id) => {
    console.log(`deleted ${id}`);
    var deletedVariantIndex = newVariantsData.findIndex((productVariant) => {
      return productVariant.id === id;
    });
    console.log(`deletedVariantIndex ${deletedVariantIndex}`);
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
    <Variant
      key={value.id}
      optionsWithValues={optionsWithValues}
      productVariant={value}
      deleteChange={deleteChange}
      dataChangeHandler={dataChangeHandler}
      setErrors={setErrors}
    />
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
    console.log(oldIndex);
    console.log(newIndex);
    setProductVariants(arrayMove(newVariantsData, oldIndex, newIndex));
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
      <Paper className={classes.paper}>
        <Typography variant="h6">
          Product variations ({productVariants.length} /{posibleVariantCount})
        </Typography>
        <Typography variant="caption">
          (Long click on the product variant <b> ID </b> to drag and drop.)
        </Typography>
        <Box mt={1}>
          <SortableList
            items={productVariants}
            onSortEnd={onSortEnd}
            useDragHandle
            pressDelay={200}
          />
          {/* {productVariants.map((productVariant) => (
            <Variant
              key={productVariant.id}
              optionsWithValues={optionsWithValues}
              productVariant={productVariant}
              deleteChange={deleteChange}
              dataChangeHandler={dataChangeHandler}
              setErrors={setErrors}
            />
          ))} */}
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

export default React.memo(VariantsContainer, (prevProps, nextProps) => false);
