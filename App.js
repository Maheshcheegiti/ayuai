import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import BottomTabBar from "./components/BottomTabBar";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.container}>
        <Header />
        <NavigationContainer
          style={{
            backgroundColor: "#040F15",
          }}
        >
          <BottomTabBar />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: "#32CA9A",
    // backgroundColor: "#0C9EB1",
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
