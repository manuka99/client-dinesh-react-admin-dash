import React from "react";
import { Box, Link, Typography } from "@material-ui/core";

function Info({ type }) {
  if (type === "simple") {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Simple Product
        </Typography>
        <Typography variant="body2" gutterBottom>
          A simple product is the most common and easily-understandable product
          type. A simple product is a unique, stand-alone, physical product that
          you may have to ship to the customer.
        </Typography>
        <Box mt={2} mb={2}>
          <Typography variant="body2" gutterBottom>
            To start with, you can create a simple product, assign a price & SKU
            for the product, and start selling them. eg: Books. Simple product
            in WooCommerce is one of the easiest to configure. You can add
            price, SKU and stock details, and publish a simple product. While
            creating a new product, you can select ‘Simple product’ from the
            drop-down.
          </Typography>
        </Box>
        <Typography variant="body2">
          To understand the process of setting up a Simple Product in detail,
          refer to our article <Link>How to Add a Simple Product.</Link>
        </Typography>
      </div>
    );
  } else if (type === "bundle") {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Bundle Product
        </Typography>
        <Typography variant="body2" gutterBottom>
          A bundle product is a cluster of simple products clubbed together to
          form a single entity. The bundle product won’t have a price or other
          features. The identity of the bundle product is created by a number of
          child products that have unique features of their own. As soon as you
          create a bundle product, you can add at least one child product to the
          bundle product. Your customers can purchase any of the child products
          from the bundle product individually as well. eg: A set of six
          glasses.
        </Typography>
        <Box mt={2} mb={2}>
          <Typography variant="body2" gutterBottom>
            You can select the option ‘Bundle product’ from the drop-down menu
            and specify the products you are linking together. There is no need
            to set a price for the Bundle product as it will be dependent on the
            child products.
          </Typography>
        </Box>
        <Typography variant="body2">
          To understand the process of setting up a Bundle Product in detail,
          refer to our article <Link>How to Add a Bundle Product.</Link>
        </Typography>
      </div>
    );
  } else {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Variable Product
        </Typography>
        <Typography variant="body2" gutterBottom>
          This product type lets you add variations to the same product to
          create a complex, variable product. Each variation of the product has
          its own price, SKU, available stock, etc. eg: A shirt or t-shirt with
          different sizes and different colors.
        </Typography>
        <Box mt={2} mb={2}>
          <Typography variant="body2" gutterBottom>
            While creating the product, you can select the ‘Variable product’
            option from the drop-down. To be able to create different
            variations, you will have to set up attributes and define values to
            each of them. You can use different attributes and values to create
            variations. After that, you can manually create available variations
            or create all possible variations in one go. You can update
            individual details for each variation, after all required variations
            are created.
          </Typography>
        </Box>
        <Typography variant="body2">
          To understand the process of setting up a Variable Product in detail,
          refer to our article <Link>How to Add a Variable Product.</Link>
        </Typography>
      </div>
    );
  }
}

export default Info;
