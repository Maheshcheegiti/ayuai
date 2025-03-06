import React from "react";
import { StyleSheet, View, TextInput as RNTextInput, Text } from "react-native";
import GlobalStyles from "./GlobalStyles"; // Assuming GlobalStyles is already available

const InputText = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
}) => {
  return (
    <View style={GlobalStyles.container}>
      {label && <Text style={GlobalStyles.primaryText}>{label}</Text>}
      <RNTextInput
        style={style.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#757575"}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#32CA9A", // Same as border color from previous styles
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#FFFFFFCC", // Matching text color from previous styles
    backgroundColor: "#FFFFFF22", // Matching background color
    marginBottom: 5,
  },
});

export default InputText;
