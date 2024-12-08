import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../constants/firebase-config";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time updates from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Render individual location item
  const renderItem = ({ item }) => {
    const locationString =
      item.location && item.location._lat && item.location._long
        ? `${item.location._lat.toFixed(4)}° N, ${item.location._long.toFixed(4)}° W`
        : "Unknown Location";

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.description || "Unnamed Location"}</Text>
        <View style={styles.row}>
          <Ionicons name="people-outline" size={20} color="#6200EE" />
          <Text style={styles.peopleCount}> {item.people_count || "0"} People</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={20} color="#6200EE" />
          <Text style={styles.location}>{locationString}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (item.website) {
              Linking.openURL(item.website);
            } else {
              alert("No website available.");
            }
          }}
        >
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Discover the best spots nearby</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  peopleCount: {
    fontSize: 16,
    color: "#ccc",
    marginLeft: 5,
  },
  location: {
    fontSize: 16,
    color: "#ccc",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ExploreScreen;
