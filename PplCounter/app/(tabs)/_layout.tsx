import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Map route names to icons
          if (route.name === "index") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "explore") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "MapScreen") {
            iconName = focused ? "map" : "map-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#BB86FC", // Light purple for active tab
        tabBarInactiveTintColor: "#666", // Muted gray for inactive tab
        tabBarStyle: {
          backgroundColor: "#121212", // Dark background for tab bar
          borderTopWidth: 0, // Remove tab bar border
        },
        headerStyle: {
          backgroundColor: "#6200EE", // Primary color for header background
        },
        headerTintColor: "#FFF", // White text for header
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18, // Slightly larger header font
        },
        headerTitleAlign: "center", // Center-align header title
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="MapScreen" options={{ title: "Map" }} />
    </Tabs>
  );
}
