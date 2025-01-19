import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useRef, useEffect } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import HealthScreen from "../screens/HealthScreen";
import ChatScreen from "../screens/ChatScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MealPlannerScreen from "../screens/MealPlannerScreen";

const Tab = createBottomTabNavigator();

const tabBar = [
  {
    name: "Health",
    component: HealthScreen,
    icon: "heart",
  },
  {
    name: "Meal Planner",
    component: MealPlannerScreen,
    icon: "restaurant",
  },
  {
    name: "AyuAi",
    component: ChatScreen,
    iconType: "custom",
    customIcon: require("../assets/chat-icon.png"),
  },
  {
    name: "Discover",
    component: DiscoverScreen,
    icon: "compass",
  },
  {
    name: "Profile",
    component: ProfileScreen,
    icon: "person",
  },
];

const animateIn = {
  0: { scale: 0.8, translateY: 10 },
  0.5: { scale: 1.2, translateY: -10 },
  1: { scale: 1, translateY: 0 },
};

const animateOut = {
  0: { scale: 1, translateY: 0 },
  1: { scale: 0.8, translateY: 10 },
};

const TabButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const iconRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      iconRef.current.animate(animateIn);
      textRef.current.transitionTo({ opacity: 1, scale: 1 });
    } else {
      iconRef.current.animate(animateOut);
      textRef.current.transitionTo({ opacity: 0, scale: 0.8 });
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Animatable.View ref={iconRef} duration={500}>
        {item.iconType === "custom" ? (
          <Image
            source={item.customIcon}
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? "#32CA9A" : "#999",
            }}
            resizeMode="contain"
          />
        ) : (
          <Ionicons
            name={item.icon}
            size={30}
            color={focused ? "#32CA9A" : "#999"}
          />
        )}
      </Animatable.View>
      <Animatable.Text
        ref={textRef}
        style={[styles.label, { color: focused ? "#32CA9A" : "#999" }]}
      >
        {item.name}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
      initialRouteName="AyuAi"
    >
      {tabBar.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={tab} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#000",
    position: "absolute",
    marginHorizontal: 10,
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});
