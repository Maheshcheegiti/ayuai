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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#32CA9AAA",
    backgroundColor: "#0C9EB166",
    marginVertical: 20,
  },
  glassContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 5,
    paddingHorizontal: 10,
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "#32CA9AAA",
  },
  badge: {
    height: 70,
    width: 70,
  },
  badgeDisabled: {
    height: 70,
    width: 70,
    filter: "grayscale(100%)",
  },
});

export default GlobalStyles;
