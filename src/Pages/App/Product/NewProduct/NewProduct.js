import { Box, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import api from "../../../../util/api";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createNewProduct = () => {
    setLoading(true);
    api()
      .post("/products/create")
      .then((res) => {
        var id = res.data;
        navigate(`/app/products/edit/${id}`);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Paper elevation={2}>
        <Box p={2} mb={4}>
          <Typography variant="h5" gutterBottom>
            Add new product
          </Typography>
          <Typography variant="body2" gutterBottom>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Box mt={2}>
            <ButtonProgress
              size="small"
              variant="contained"
              color="primary"
              name="Create new product"
              handleButtonClick={createNewProduct}
              loading={loading}
            />
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default NewProduct;
