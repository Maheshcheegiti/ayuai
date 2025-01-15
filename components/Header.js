import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Logo from "../assets/icon.png";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "./GlobalStyles";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoSection}>
        <Image
          source={Logo}
          accessibilityLabel="AyuAi Logo"
          style={styles.logo}
        />
        <Text style={styles.logoText}>AyuAi</Text>
      </View>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="log-in-outline" size={24} color="#32CA9A" />
        <Text style={GlobalStyles.primaryText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    shadowColor: "#32CA9A",
    borderBottomWidth: 1,
    borderBottomColor: "#32CA9A33",
    justifyContent: "space-between",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#32CA9A",
    fontFamily: "Averta",
  },
  login: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default Header;
