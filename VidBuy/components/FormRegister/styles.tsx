import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 20,
  },
  Nameinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 5,
    width:350,
    padding:10
  },
  inputFilled: {
    color: "#000",
  },

  emailInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: 355,
    
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 355,
    
  },
  passwordInputField: {
    flex:1,
    paddingVertical: 10,
  },
  icon: {
    padding: 0,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  textLengthPassword: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
