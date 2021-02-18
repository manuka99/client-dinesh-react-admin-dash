import React, { useState, useContext, useEffect } from "react";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import ExtraForm from "./ExtraForm";
import { Button, makeStyles, Paper } from "@material-ui/core";
import ExtrasOption from "./ExtrasOption";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.neutral.brown,
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

function ProductExtras() {
  const [options, setOptions] = useState([]);
  const [addNewOption, setaddNewOption] = useState(false);
  const productContext = useContext(ProductContext);
  const classes = useStyles();

  useEffect(() => {
    fetchProductExtras();
    //eslint-disable-next-line
  }, []);

  const fetchProductExtras = () => {
    productContext.mainLoader(true);
    api()
      .get(`/extras/variant/${productContext.product_id}`)
      .then((res) => setOptions(res.data))
      .catch((e) => console.log(e))
      .finally(() => productContext.mainLoader(false));
  };
  return (
    <div>
      <Button
        variant="text"
        size="small"
        color="primary"
        startIcon={
          addNewOption ? (
            <IndeterminateCheckBoxIcon size="small" />
          ) : (
            <AddBoxIcon size="small" />
          )
        }
        onClick={() => setaddNewOption(!addNewOption)}
      >
        Edit add-ons
      </Button>
      {addNewOption && <ExtraForm fetchProductExtras={fetchProductExtras} />}
      {options.length > 0 && (
        <Paper className={classes.root}>
          {options.map((option) => (
            <ExtrasOption
              key={option.id}
              option={option}
              fetchProductExtras={fetchProductExtras}
            />
          ))}
        </Paper>
      )}
    </div>
  );
}

export default ProductExtras;
