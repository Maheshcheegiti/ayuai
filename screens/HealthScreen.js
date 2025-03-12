import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalStyles from "../components/GlobalStyles";
import WaterIntake from "../components/WaterIntake";
import GoalCard from "../components/GoalCard";
import HealthScoreCard from "../components/HealthScoreCard";

const HealthScreen = () => {
  const [healthScore, setHealthScore] = useState(78);
  const [waterIntake, setWaterIntake] = useState(3.5);
  const [stepCount, setStepCount] = useState(4500);
  const [sleepHours, setSleepHours] = useState(7.2);
  const [bmi, setBmi] = useState(22.5);
  const [heartRate, setHeartRate] = useState(72);

  const getHealthScoreColor = (score) => {
    if (score > 80) return "#4CAF50";
    if (score > 60) return "#FFEB3B";
    return "#F44336";
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <View style={styles.container}>
        {/* Health Score Section */}
        <HealthScoreCard healthScore={healthScore} />
        {/* Interactive Goals Section */}
        <View style={styles.goalsContainer}>
          {/* Water Intake */}
          <WaterIntake
            value={waterIntake}
            onChange={(newValue) => setWaterIntake(newValue)}
            goal={10}
          />

          {/* Steps */}
          <GoalCard
            icon="shoe-print"
            title="Steps"
            value={stepCount.toLocaleString()}
            goal={10000}
            progress={stepCount / 10000}
            color="#4CAF50"
          />

          {/* Sleep */}
          <GoalCard
            icon="bed"
            title="Sleep"
            value={`${sleepHours.toFixed(1)} hrs`}
            goal={8}
            progress={sleepHours / 8}
            color="#9C27B0"
          />

          {/* BMI */}
          <GoalCard
            icon="human"
            title="BMI"
            value={bmi.toFixed(1)}
            goal={24.9}
            progress={bmi / 24.9}
            color="#FF9800"
          />

          {/* Heart Rate */}
          <View style={styles.goalCard}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={30}
              color="#E91E63"
              style={styles.goalIcon}
            />
            <View style={styles.goalDetails}>
              <Text style={styles.goalTitle}>Heart Rate</Text>
              <Text style={styles.goalValue}>{heartRate} bpm</Text>
              <Text style={styles.goalTarget}>Target: 60-100 bpm</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexGrow: 1,
    paddingBottom: 80,
  },
  healthScoreCard: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 10,
  },
  healthScoreLabel: {
    fontSize: 80,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
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
  goalsContainer: {
    gap: 10,
  },
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
  chartsContainer: {
    marginTop: 20,
    gap: 20,
  },
  chartCard: {
    backgroundColor: "#FFFFFF22",
    borderRadius: 15,
    padding: 15,
  },
  chartTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HealthScreen;
