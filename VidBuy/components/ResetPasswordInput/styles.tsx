import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
      width: "100%",
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    passwordWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      height: 45,
    },
    icon: {
      padding: 10,
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginTop: 5,
    },
  });
  export default styles