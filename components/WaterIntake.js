import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
  Easing,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path, LinearGradient, Stop, Rect } from "react-native-svg";

const WaterIntake = ({ value, onChange, goal }) => {
  const waterLevel = useRef(new Animated.Value(value)).current;
  const waveAnim1 = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(waveAnim1, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    Animated.loop(
      Animated.timing(waveAnim2, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  useEffect(() => {
    Animated.spring(waterLevel, {
      toValue: value,
      useNativeDriver: false,
      damping: 15,
      stiffness: 100,
    }).start();
  }, [value]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newLevel = value + gestureState.dy * -0.015;
      const clamped = Math.max(0, Math.min(10, newLevel));
      waterLevel.setValue(clamped);
      onChange(clamped);
    },
    onPanResponderRelease: () => {
      Animated.spring(waterLevel, {
        toValue: value,
        useNativeDriver: false,
        damping: 15,
        stiffness: 100,
      }).start();
    },
  });

  const getWaveTransform = (anim, direction) => {
    return anim.interpolate({
      inputRange: [0, 1],
      outputRange: direction === "left" ? [-100, 100] : [100, -100],
    });
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="water"
        size={30}
        color="#2196F3"
      />
      <View style={styles.details}>
        <Text style={styles.title}>Water Intake</Text>
        <Text style={styles.value}>{value.toFixed(1)} L</Text>
        <Text style={styles.target}>Goal: {goal}</Text>
      </View>

      <View style={styles.trackerContainer} {...panResponder.panHandlers}>
        {/* Gradient Water Fill */}
        <Animated.View
          style={[
            styles.waterFill,
            {
              transform: [
                {
                  translateY: waterLevel.interpolate({
                    inputRange: [0, 10],
                    outputRange: [80, 0], // Base movement
                  }),
                },
              ],
            },
          ]}
        >
          <Svg height="100%" width="100%">
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#2196F3" stopOpacity="1" />
              <Stop offset="100%" stopColor="#2196F3" stopOpacity="0.5" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </Animated.View>

        {/* Wave Layer 1 */}
        <Animated.View
          style={[
            styles.waveLayer,
            {
              transform: [
                { translateX: getWaveTransform(waveAnim1, "left") },
                {
                  translateY: waterLevel.interpolate({
                    inputRange: [0, 10],
                    outputRange: [0, -80], // Perfect alignment
                  }),
                },
              ],
            },
          ]}
        >
          <Svg height="100%" width="200%">
            <Path
              d="M0 10 Q50 16 100 10 T200 10 Q250 4 300 10 T400 10"
              fill="rgba(255,255,255,0.3)"
            />
          </Svg>
        </Animated.View>

        {/* Wave Layer 2 */}
        <Animated.View
          style={[
            styles.waveLayer,
            {
              transform: [
                { translateX: getWaveTransform(waveAnim2, "right") },
                {
                  translateY: waterLevel.interpolate({
                    inputRange: [0, 10],
                    outputRange: [0, -80], // Perfect alignment
                  }),
                },
              ],
            },
          ]}
        >
          <Svg height="100%" width="200%">
            <Path
              d="M0 8 Q50 12 100 8 T200 8 Q250 4 300 8 T400 8"
              fill="rgba(255,255,255,0.2)"
            />
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF22",
    borderRadius: 15,
    padding: 15,
    overflow: "hidden",
  },
  icon: {
    marginRight: 15,
  },
  details: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    color: "#32CA9A",
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  target: { color: "#FFFFFF99", fontSize: 14 },
  trackerContainer: {
    height: 80,
    width: 120,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#040F15AA",
  },
  waterFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  waveLayer: {
    position: "absolute",
    bottom: -23,
    left: 0,
    width: "200%",
    height: 30,
  },
});

export default WaterIntake;
