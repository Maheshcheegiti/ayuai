import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import GlobalStyles from "./GlobalStyles"; // Assuming GlobalStyles is available

const InputDate = ({ label, value, onChangeText, placeholder }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(value || new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onChangeText(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={GlobalStyles.primaryText}>{label}</Text>}

      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={styles.inputText}>
          {date.toLocaleDateString() || placeholder}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date()}
        />
      )}
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
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#FFFFFF22",
  },
  inputText: {
    fontSize: 16,
    color: "#FFFFFFCC",
  },
});

export default InputDate;
