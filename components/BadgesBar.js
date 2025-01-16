import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Badge1 from "../assets/images/Badges/Badge1.png";
import Badge2 from "../assets/images/Badges/Badge2.png";
import Badge3 from "../assets/images/Badges/Badge3.png";
import Badge4 from "../assets/images/Badges/Badge4.png";
import Badge5 from "../assets/images/Badges/Badge5.png";
import GlobalStyles from "./GlobalStyles";

const BadgesBar = () => {
  const handleMorePress = () => {
    console.log("More badges pressed!");
    // Add navigation or modal for full badge view
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Badges</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleMorePress}>
          <Text style={styles.moreText}>More</Text>
          <Ionicons name="chevron-forward-outline" size={16} color="#32CA9A" />
        </TouchableOpacity>
      </View>
      <View style={styles.badgeScroll}>
        <Image
          source={Badge1}
          style={GlobalStyles.badge}
          resizeMode="contain"
        />
        <Image
          source={Badge2}
          style={GlobalStyles.badge}
          resizeMode="contain"
        />
        <Image
          source={Badge3}
          style={GlobalStyles.badgeDisabled}
          resizeMode="contain"
        />
        <Image
          source={Badge4}
          style={GlobalStyles.badgeDisabled}
          resizeMode="contain"
        />
        <Image
          source={Badge5}
          style={GlobalStyles.badgeDisabled}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#040F15",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreText: {
    fontSize: 14,
    color: "#32CA9A",
    marginRight: 5,
  },
  badgeScroll: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default BadgesBar;
