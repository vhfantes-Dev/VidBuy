import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ResetPasswordInput from "../components/ResetPasswordInput/ResetPasswordInput";

export default function ForgotPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isReset, setIsReset] = useState(false);

  const handleReset = () => {
    if (password.length >= 8 && password === confirmPassword) {
      setIsReset(true);
    }
  };

  return (
    <View style={styles.container}>
      {!isReset ? (
        <>
          <Text style={styles.title}>Create Password</Text>
          <Text style={styles.subtitle}>
            Your new password must be different from previous used passwords.
          </Text>

          <ResetPasswordInput label="Password" value={password} setPassword={setPassword} />
          <ResetPasswordInput label="Confirm Password" value={confirmPassword} setPassword={setConfirmPassword} />

          {password !== confirmPassword && confirmPassword.length > 0 && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.successContainer}>
          <Text style={styles.successMessage}>
            We've sent you an email for your password recovery. Please check your inbox.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b6b6b",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3F51B5",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  successMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#3F51B5",
    fontWeight: "bold",
  },
});
