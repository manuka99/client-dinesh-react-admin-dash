import React, { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { Button, Grid, Typography } from "@material-ui/core";
import swal from "sweetalert";
import { SearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const searchControl = new SearchControl({
  style: "button",
  provider: new OpenStreetMapProvider(),
  marker: {
    draggable: false,
  },
});

function SingleMapHandler({
  height,
  zoom,
  initialPosition,
  positionInput,
  handlePositionChange,
}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState({});
  const [position, setPosition] = useState({
    lat: initialPosition.latitude,
    lng: initialPosition.longitude,
  });

  const markerRef = useCallback((node) => {
    if (node !== null) setMarker(node); // node = ref.current
  }, []);

  useEffect(() => {
    if (map !== null) {
      map.addControl(searchControl);
      map.on("click", function (e) {
        setPosition(e.latlng);
      });
    }
  }, [map]);

  // when free marker position change
  useEffect(() => {
    if (map !== null) map.flyTo([position.lat, position.lng], map.getZoom());
    if (marker._latlng) {
      marker.setLatLng([position.lat, position.lng]);
    }
  }, [position]);

  useEffect(() => {
    setPosition({
      lat: initialPosition.latitude,
      lng: initialPosition.longitude,
    });
  }, [positionInput]);

  //   useEffect(() => {
  //     console.log(position);
  //     console.log(initialPosition);
  //   }, [position]);

  useEffect(() => {
    if (marker._latlng) {
      marker.on("dragend", function (event) {
        var markerEvent = event.target;
        setPosition({
          lng: markerEvent._latlng.lng,
          lat: markerEvent._latlng.lat,
        });
      });
    }
  }, [marker._latlng]);

  const getLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(savePosition);
    else swal("Geolocation is not supported by this browser.");
  };

  const savePosition = (eventPosition) => {
    setPosition({
      lat: eventPosition.coords.latitude,
      lng: eventPosition.coords.longitude,
    });
  };

  const setLocation = () => {
    if (marker._latlng) {
      handlePositionChange({
        longitude: marker._latlng.lng,
        latitude: marker._latlng.lat,
      });
      setPosition({
        lat: marker._latlng.lat,
        lng: marker._latlng.lng,
      });
    }
  };

  const displaySelected = () => {
    setPosition({
      lat: initialPosition.latitude,
      lng: initialPosition.longitude,
    });
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[initialPosition.latitude, initialPosition.longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        whenCreated={setMap}
        style={{ width: "100%", height: height }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} ref={markerRef} draggable={true}>
          <Popup>
            <span onClick={setLocation} style={{ cursor: "pointer" }}>
              {position.lat === initialPosition.latitude &&
              position.lng === initialPosition.longitude
                ? "Store location"
                : "Set as store location"}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    ),
    [position]
  );
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Button
          startIcon={<GpsFixedIcon size="small" />}
          color="primary"
          size="small"
          variant="outlined"
          onClick={getLocation}
          style={{ marginRight: "10px" }}
        >
          locate me
        </Button>
        <Button
          startIcon={<LocationOnIcon size="small" />}
          color="primary"
          size="small"
          variant="outlined"
          onClick={displaySelected}
        >
          display selected
        </Button>
      </Grid>
      <Grid item xs={12}>
        {displayMap}
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ cursor: "pointer" }}
        >
          Click on the marker to select a location.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SingleMapHandler;
