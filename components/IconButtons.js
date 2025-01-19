import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButtons = ({ iconName, onPress, text }) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color="#32CA9A" />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#FFFFFF22",
    padding: 13,
    flex: 1,
    borderRadius: 5,
    gap: 15,
  },
  iconContainer: {
    backgroundColor: "#32CA9A22",
    padding: 10,
    borderRadius: 75,
    marginBottom: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFFCC",
    fontSize: 16,
  },
});

export default IconButtons;
