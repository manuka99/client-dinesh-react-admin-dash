import React, { useState, useEffect, useContext } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import AttributeForm from "./AttributeForm";
import Option from "./Option";
import api from "../../../../../../util/api";
import swal from "sweetalert";
import { ProductContext } from "../../ProductItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: theme.spacing(1),
  },
}));

function Attributes() {
  const [newAttribute, setNewAttribute] = useState(false);
  const [options, setOptions] = useState([]);
  const classes = useStyles();
  const productContext = useContext(ProductContext);

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
      <Button
        variant="text"
        size="small"
        color="primary"
        startIcon={
          newAttribute ? (
            <IndeterminateCheckBoxIcon size="small" />
          ) : (
            <AddBoxIcon size="small" />
          )
        }
        onClick={() => setNewAttribute(!newAttribute)}
      >
        New attribute
      </Button>
      {newAttribute && (
        <Box mt={1}>
          <AttributeForm fetchOptions={fetchOptions} />
        </Box>
      )}
      {options.length > 0 && (
        <Box mt={2}>
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
        </Box>
      )}
    </div>
  );
}

export default Attributes;
