import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Divider,
  Box,
} from "@material-ui/core";
import api from "../../../../util/api";
import { PanelContext } from "../../../Panel/PanelContainer";
import AllProductsTable from "./AllProductsTable";

function AllProductsMain() {
  const [products, setProducts] = useState([]);
  const [trashedProducts, setTrashedProducts] = useState([]);
  const panelContext = useContext(PanelContext);

  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, []);

  const fetchProducts = () => {
    panelContext.setLoading(true);
    api()
      .get("/products")
      .then((res) => {
        setProducts([...res.data.products]);
        setTrashedProducts([...res.data.trashProducts]);
      })
      .catch((error) => console.log(error))
      .finally(() => panelContext.setLoading(false));
  };

  return (
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">Product management</Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              With attributes and categories set up and stock management
              configured, we can begin adding products. When adding a product,
              the first thing to decide is what type of product it is. Simple –
              covers the vast majority of any products you may sell. Simple
              products are shipped and have no options. For example, a book.
              Grouped – a collection of related products that can be purchased
              individually and only consist of simple products. For example, a
              set of six drinking glasses.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Variable – a product with variations, each of which may have a
              different SKU, price, stock option, etc. For example, a t-shirt
              available in different colors and/or sizes.
            </Typography>
            <Typography variant="body2">
              The inventory section allows you to manage stock for the product
              individually and define whether to allow back orders and more. It
              enables you to sell products and allow customers to add them to
              the cart to buy. Enable Stock Management must be selected in
              Products Inventory Settings; otherwise, only the ‘Stock status’
              option is visible in the Product Data Inventory box. Options when
              stock management at product level is disabled. You are responsible
              for updating the Stock Status.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {products.length > 0 && (
        <Box mt={4}>
          <Card>
            <CardContent>
              <AllProductsTable rows={products} fetchProducts={fetchProducts} />
            </CardContent>
          </Card>
        </Box>
      )}
      {trashedProducts.length > 0 && (
        <Box mt={4}>
          <Card>
            <CardContent>
              <AllProductsTable
                trash="trash"
                rows={trashedProducts}
                fetchProducts={fetchProducts}
              />
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default AllProductsMain;
