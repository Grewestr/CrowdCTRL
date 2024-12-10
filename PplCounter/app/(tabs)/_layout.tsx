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
        tabBarActiveTintColor: "#BB86FC", 
        tabBarInactiveTintColor: "#666", 
        tabBarStyle: {
          backgroundColor: "#121212", 
          borderTopWidth: 0, 
        },
        headerStyle: {
          backgroundColor: "#6200EE", 
        },
        headerTintColor: "#FFF", 
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18, 
        },
        headerTitleAlign: "center", 
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="MapScreen" options={{ title: "Map" }} />
    </Tabs>
  );
}
