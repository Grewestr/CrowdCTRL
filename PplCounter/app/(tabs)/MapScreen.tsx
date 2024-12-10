import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "../../constants/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

type Room = {
  id: string;
  lat: number;
  lon: number;
  people_count: number;
  description?: string;
  website?: string;
};

const MapScreen = () => {
  const [locations, setLocations] = useState<Room[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (querySnapshot) => {
      const data: Room[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Room[];
      console.log("Real-time data:", data); // Debugging
      setLocations(data);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const getCoordinates = (lat: number, lon: number) => {
    if (lat == null || lon == null) {
      console.warn("Invalid lat/lon values");
      return null;
    }
    return {
      latitude: lat,
      longitude: lon,
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.3375,
          longitude: -83.0600,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        mapType="standard" // Standard map view
      >
        {locations.map((location) => {
          const coordinates = getCoordinates(location.lat, location.lon);

          if (!coordinates) {
            console.warn(`Invalid lat/lon for ${location.id}`, location);
            return null;
          }

          return (
            <Marker
              key={location.id}
              coordinate={coordinates}
              title={`People: ${location.people_count}`}
              description={location.description || ""}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1, 
  },
});

export default MapScreen;
