import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Logo from "../assets/icon.png";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={Logo}
        accessibilityLabel="AyuAi Logo"
        style={styles.logo}
      />
      <Text style={styles.logoText}>AyuAi</Text>
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
});

export default Header;
