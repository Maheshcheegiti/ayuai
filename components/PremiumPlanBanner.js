import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Logo from "../assets/icon.png";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "./GlobalStyles";

const PremiumPlanBanner = () => {
  return (
    <View style={styles.banner}>
      <View>
        <Text style={styles.bannerHeader}>Premium Plan</Text>
        <Text style={styles.bannerText}>
          Harness the full power of AyuAi to secure your health by unlocking
          premium features.
        </Text>
      </View>
      <TouchableOpacity style={[GlobalStyles.button, styles.button]}>
        <Ionicons name="flash" size={24} color="white" />
        <Text style={GlobalStyles.text}>Upgrade Now</Text>
      </TouchableOpacity>
      <Image style={styles.logobackground} source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#E5F9F6",
    padding: 15,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
  },
  bannerHeader: {
    color: "#32CA9A",
    fontSize: 25,
    fontWeight: "bold",
  },
  bannerText: {
    color: "#0C9EB1",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
    marginRight: 90,
  },
  logobackground: {
    height: 180,
    width: 180,
    position: "absolute",
    right: -50,
    zIndex: -1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    gap: 10,
  },
});

export default PremiumPlanBanner;
