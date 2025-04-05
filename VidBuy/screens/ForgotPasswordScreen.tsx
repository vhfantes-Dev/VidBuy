  import React, { useState } from "react";
  import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  import ResetPasswordInput from "../components/ResetPasswordInput/ResetPasswordInput";
  import { StackNavigationProp } from '@react-navigation/stack';
  import { RootStackParamList } from '../navigation';

  type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
  };

  export default function ForgotPasswordScreen({ navigation }: Props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isReset, setIsReset] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
      if (password.length < 8) {
        Alert.alert("Error", "Password must be at least 8 characters long.");
        return;
      }
    
      if (password !== confirmPassword) {
        Alert.alert("Erro", "Passwords do not match.");
        return;
      }
    
      try {
        setLoading(true);
        const email = await AsyncStorage.getItem("otp_email");
        const codeOtp = await AsyncStorage.getItem("resetCode");
    
        if (!email || !codeOtp) {
          Alert.alert("Error", "Code or email not found.");
          console.log("Email:", email);
          console.log("Código:", codeOtp);
          return;
        }
    
        const verifyOtpPayload = {
          email,
          codeOtp,
        };
    
        console.log("Verificando OTP em /request-password-reset:", verifyOtpPayload);
    
        await axios.post("http://192.168.5.22:3000/api/auth/request-password-reset", verifyOtpPayload);
    
        
        const resetPasswordPayload = {
          email,
          codeOtp,
           password,
        };
    
        console.log("Enviando nova senha para /reset-password:", resetPasswordPayload);
    
        await axios.post("http://192.168.5.22:3000/api/auth/reset-password", resetPasswordPayload);
    
        Alert.alert("Sucesso", "Senha redefinida com sucesso!");
        setIsReset(true);
      } catch (error: any) {
        console.error("Erro ao redefinir senha:", error);
        Alert.alert("Erro", error.response?.data?.message || "Erro ao redefinir senha.");
      } finally {
        setLoading(false);
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

            <ResetPasswordInput
              label="Password"
              value={password}
              setPassword={setPassword}
            />
            <ResetPasswordInput
              label="Confirm Password"
              value={confirmPassword}
              setPassword={setConfirmPassword}
            />

            {password !== confirmPassword && confirmPassword.length > 0 && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleReset}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Aguarde..." : "Reset"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.successMessage}>
              Password reset successfully!
            </Text>

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Go to Login</Text>
            </TouchableOpacity>
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
