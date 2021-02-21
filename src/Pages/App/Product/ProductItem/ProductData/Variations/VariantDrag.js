import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { sortableHandle } from "react-sortable-hoc";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexDiv: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
}));

function VariantDrag({ optionsWithValues, productVariant }) {
  const classes = useStyles();

  // to render option id
  const getSelectedOptionValue = useCallback((option_id) => {
    const product_varient_value = productVariant.product_varient_values.find(
      (product_varient_value) => {
        return product_varient_value.option_id === option_id;
      }
    );
    return product_varient_value ? product_varient_value.id : "";
    //eslint-disable-next-line
  }, []);

  const DragHandle = sortableHandle(() => (
    <Typography
      variant="subtitle2"
      style={{
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: "0.7rem",
        fontWeight: "bold",
      }}
    >
      #{productVariant.id}
    </Typography>
  ));

  return (
    <Box mb={1}>
      <Card
        className={classes.flexDiv}
        style={{ marginRight: "10px", padding: "10px", cursor: "all-scroll" }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <DragHandle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.flexDiv}>
              {/* eslint-disable-next-line */}
              {optionsWithValues.map((option) => {
                if (option.option_values.length > 0)
                  return (
                    <FormControl
                      key={option.id}
                      size="small"
                      variant="outlined"
                      style={{
                        flexBasis: "30%",
                        margin: "1%",
                        cursor: "not-allowed",
                      }}
                    >
                      <InputLabel id={option.id}>{option.name}</InputLabel>
                      <Select
                        labelId={option.id}
                        id={option.id}
                        name={option.id}
                        label={option.name}
                        disabled={true}
                        value={getSelectedOptionValue(option.id)}
                        style={{
                          width: "100%",
                          fontSize: "0.85rem",
                          textTransform: "none",
                          padding: "0",
                        }}
                      >
                        <MenuItem value="">None</MenuItem>
                        {option.option_values.map((option_value) => {
                          return (
                            <MenuItem
                              key={option_value.id}
                              value={parseInt(option_value.id)}
                            >
                              {option_value.value_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  );
              })}
            </div>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default React.memo(VariantDrag);
