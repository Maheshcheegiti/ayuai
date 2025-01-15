import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040F15",
  },
  text: {
    color: "#fff",
  },
  primaryText: {
    color: "#32CA9A",
  },
  primaryHeading: {
    color: "#32CA9A",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  secondaryHeading: {
    color: "#0C9EB1",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#32CA9A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default GlobalStyles;
