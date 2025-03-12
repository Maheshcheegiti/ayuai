import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HealthScoreCard = ({ healthScore }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeValue = (healthScore / 100) * circumference;

  const getHealthScoreColor = (score) => {
    const hue = (score / 100) * 100;
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <LinearGradient
      colors={["#32CA9AAA", "#2C3E50AA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.healthScoreCard}
    >
      <Text style={styles.scoreLabel}>Health Score</Text>
      <View style={styles.circularProgress}>
        <Svg width={200} height={200} viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#FFFFFF22"
            strokeWidth="8"
            fill="transparent"
          />
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={getHealthScoreColor(healthScore)}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${strokeValue} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <Text
            style={[
              styles.healthScoreLabel,
              { color: getHealthScoreColor(healthScore) },
            ]}
          >
            {healthScore}
          </Text>
        </Svg>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  healthScoreCard: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 10,
  },
  scoreLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  circularProgress: {
    alignItems: "center",
    justifyContent: "center",
  },
  healthScoreLabel: {
    fontSize: 80,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
});

export default HealthScoreCard;
