import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import OTPInput from "../components/OTPInput/OTPInput";
import ArrowLeft from '../assets/icons/ArrowLeft';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'OTP'>;
};

const OTPVerificationScreen = ({ navigation }: Props) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("otp_email");
        if (storedEmail) {
          setEmail(storedEmail);
        } else {
          Alert.alert("Erro", "E-mail não encontrado. Volte e tente novamente.");
          navigation.navigate("ForgotPassword");
        }
      } catch (err) {
        console.error("Erro ao buscar e-mail do AsyncStorage:", err);
        Alert.alert("Erro", "Não foi possível recuperar o e-mail.");
      }
    };

    fetchEmail();
  }, []);

  const handleConfirm = async () => {
    const code = otp.join("");

    console.log("otp array:", otp);
    console.log("Código gerado:", code);

    if (code.length !== 4 || otp.includes("")) {
      Alert.alert("Erro", "Digite os 4 dígitos do código.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://192.168.5.22:3000/api/auth/verify-otp", {
        email,
        code,
      });

      console.log("Verificação bem-sucedida:", response.data);
      Alert.alert("Success", "Code verified successfully!");

      await AsyncStorage.setItem("resetCode", code);

      const savedCode = await AsyncStorage.getItem("resetCode");
      console.log("resetCode salvo no AsyncStorage:", savedCode);

      navigation.navigate("ForgotPassword");
    } catch (error: any) {
      console.error("Erro ao verificar OTP:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to verify code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const resend = await axios.post("http://192.168.5.22:3000/api/auth/send-otp", {
        email,
      });

      console.log("OTP reenviado:", resend.data);
      Alert.alert("Submited", "A new code has been sent to you.");
    } catch (error: any) {
      console.error("Erro ao reenviar OTP:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <ArrowLeft />
      </TouchableOpacity>

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Please enter your 4-digit code sent to your email.</Text>

      <OTPInput value={otp} setValue={setOtp} />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} disabled={loading}>
        <Text style={styles.confirmText}>{loading ? "Verifiyng..." : "Confirm"}</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn't receive the OTP?{" "}
        <Text style={styles.resendLink} onPress={handleResend}>
          Resend
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#3640e0",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    width: 250,
  },
  confirmText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
  },
  resendText: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
  },
  resendLink: {
    color: "#3640e0",
  },
});

export default OTPVerificationScreen;
