import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "./GlobalStyles";


const NavigationBars = ({ navigationsData, style }) => {
  return (
    <View style={[GlobalStyles.glassContainer, styles.mainNavigations, style]}>
      {navigationsData.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          style={[
            styles.navigationContainer,
            index === navigationsData.length - 1 && { borderBottomWidth: 0 },
          ]}
        >
          <View style={styles.navigationInnerContainer}>
            <Ionicons name={item.icon} size={20} color="#32CA9A" />
            <Text style={GlobalStyles.primaryText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  profileNavigations: {
    flex: 1,
    marginTop: 10,
  },
  navigationContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#32CA9AAA",
  },
  navigationInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 5,
  },
});

export default NavigationBars;
