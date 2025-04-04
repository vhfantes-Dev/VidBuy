import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 20,
  },
  inputWrapper: {
    position: "relative",
    width: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderZero: {
    position: "absolute",
    fontSize: 32,
    color: "#D9D9D9",
  },
  input: {
    fontSize: 32,
    textAlign: "center",
    color: "#000",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
  },
});


export default styles;
