import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingModel from "../../../../components/Modals/LoadingModel";
import api from "../../../../util/api";
import TextField from "@material-ui/core/TextField";
import PermalinkEdit from "./PermalinkEdit/PermalinkEdit";
import EditorSection from "./EditorSection/EditorSection";
import {
  Box,
  Card,
  Grid,
  Paper,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PublishMain from "./PublishSection/PublishMain";
import CategorySection from "./CategorySection/CategorySection";

const styles = makeStyles((theme) => ({
  displayTable: {
    display: "table",
  },
  inlineFlex: {
    display: "inline-flex",
  },
}));

const initialProductData = {
  id: "",
  url_name: "",
  category_id: "",
  product_name: "",
  default_variation: "",
  image: "",
  description: "",
  short_description: "",
  type: "",
  status: "",
  visibility: "",
  published_on: "",
  is_featured: "",
  is_trashed: "",
};

function ProductItem() {
  const { product_id } = useParams();
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const [updateBtnLoader, setUpdateBtnLoader] = useState(false);
  const [productData, setProductData] = useState({
    ...initialProductData,
    url_name: product_id,
  });

  // get the product id and details
  useEffect(() => {
    if (product_id) {
      setLoading(true);
      api()
        .get(`/products/${product_id}`)
        .then((res) => {
          setProductData({ ...res.data.productData });
        })
        .catch((errors) => console.log(errors))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [product_id]);

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  const handleEventProductData = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleProductData = (name, value) => {
    setProductData({ ...productData, [name]: value });
  };

  //validate permalink name
  useEffect(() => {
    !productData.url_name &&
      setProductData({ ...productData, url_name: product_id });
  }, [productData.url_name]);

  // update data
  const updateData = () => {
    setUpdateBtnLoader(true);
    api()
      .post(`/products/${product_id}`, productData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
      .finally(() => {
        setUpdateBtnLoader(false);
      });
  };

  return (
    <div>
      <LoadingModel status={loading} />
      {productData.id && (
        <React.Fragment>
          <Box mb={3}>
            <Card>
              <CardActionArea>
                <Box pt={2} pl={2}>
                  <Typography variant="h5" gutterBottom>
                    Edit product
                  </Typography>
                </Box>
                <Divider />
              </CardActionArea>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={9}>
              <Paper>
                <TextField
                  fullWidth
                  label="Product name"
                  variant="outlined"
                  name="product_name"
                  value={productData.product_name}
                  onChange={handleEventProductData}
                />
              </Paper>
              <PermalinkEdit
                style={{ marginTop: "14px" }}
                url_name={productData.url_name}
                handleEventProductData={handleEventProductData}
              />
              <Box mt={4}>
                <EditorSection
                  heading="Main Description"
                  name="description"
                  dataValue={productData.description}
                  handleProductData={handleProductData}
                />
              </Box>
              <Box mt={4}>
                <EditorSection
                  heading="Short Description"
                  name="short_description"
                  dataValue={productData.short_description}
                  handleProductData={handleProductData}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <PublishMain
                status={productData.status}
                visibility={productData.visibility}
                published_on={productData.published_on}
                is_featured={productData.is_featured}
                handleProductData={handleProductData}
                updateData={updateData}
                updateBtnLoader={updateBtnLoader}
              />
              <Box mt={4}>
                <CategorySection />
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
}

export default React.memo(ProductItem);
