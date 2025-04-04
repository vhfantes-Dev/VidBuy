import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#fff",
    },
    backButton: { 
      position: "absolute",
       top: 40, 
       left: 20,
       zIndex: 10
      },
    formContainer: {
      alignItems: "center",
      width: "100%",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
    },
    description: {
      fontSize: 14,
      textAlign: "center",
      color: "#6b6b6b",
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      alignSelf: "flex-start",
      marginBottom: 5,
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#3640e0",
      paddingVertical: 12,
      width: "100%",
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    successContainer: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    successText: {
      fontSize: 16,
      color: "#6b6b6b",
      textAlign: "center",
      marginTop: 20,
      paddingHorizontal: 20,
    },
  });
  export default styles