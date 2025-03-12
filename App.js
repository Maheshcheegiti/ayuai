import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import BottomTabBar from "./components/BottomTabBar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import OtpScreen from "./screens/OtpScreen";
import EditProfile from "./screens/EditProfile";
import ConversationScreen from "./screens/ConversationScreen";
import BlogPage from "./screens/BlogPage";
import SuperTokens from "supertokens-react-native";
import store from "./store";
import { Provider } from "react-redux";

SuperTokens.init({
  apiDomain: process.env.EXPO_PUBLIC_API_URL,
  apiBasePath: "/auth",
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
            <Stack.Screen
              name="Otp"
              component={OtpScreen}
              options={{
                title: "OTP Verification",
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
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                title: "Edit Profile",
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
            <Stack.Screen
              name="Conversation"
              component={ConversationScreen}
              options={{
                title: "Conversation",
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
            <Stack.Screen
              name="Blog"
              component={BlogPage}
              options={{
                title: "Blog",
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
    </Provider>
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
