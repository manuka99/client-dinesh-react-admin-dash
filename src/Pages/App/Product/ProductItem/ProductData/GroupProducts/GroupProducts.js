import React, { useState, useContext, useEffect } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import swal from "sweetalert";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import NewOption from "./NewOption";
import Option from "./Option";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: theme.spacing(1),
  },
}));

function GroupProducts() {
  const [options, setOptions] = useState([]);
  const productContext = useContext(ProductContext);
  const classes = useStyles();

  useEffect(() => {
    fetchOptions();
    //eslint-disable-next-line
  }, []);

  const fetchOptions = () => {
    productContext.mainLoader(true);
    api()
      .get(`/options/${productContext.product_id}`)
      .then((res) => setOptions(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 422)
          swal(error.response.data.message);
      })
      .finally(() => productContext.mainLoader(false));
  };

  return (
    <div>
      <NewOption fetchOptions={fetchOptions} />
      {options.length > 0 && (
        <Paper className={classes.root}>
          {options.map((option) => (
            <>
              <Option
                key={option.id}
                option={option}
                fetchOptions={fetchOptions}
              />
            </>
          ))}
        </Paper>
      )}
    </div>
  );
}

export default GroupProducts;
