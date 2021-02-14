import React, { useState, useEffect, useContext } from "react";
import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
// import useStateCallback from "../../../../../../components/customHooks/useStateCallback";

const useStyles = makeStyles((theme) => ({
  categories_div: {
    overflow: "auto",
    width: "100%",
    maxHeight: "220px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingTop: "10px",
  },
}));

function ProductCategories({ categories }) {
  const [productCategoriesIds, setProductCategoriesIds] = useState([]);
  const useProductContext = useContext(ProductContext);
  const classes = useStyles();
  useEffect(() => {
    useProductContext.mainLoader(true);
    api()
      .get(`/products/${useProductContext.product_id}`)
      .then((res) => {
        setProductCategoriesIds([...res.data.productCategoriesIds]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        useProductContext.mainLoader(false);
      });
    // eslint-disable-next-line
  }, [categories]);

  const handleProductCategory = (e) => {
    var newIds = productCategoriesIds;
    if (e.target.checked) {
      newIds.push(parseInt(e.target.value));
    } else {
      var index = newIds.indexOf(parseInt(e.target.value));
      if (index !== -1) newIds.splice(index, 1);
    }
    updateProductCategories(newIds);
  };

  const updateProductCategories = (newIds) => {
    useProductContext.mainLoader(true);
    api()
      .post(`/products/add-category/${useProductContext.product_id}`, newIds)
      .then((res) => {
        setProductCategoriesIds([...newIds]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        useProductContext.mainLoader(false);
      });
  };

  const CategoryItem = (category, spacing) => {
    return [
      <FormControlLabel
        key={category.id}
        control={
          <Checkbox
            checked={productCategoriesIds.includes(category.id)}
            onChange={handleProductCategory}
            style={{ paddingLeft: `${spacing}px` }}
            value={category.id}
            name="id"
            size="small"
            color="primary"
          />
        }
        label={<Typography variant="body2">{category.name}</Typography>}
      />,
      category.children &&
        category.children.map((x) => CategoryItem(x, spacing + 14)),
    ];
  };

  return (
    <div>
      <Typography variant="subtitle2">All categories</Typography>

      <div className={classes.categories_div}>
        {categories.map((category) => CategoryItem(category, 16))}
      </div>
    </div>
  );
}

export default ProductCategories;
