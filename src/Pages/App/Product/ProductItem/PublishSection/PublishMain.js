import React, { useState } from "react";
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
} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import GamesIcon from "@material-ui/icons/Games";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";

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
}));

function PublishMain({
  status,
  visibility,
  published_on,
  is_featured,
  handleProductData,
  updateBtnLoader,
  updateData,
}) {
  const classes = styles();

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

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              Publish
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent className={classes.flexRowDiv}>
          {/* status */}
          <div className={classes.flexDiv}>
            <GamesIcon className={classes.icon} />
            Status:
            <span className={classes.boldFont}>{status}</span>
            {!editMode.status && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("status")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.status && (
            <div className={classes.flexDiv}>
              <NativeSelect
                defaultValue={status}
                onChange={handleSelect}
                name="status"
                style={{ minWidth: "120px" }}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </NativeSelect>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("status")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("status")}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* visibility */}
          <div className={classes.flexDiv}>
            <VisibilityIcon className={classes.icon} />
            Visibility:
            <span className={classes.boldFont}>
              {visibility.replace("_", " ")}
            </span>
            {!editMode.visibility && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("visibility")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.visibility && (
            <div className={classes.flexDiv}>
              <NativeSelect
                defaultValue={visibility}
                onChange={handleSelect}
                name="visibility"
                style={{ minWidth: "120px" }}
              >
                <option value="public">Public</option>
                <option value="hidden">Hidden</option>
                <option value="search_only">Search only</option>
                <option value="grouped_product">Grouped product only</option>
              </NativeSelect>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("visibility")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("visibility")}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* published on */}
          <div className={classes.flexDiv}>
            <PublishIcon className={classes.icon} />
            Published on:
            <span className={classes.boldFont}>{published_on}</span>
            {!editMode.published_on && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("published_on")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.published_on && (
            <div className={classes.flexDiv}>
              <TextField
                type="datetime-local"
                defaultValue={published_on.replace(" ", "T")}
                onChange={(e) =>
                  setNewValues({
                    ...newValues,
                    published_on: e.target.value.replace("T", " "),
                  })
                }
              />
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("published_on")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("published_on")}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* is featured */}
          <FormControlLabel
            control={
              <Checkbox
                checked={is_featured}
                onChange={(e) =>
                  handleProductData("is_featured", e.target.checked)
                }
                color="primary"
              />
            }
            label="This is a featured product"
          />
        </CardContent>
        <CardContent className={classes.otherGrid}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <div className={classes.flexRowDiv2}>
                <Link href="#" onClick={copyToNewDraft}>
                  Copy to a new draft
                </Link>
                <Link href="#" color="secondary" onClick={moveToTrash}>
                  Move to trash
                </Link>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.flexRowDiv2}>
                <ButtonProgress
                  fullWidth
                  variant="contained"
                  size="small"
                  color="primary"
                  loading={updateBtnLoader}
                  handleButtonClick={updateData}
                  name="Update"
                />
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  Preview
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default PublishMain;
