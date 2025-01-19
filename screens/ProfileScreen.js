import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import Avatar from "../assets/images/Avatars/Number=3.png";
import { Ionicons } from "@expo/vector-icons";
import BadgesBar from "../components/BadgesBar";
import NavigationBars from "../components/NavigationBars";

const ProfileScreen = ({ navigation }) => {
  const profileNavigations = [
    {
      name: "Settings",
      icon: "settings-outline",
      onPress: () => {
        console.log("Settings pressed!");
      },
    },
    {
      name: "FAQs",
      icon: "help-circle-outline",
      onPress: () => {
        console.log("FAQs pressed!");
      },
    },
    {
      name: "User Manual",
      icon: "book-outline",
      onPress: () => {
        console.log("User Manual pressed!");
      },
    },
    {
      name: "Feedback and Queries",
      icon: "chatbubble-ellipses-outline",
      onPress: () => {
        console.log("Feedback and Queries pressed!");
      },
    },
    {
      name: "Troubleshoot",
      icon: "bug-outline",
      onPress: () => {
        console.log("Troubleshoot pressed!");
      },
    },
  ];

  const appNavigations = [
    {
      name: "Check for Updates",
      icon: "arrow-up-circle-outline",
      onPress: () => {
        console.log("Check for Updates pressed!");
      },
    },
    {
      name: "Privacy Policy",
      icon: "lock-closed-outline",
      onPress: () => {
        console.log("Privacy Policy pressed!");
      },
    },
  ];

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleMyData = () => {
    console.log("My Data pressed!");
    // Add navigation or modal for My Data
  };

  const handleHealthReport = () => {
    console.log("Health Report pressed!");
    // Add navigation or modal for Health Report
  };

  const handleMessgages = () => {
    console.log("Messages pressed!");
    // Add navigation or modal for Messages
  };

  return (
    <ScrollView style={[GlobalStyles.container, styles.profileContainer]}>
      <TouchableOpacity onPress={handleEditProfile}>
        <View
          style={[GlobalStyles.glassContainer, styles.profileInnerContainer]}
        >
          <View style={styles.avatar}>
            <Image
              source={Avatar}
              style={GlobalStyles.avatar}
              accessibilityLabel="Avatar"
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={GlobalStyles.primaryHeading}>Cheegiti Mahesh</Text>
            <TouchableOpacity onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={24} color="#32CA9A" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <BadgesBar />
      <View style={styles.dataAndHealthReport}>
        <TouchableOpacity
          onPress={handleMyData}
          style={{
            flex: 1,
          }}
        >
          <View
            style={[GlobalStyles.glassContainer, styles.dataAndHealthContainer]}
          >
            <Ionicons name="document-text-outline" size={20} color="#32CA9A" />
            <Text style={GlobalStyles.primaryText}>My Data</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleHealthReport}
          style={{
            flex: 1,
          }}
        >
          <View
            style={[GlobalStyles.glassContainer, styles.dataAndHealthContainer]}
          >
            <Ionicons name="analytics-outline" size={20} color="#32CA9A" />
            <Text style={GlobalStyles.primaryText}>Health Report</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleMessgages}
        style={{
          flex: 1,
        }}
      >
        <View style={[GlobalStyles.glassContainer, styles.messageContainer]}>
          <View style={styles.messageContainerInner}>
            <Ionicons name="mail-outline" size={20} color="#32CA9A" />
            <Text style={GlobalStyles.primaryText}>Messages</Text>
          </View>
          <View style={styles.unreadMessages}>
            <Text style={GlobalStyles.text}>9</Text>
          </View>
        </View>
      </TouchableOpacity>
      <NavigationBars
        navigationsData={profileNavigations}
        style={styles.profileNavigations}
      />
      <NavigationBars
        navigationsData={appNavigations}
        style={styles.appNavigations}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    padding: 15,
  },
  profileInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dataAndHealthReport: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 5,
  },
  dataAndHealthContainer: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  messageContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  messageContainerInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  unreadMessages: {
    backgroundColor: "#FF2E63",
    borderRadius: 50,
    padding: 5,
    paddingHorizontal: 10,
  },
  profileNavigations: {
    marginVertical: 10,
  },
  appNavigations: {
    marginBottom: 90,
  },
});

export default ProfileScreen;
