import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import NewStore from "./NewStore";

function Stores() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">Shipping Stores</Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              Ecommerce shipping encompasses all services required to transport
              products purchased online from a retailer to the customer’s
              delivery destination. With the right partner, ecommerce shipping
              can be manageable, affordable, and fast.
            </Typography>
            <Typography variant="body2" gutterBottom>
              There’s no such thing as a one-size-fits-all ecommerce shipping
              strategy. The right ecommerce shipping strategy for your business
              will depend on your audience, budget, margins, product, and a
              variety of other factors. As a rule of thumb, offering a
              combination of fast and affordable shipping methods can help
              reduce shopping cart abandonment and increase conversions. Here
              are six shipping methods to consider making part of your ecommerce
              shipping strategy.
            </Typography>
            <Typography variant="body2">
              73% of shoppers expect affordable, fast deliveries whenever they
              shop online — but you need to make sure you’re offering shipping
              rates that are affordable for you, too. Ecommerce shipping and
              logistics costs can seem complex, so let the resources below be
              your guide on everything you need to know about ecommerce shipping
              solutions.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box mt={4} mb={2}>
        <Button
          variant="text"
          size="small"
          color="primary"
          startIcon={
            showForm ? (
              <IndeterminateCheckBoxIcon size="small" />
            ) : (
              <AddBoxIcon size="small" />
            )
          }
          onClick={() => setShowForm(!showForm)}
        >
          New store
        </Button>
      </Box>
      <Grid container spacing={2}>
        {showForm && (
          <Grid item xs={12} md={6} lg={4}>
            <NewStore />
          </Grid>
        )}
        <Grid item xs={12} md={6} lg={8}></Grid>
      </Grid>
    </div>
  );
}

export default Stores;
