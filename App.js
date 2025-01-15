import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import BottomTabBar from "./components/BottomTabBar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style={styles.statusBar} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Log In",
              headerStyle: {
                backgroundColor: "#040F15",
              },
              headerTintColor: "#32CA9A",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const MainScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <BottomTabBar />
  </View>
);

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#040F15",
    paddingTop: 50,
  },
  statusBar: {
    backgroundColor: "#040F15",
  },
  text: {
    color: "#FFFFFF",
  },
});
