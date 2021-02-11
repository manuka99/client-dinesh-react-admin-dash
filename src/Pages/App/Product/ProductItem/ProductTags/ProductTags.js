import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  Link,
  CardMedia,
  Grid,
  Chip,
  TextField,
} from "@material-ui/core";
import api from "../../../../../util/api";
import { ProductContext } from "../ProductItem";
import useStateCallback from "../../../../../components/customHooks/useStateCallback";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";

const styles = makeStyles((theme) => ({
  flexDiv: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  flexRow: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    flexWrap: "wrap",
  },
}));

function ProductTags() {
  const productContext = useContext(ProductContext);
  const [btnAddNewLoading, setBtnAddNewLoading] = useState(false);
  const [newTag, setNewTag] = useState({});
  const [productTags, setProductTags] = useStateCallback([]);
  const classes = styles();

  useEffect(() => {
    fetchProductTags();
  }, []);

  const fetchProductTags = () => {
    productContext.mainLoader(true);
    api()
      .get(`/products/${productContext.product_id}`)
      .then((res) => {
        setProductTags([...res.data.productTags]);
      })
      .catch((errors) => console.log(errors))
      .finally(() => productContext.mainLoader(false));
  };

  const clearTag = (tagId) => {
    productContext.mainLoader(true);
    api()
      .post(`/tags/destroy/${tagId}`)
      .then((res) => fetchProductTags())
      .catch((errors) => console.log(errors))
      .finally(() => productContext.mainLoader(false));
  };

  const clearAllTags = () => {
    api()
      .post(`/tags/destroy-all/${productContext.product_id}`)
      .then((res) => fetchProductTags())
      .catch((errors) => console.log(errors))
      .finally(() => productContext.mainLoader(false));
  };

  const addNewTag = (e) => {
    e.preventDefault();
    setBtnAddNewLoading(true);
    api()
      .post(`/tags/add/${productContext.product_id}`, newTag)
      .then((res) => {
        setNewTag({ name: "" });
        setProductTags(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setBtnAddNewLoading(false));
  };

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              Product tags
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardActionArea>
          <Box pt={1} pl={2} pr={2}>
            <Typography variant="body2" gutterBottom>
              Product tags are descriptive tags put on products to help organize
              and track them throughout a warehouse, store, or shipment. Product
              tags may include the name of the product, a barcode for tracking,
              product information, and sometimes the SKU number.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Not to be confused with product tags used for organizing
              inventory, ‘product tagging’ is also a term used to organize
              products on your online store. To optimize SEO, you organize
              products in your store using the product tag in the URL. This
              helps search engine identify what type of product you’re selling,
              so buyers searching product terms can easily find it on your
              store.
            </Typography>
          </Box>
        </CardActionArea>
        <CardContent className={classes.flexRow}>
          <form onSubmit={addNewTag} className={classes.flexDiv}>
            <TextField
              label="Tag"
              variant="outlined"
              size="small"
              name="name"
              type="text"
              onChange={(e) => setNewTag({ name: e.target.value })}
              value={newTag.name}
              required
            />
            <ButtonProgress
              loading={btnAddNewLoading}
              name="Add tags"
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            />
          </form>
          <Typography variant="subtitle2" gutterBottom>
            Seperate multiple tags using commas.
          </Typography>
          {productTags.length > 0 && (
            <div className={classes.flexDiv}>
              {productTags.map((tag) => (
                <Chip
                  key={tag.id}
                  size="small"
                  label={tag.name}
                  onDelete={() => clearTag(tag.id)}
                  // color="primary"
                />
              ))}
            </div>
          )}
          <div>
            <Link onClick={clearAllTags} color="secondary">
              Clear all tags
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductTags;
