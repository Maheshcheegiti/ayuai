import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import GlobalStyles from "./GlobalStyles"; // Assuming GlobalStyles is available

const InputSlider = ({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const [tempValue, setTempValue] = useState(value);

  // Synchronize tempValue with the value prop when it changes
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <View style={GlobalStyles.container}>
      {/* Label with Current Value */}
      {label && (
        <Text style={GlobalStyles.primaryText}>
          {label}:{" "}
          {tempValue.toFixed(
            step < 1 ? step.toString().split(".")[1].length : 0
          )}
        </Text>
      )}

      {/* Slider Input */}
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={tempValue} // Use internal state for smooth dragging
        onValueChange={setTempValue} // Update display smoothly while dragging
        onSlidingComplete={(val) => onValueChange(val)} // Update parent only when released
        minimumTrackTintColor="#32CA9A"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#32CA9A"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 5, // Matches InputText spacing
  },
});

export default InputSlider;
