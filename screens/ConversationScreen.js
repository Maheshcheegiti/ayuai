import React from "react";
import { StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../components/GlobalStyles";

const ConversationScreen = () => {
  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <Text style={GlobalStyles.text}>Conversation Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default ConversationScreen;
