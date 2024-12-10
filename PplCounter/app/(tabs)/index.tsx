import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../constants/firebase-config";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const [totalLocations, setTotalLocations] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Enable real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());

      // Calculate totals
      const totalLocations = data.length;
      const totalPeople = data.reduce((sum, location) => sum + (location.people_count || 0), 0);

      setTotalLocations(totalLocations);
      setTotalPeople(totalPeople);
      setLoading(false); // Stop loading once data is fetched
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://www.gisma.com/uploads/sites/5/2023/09/MSc-DS-AI-GettyImages-1479180033.jpg?w=1920&h=1080&crop=1",
      }} // Replace with a real image URL
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to CrowdCTRL</Text>
        <Text style={styles.subtitle}>
          Discover where the action is, in real-time.
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalLocations}</Text>
            <Text style={styles.statLabel}>Locations</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalPeople}</Text>
            <Text style={styles.statLabel}>People Out There</Text>
          </View>
        </View>

        <Text style={styles.description}>
          "CrowdCTRL" exists to inspire real-world connections and help you make
          informed decisions about where to spend your time. By providing
          real-time updates on local hotspots, we make it easier to find the
          perfect place to socialize, relax, or celebrate.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.buttonText}>Explore Nearby Spots</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 24,
    fontStyle: "italic",
    color: "#FFF", 
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#DDD",
    textAlign: "center",
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  statBox: {
    alignItems: "center",
    padding: 10,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 16,
    color: "#DDD",
  },
  description: {
    fontSize: 16,
    color: "#CCC",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 3 },
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
