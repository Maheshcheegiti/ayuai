import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GoalCard = ({ icon, title, value, goal, progress, color }) => {
  return (
    <View style={styles.goalCard}>
      <MaterialCommunityIcons
        name={icon}
        size={30}
        color={color}
        style={styles.goalIcon}
      />
      <View style={styles.goalDetails}>
        <Text style={styles.goalTitle}>{title}</Text>
        <Text style={styles.goalValue}>{value}</Text>
        <Text style={styles.goalTarget}>Goal: {goal}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF22",
    borderRadius: 15,
    padding: 15,
  },
  goalIcon: {
    marginRight: 15,
  },
  goalDetails: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    color: "#32CA9A",
    marginBottom: 5,
  },
  goalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  goalTarget: {
    color: "#FFFFFF99",
    fontSize: 14,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#FFFFFF11",
    borderRadius: 4,
    marginLeft: 15,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
});

export default GoalCard;
