import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import Selection from "./Selection";

const useStyles = makeStyles((theme) => ({}));

function Variations() {
  const [productVariants, setProductVariants] = useState([]);
  const [buttonLoading, setButtonLoading] = useState({
    variants: false,
  });
  const productContext = useContext(ProductContext);
  const classes = useStyles();

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = () => {
    setButtonLoading({ ...buttonLoading, variants: true });
    api()
      .get(`/product/variants/${productContext.product_id}`)
      .then((res) => {
        setProductVariants(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setButtonLoading({ ...buttonLoading, variants: false }));
  };

  return (
    <div>
      <Selection fetchVariants={fetchVariants} />
      {buttonLoading.variants && (
        <Box mt={4} mb={2}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}

export default Variations;
