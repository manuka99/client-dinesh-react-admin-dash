import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  Box,
  makeStyles,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextareaAutosize,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import swal from "sweetalert";
import api from "../../../../util/api";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import ToggleDays from "../../../../components/common/ToggleDays";
import SingleMapHandler from "../../../../components/common/SingleMapHandler";

const styles = makeStyles((theme) => ({
  flexRowDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
    width: "100%",
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

const initialNewStoreData = {
  name: "",
  since_year: "",
  description: "",
  open_days: "[1,3]",
  status: "available",
  start_time: "11:30",
  end_time: "23:30",
  address: "",
  longitude: 0,
  latitude: 0,
};

function NewStore({ fetchStores, oldData }) {
  const classes = styles();
  const [newStoreData, setNewStoreData] = useState(initialNewStoreData);
  const [newStoreBtnLoader, setNewStoreBtnLoader] = useState(false);
  const [positionInput, setPositionInput] = useState(false);

  const handleNewStoreData = (e) => {
    setNewStoreData({
      ...newStoreData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewInputPosition = (e) => {
    setNewStoreData({
      ...newStoreData,
      [e.target.name]: parseInt(e.target.value),
    });
    setPositionInput(!positionInput);
  };

  const handlePositionChange = (newPosition) => {
    console.log(newPosition);
    setNewStoreData({
      ...newStoreData,
      longitude: newPosition.longitude,
      latitude: newPosition.latitude,
    });
  };

  const createNewStore = (e) => {
    e.preventDefault();
    setNewStoreBtnLoader(true);
    api()
      .post("/categories/new", newStoreData)
      .then((res) => {
        swal("Category was added successfully");
        setNewStoreData(initialNewStoreData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setNewStoreBtnLoader(false);
        fetchStores();
      });
  };

  const setDays = (value) => {
    setNewStoreData({
      ...newStoreData,
      open_days: JSON.stringify(value),
    });
  };

  return (
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">New shipping store</Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardContent>
          <form onSubmit={createNewStore}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Store name"
                  name="name"
                  type="text"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  value={newStoreData.name}
                  onChange={handleNewStoreData}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Store Since"
                  name="since_year"
                  type="number"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  value={newStoreData.since_year}
                  onChange={handleNewStoreData}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextareaAutosize
                    name="description"
                    style={{ width: "100%", resize: "vertical" }}
                    value={newStoreData.description}
                    onChange={handleNewStoreData}
                    rowsMin={6}
                    placeholder="Description"
                  />
                  <FormHelperText>
                    The description is not prominent by default; however, some
                    themes may show it.
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="status">Store status</InputLabel>
                  <Select
                    id="status"
                    label="Store status"
                    value={newStoreData.status}
                    name="status"
                    onChange={handleNewStoreData}
                    MenuProps={{ disablePortal: true }}
                  >
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="not_available">Not Available</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Store open days
                </Typography>
                <ToggleDays
                  days={JSON.parse(newStoreData.open_days)}
                  setDays={setDays}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Open time"
                  type="time"
                  value={newStoreData.start_time}
                  name="start_time"
                  onChange={handleNewStoreData}
                  fullWidth
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Close time"
                  type="time"
                  value={newStoreData.end_time}
                  name="end_time"
                  onChange={handleNewStoreData}
                  fullWidth
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Store address line"
                  name="address"
                  type="text"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  value={newStoreData.address}
                  onChange={handleNewStoreData}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Store location latitude"
                  name="latitude"
                  type="number"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  value={newStoreData.latitude}
                  onChange={handleNewInputPosition}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Store location longitude"
                  name="longitude"
                  type="number"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  value={newStoreData.longitude}
                  onChange={handleNewInputPosition}
                />
              </Grid>
              <Box pl={2} pr={2}>
                <FormHelperText>
                  Select store location from locating through the map or else
                  manually enter valid location cordinates respectively.
                </FormHelperText>
              </Box>
              {!isNaN(newStoreData.latitude) && !isNaN(newStoreData.longitude) && (
                <Grid item xs={12}>
                  <SingleMapHandler
                    height="400px"
                    initialPosition={newStoreData}
                    positionInput={positionInput}
                    handlePositionChange={handlePositionChange}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <ButtonProgress
                  name="create category"
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  loading={newStoreBtnLoader}
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewStore;
