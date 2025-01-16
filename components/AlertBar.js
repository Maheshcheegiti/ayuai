import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const AlertBar = ({ type = "info", message, style = {} }) => {
  // Define icon and colors based on type
  const getIconAndColor = () => {
    switch (type) {
      case "success":
        return { icon: "checkmark-circle", color: "#4CAF50" }; // Green
      case "error":
        return { icon: "close-circle", color: "#F44336" }; // Red
      case "warning":
        return { icon: "warning", color: "#FFC107" }; // Yellow
      case "info":
      default:
        return { icon: "information-circle", color: "#2196F3" }; // Blue
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color + "20", borderLeftColor: color },
        style,
      ]}
    >
      <Ionicons name={icon} size={24} color={color} style={styles.icon} />
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
    borderLeftWidth: 5,
    // borderColor: "transparent",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});

export default AlertBar;
