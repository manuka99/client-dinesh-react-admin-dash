import React, { useState, useEffect, useContext } from "react";
import { Box, LinearProgress } from "@material-ui/core";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import Selection from "./Selection";
import VariantsContainer from "./VariantsContainer";

function Variations() {
  const [productVariants, setProductVariants] = useState([]);
  const [optionsWithValues, setOptionsWithValues] = useState([]);
  const [posibleVariantCount, setPosibleVariantCount] = useState(0);
  const [buttonLoading, setButtonLoading] = useState({
    variants: false,
  });
  const productContext = useContext(ProductContext);

  useEffect(() => {
    fetchVariants();
    fetchOptionsAndValues();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (optionsWithValues.length > 0) {
      var count = 1;
      optionsWithValues.map((option) => {
        return (
          option.option_values.length > 0 &&
          (count *= option.option_values.length)
        );
      });
      setPosibleVariantCount(count);
    } else setPosibleVariantCount(0);
  }, [optionsWithValues]);

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

  const fetchOptionsAndValues = () => {
    setButtonLoading({ ...buttonLoading, variants: true });
    api()
      .get(`/options/${productContext.product_id}`)
      .then((res) => {
        setOptionsWithValues(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setButtonLoading({ ...buttonLoading, variants: false }));
  };

  return (
    <div>
      <Selection
        fetchVariants={fetchVariants}
        productVariants={productVariants}
        setProductVariants={setProductVariants}
        posibleVariantCount={posibleVariantCount}
      />
      {buttonLoading.variants ? (
        <Box mt={4} mb={2}>
          <LinearProgress />
        </Box>
      ) : (
        setProductVariants.length > 0 && (
          <VariantsContainer
            optionsWithValues={optionsWithValues}
            productVariants={productVariants}
            setProductVariants={setProductVariants}
            posibleVariantCount={posibleVariantCount}
          />
        )
      )}
    </div>
  );
}

export default Variations;
