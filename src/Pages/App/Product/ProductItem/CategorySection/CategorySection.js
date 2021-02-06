import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  IconButton,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import GamesIcon from "@material-ui/icons/Games";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../util/api";

const styles = makeStyles((theme) => ({
  icon: {
    fontSize: "14px",
  },
  boldFont: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  flexDiv: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  flexRowDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },
  flexRowDiv2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
    flexWrap: "wrap",
  },
  btnSmall: {
    padding: "0",
    textTransform: "capitalize",
    fontSize: "12px",
  },
  otherGrid: {
    backgroundColor: theme.palette.neutral.brown,
  },
  categories_div: {
    overflow: "auto",
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
}));

function CategorySection({
  status,
  visibility,
  published_on,
  is_featured,
  handleProductData,
  updateBtnLoader,
  updateData,
}) {
  const classes = styles();
  const [categories, setCategories] = useState([]);

  const [editMode, setEditMode] = useState({
    status: false,
    visibility: false,
  });
  const [newValues, setNewValues] = useState({});

  const toggleEditMode = (name) => {
    setEditMode({ ...editMode, [name]: !editMode[name] });
    setNewValues({ ...newValues, [name]: "" });
  };

  const handleSelect = (e) => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value });
  };

  const handleOkButton = (name) => {
    if (newValues[name]) {
      handleProductData(name, newValues[name]);
    }
    setEditMode({ ...editMode, [name]: !editMode[name] });
  };

  const copyToNewDraft = (e) => {
    e.preventDefault();
  };

  const moveToTrash = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    api()
      .get("/categories")
      .then((res) => setCategories({ ...res.data }))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              Product categories
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent className={classes.flexRowDiv}>
          <Grid container spacing={4}>
            <Grid item xs={6} md={12}>
              <Typography variant="subtitle2">
                <bold>All categories</bold>
              </Typography>
              <div className={classes.categories_div}></div>
            </Grid>
            <Grid item xs={6} md={12}>
              <div className={`${classes.newCategory} ${classes.flexRowDiv}`}>
                <TextField
                  label="Category name"
                  name="name"
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ width: "100%" }}
                />
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel id="parent_category">Parent category</InputLabel>
                  <Select id="parent_category" label="Parent category">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem style={{ marginLeft: "10px" }} value={20}>
                      Twenty
                    </MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <Box mt={2}>
                    <ButtonProgress
                      name="create category"
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                    />
                  </Box>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CategorySection;
