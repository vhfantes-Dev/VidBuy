import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import OTPInput from "../components/OTPInput/OTPInput";
import ArrowLeft from '../assets/icons/ArrowLeft'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileSelect'>;
};

type OTPVerificationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "OTP">;
};

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({ navigation }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleConfirm = () => {
    const enteredOTP = otp.join("");
    console.log("OTP Entered:", enteredOTP);
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login') }>
      <ArrowLeft></ArrowLeft>
      </TouchableOpacity>

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Please enter your 4-digit code sent to your email.</Text>

      <OTPInput value={otp} setValue={setOtp} />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn't receive the OTP?{" "}
        <Text style={styles.resendLink} onPress={() => console.log("Resend OTP")}>
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
  backText: {
    fontSize: 24,
    color: "#000",
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
    width: 250
  },
  confirmText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:'center'
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
