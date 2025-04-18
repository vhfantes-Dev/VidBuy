import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 5,
    color: "transparent",
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
    width: 350,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 350,
  },
  passwordInputField: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    padding: 10,
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
