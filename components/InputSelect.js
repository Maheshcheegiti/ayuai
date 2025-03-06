import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker
import GlobalStyles from "./GlobalStyles"; // Assuming GlobalStyles is available

const InputSelect = ({ label, value, onChangeText, options, placeholder }) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const onValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    onChangeText(itemValue);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={GlobalStyles.primaryText}>{label}</Text>}

      <View style={styles.input}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          mode="dialog"
          dropdownIconColor={"#FFFFFFCC"}
          placeholder="Select an option"
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#32CA9A",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "#FFFFFF22",
  },
  picker: {
    height: 50, // Ensure it matches the height of the input box
    width: "100%", // Full width inside the container
    color: "#fff", // Text color
  },
});

export default InputSelect;
