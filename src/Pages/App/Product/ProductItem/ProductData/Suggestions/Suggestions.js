import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  Link,
  Chip,
  TextField,
  Avatar,
} from "@material-ui/core";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import useStateCallback from "../../../../../../components/customHooks/useStateCallback";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import { useNavigate } from "react-router";

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

function Suggestions() {
  const productContext = useContext(ProductContext);
  const [btnAddNewLoading, setBtnAddNewLoading] = useState(false);
  const [newSuggesstedProduct, setNewSuggesstedProduct] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useStateCallback([]);
  const classes = styles();
  const navigate = useNavigate();

  useEffect(() => {
    fetchsuggestedProducts();
    // eslint-disable-next-line
  }, []);

  const fetchsuggestedProducts = () => {
    productContext.mainLoader(true);
    api()
      .get(`/products/suggested/${productContext.product_id}`)
      .then((res) => {
        setSuggestedProducts([...res.data]);
      })
      .catch((errors) => console.log(errors))
      .finally(() => productContext.mainLoader(false));
  };

  const clearSProduct = (SProductId) => {
    productContext.mainLoader(true);
    api()
      .post(`/products/suggested/destroy/${productContext.product_id}`, {
        pid: SProductId,
      })
      .then((res) => fetchsuggestedProducts())
      .catch((errors) => console.log(errors))
      .finally(() => productContext.mainLoader(false));
  };

  const clearAllSProducts = () => {
    api()
      .post(`/products/suggested/destroy-all/${productContext.product_id}`)
      .then((res) => fetchsuggestedProducts())
      .catch((errors) => console.log(errors))
      .finally(() => productContext.mainLoader(false));
  };

  const addNewSuggesstedProduct = (e) => {
    e.preventDefault();
    setBtnAddNewLoading(true);
    api()
      .post(
        `/products/suggested/${productContext.product_id}`,
        newSuggesstedProduct
      )
      .then((res) => {
        setNewSuggesstedProduct({ pid: "" });
        setSuggestedProducts(res.data);
      })
      .catch((e) => {
        console.log(e);
        fetchsuggestedProducts();
      })
      .finally(() => setBtnAddNewLoading(false));
  };

  return (
    <div style={{ width: "100%" }}>
      <CardActionArea>
        <Box pt={1} pl={2}>
          <Typography gutterBottom variant="h6">
            Product suggestions
          </Typography>
        </Box>
        <Divider />
      </CardActionArea>
      <CardActionArea>
        <Box pt={1} pl={2} pr={2}>
          <Typography variant="body2" gutterBottom>
            A timely product recommendation can lead shoppers to choose one
            product over another. Look to your own experience for proof.
          </Typography>
          <Typography variant="body2">
            As an ecommerce manager, though, you don’t have to wait for someone
            else to recommend a product to your customers. You can make product
            recommendations while the prospect is in the process of shopping on
            your website. Personalized product recommendations can work to
            improve the user experience as well as conversion rate of your site.
          </Typography>
          <Typography variant="body2" gutterBottom>
            <li>Show highest rated items in product recommendations</li>
            <li>Show “Related to items you’ve viewed” suggestions</li>
            <li>Feature best-selling items for each brand</li>
            <li>Make sure all recommendations are relevant and timely</li>
          </Typography>
        </Box>
      </CardActionArea>
      <CardContent className={classes.flexRow}>
        <form onSubmit={addNewSuggesstedProduct} className={classes.flexDiv}>
          <TextField
            label="Product"
            variant="outlined"
            size="small"
            name="pid"
            type="text"
            onChange={(e) => setNewSuggesstedProduct({ pid: e.target.value })}
            value={newSuggesstedProduct.pid}
            required
          />
          <ButtonProgress
            loading={btnAddNewLoading}
            name="Add Products"
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          />
        </form>
        <Typography variant="subtitle2" gutterBottom>
          Seperate multiple products using commas.
        </Typography>
        {suggestedProducts.length > 0 && (
          <div className={classes.flexDiv}>
            {suggestedProducts.map((SProduct) => (
              <Chip
                style={{ width: "auto", height: "40px", cursor: "pointer" }}
                avatar={
                  <Avatar
                    onClick={() =>
                      navigate(`/app/products/edit/${SProduct.id}`)
                    }
                    style={{ width: "32px", height: "32px" }}
                    alt={SProduct.product_name}
                    src={SProduct.image}
                  />
                }
                key={SProduct.id}
                size="small"
                label={SProduct.product_name}
                onDelete={() => clearSProduct(SProduct.id)}
                // color="primary"
              />
            ))}
          </div>
        )}
        <div>
          <Link onClick={clearAllSProducts} color="secondary">
            Clear all suggested products
          </Link>
        </div>
      </CardContent>
    </div>
  );
}

export default Suggestions;
