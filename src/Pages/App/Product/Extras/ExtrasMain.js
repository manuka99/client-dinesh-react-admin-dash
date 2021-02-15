import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import NewExtra from "./NewExtra/NewExtra";
import ExtrasOptions from "./ExtraOptions/ExtrasOptions";
import api from "../../../../util/api";

function ExtrasMain() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = () => {
    api()
      .get("/extras/index")
      .then((res) => setOptions(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardActionArea>
            <Box p={2}>
              <Typography variant="h6">Product extras</Typography>
            </Box>
          </CardActionArea>
          <Divider />
          <CardActionArea>
            <Box p={2}>
              <Typography variant="body2" gutterBottom>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>

              <Typography
                variant="body2"
                style={{ marginTop: "14px" }}
                gutterBottom
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <NewExtra fetchOptions={fetchOptions} />
      </Grid>
      {options.length > 0 && (
        <Grid item xs={12}>
          <ExtrasOptions options={options} fetchOptions={fetchOptions} />
        </Grid>
      )}
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default ExtrasMain;
