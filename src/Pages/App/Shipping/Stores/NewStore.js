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
  Button,
} from "@material-ui/core";
import swal from "sweetalert";
import api from "../../../../util/api";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ToggleDays from "../../../../components/common/ToggleDays";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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

function NewStore({ fetchStores }) {
  const classes = styles();
  const [newStoreData, setNewStoreData] = useState(initialNewStoreData);
  const [newStoreBtnLoader, setNewStoreBtnLoader] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState({});
  // const markerRef = useRef(null);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const markerRef = React.useCallback((node) => {
    if (node !== null) setMarker(node); // node = ref.current
  }, []);

  const onMove = useCallback(() => {
    if (map !== null) setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    if (map !== null) map.on("move", onMove);

    return () => {
      if (map !== null) map.off("move", onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    if (map !== null)
      map.setView([newStoreData.latitude, newStoreData.longitude], 13);
    if (marker._latlng)
      marker.setLatLng([newStoreData.latitude, newStoreData.longitude]);
  }, [newStoreData.latitude, newStoreData.longitude]);

  useEffect(() => {
    console.log(marker);
    if (marker._latlng)
      setNewStoreData({
        ...newStoreData,
        longitude: marker._latlng.lng,
        latitude: marker._latlng.lat,
      });
  }, [marker._latlng]);

  const handleNewStoreData = (e) => {
    setNewStoreData({
      ...newStoreData,
      [e.target.name]: e.target.value,
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

  const getLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(savePosition);
    else swal("Geolocation is not supported by this browser.");
  };

  const savePosition = (position) => {
    setNewStoreData({
      ...newStoreData,
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  };

  const setDays = (value) => {
    setNewStoreData({
      ...newStoreData,
      open_days: JSON.stringify(value),
    });
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[newStoreData.latitude, newStoreData.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        whenCreated={setMap}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} ref={markerRef} draggable={true}>
          <Popup onClick={setLocation}>Select as store location</Popup>
        </Marker>
      </MapContainer>
    ),
    []
  );

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
                  type="text"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  value={newStoreData.latitude}
                  onChange={handleNewStoreData}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Store location longitude"
                  name="longitude"
                  type="text"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  value={newStoreData.longitude}
                  onChange={handleNewStoreData}
                />
              </Grid>
              <Box pl={2} pr={2}>
                <FormHelperText>
                  Select store location from locating through the map or else
                  manually enter valid location cordinates respectively.
                </FormHelperText>
              </Box>
              <Grid item xs={12}>
                <Button
                  startIcon={<LocationOnIcon size="small" />}
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={getLocation}
                >
                  locate me
                </Button>
              </Grid>
              {!isNaN(newStoreData.latitude) && !isNaN(newStoreData.longitude) && (
                <Grid item xs={12}>
                  {displayMap}
                  {position !== null && (
                    <p>
                      latitude: {position.lat.toFixed(4)}, longitude:{" "}
                      {position.lng.toFixed(4)}{" "}
                    </p>
                  )}
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
