import React, { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Button, Grid } from "@material-ui/core";
import swal from "sweetalert";

function SingleMapHandler({
  height,
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
    if (map !== null)
      map.flyTo([initialPosition.latitude, initialPosition.longitude], 18);
    if (marker._latlng) {
      marker.setLatLng([initialPosition.latitude, initialPosition.longitude]);
    }
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
        map.flyTo(
          [markerEvent._latlng.lat, markerEvent._latlng.lng],
          map.getZoom()
        );
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
    if (map !== null)
      map.flyTo(
        [eventPosition.coords.latitude, eventPosition.coords.longitude],
        18
      );
    if (marker._latlng)
      marker.setLatLng([
        eventPosition.coords.latitude,
        eventPosition.coords.longitude,
      ]);
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

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[initialPosition.latitude, initialPosition.longitude]}
        zoom={18}
        scrollWheelZoom={false}
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
    <Grid container spacing={2}>
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
      <Grid item xs={12}>
        {displayMap}
        <p>
          latitude: {position.lat.toFixed(4)}, longitude:
          {position.lng.toFixed(4)}
        </p>
      </Grid>
    </Grid>
  );
}

export default SingleMapHandler;
