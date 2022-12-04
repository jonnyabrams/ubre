import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useEffect, useRef } from "react";

import { useAppSelector } from "../hooks";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // if no origin or destination, immediately return - ie. carry on
    if (!origin || !destination) return;

    // zoom and fit map to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      className="flex-1"
      mapType="mutedStandard"
      initialRegion={{
        // @ts-ignore
        latitude: origin?.location.lat,
        // @ts-ignore
        longitude: origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
