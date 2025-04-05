import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import ArrowLeft from '../assets/icons/ArrowLeft';
import ResetForm from '../components/ResetForm/ResetForm';
import SuccesReset from '../components/ResetForm/SuccessReset/SuccesReset';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileSelect'>;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleReset = async () => {
    try {
      const response = await axios.post('https://vidbuy-5u3u.onrender.com/api/auth/send-otp', {
        email,
      });

      

      await AsyncStorage.setItem("otp_email", email);

      console.log("OTP enviado e salvo com sucesso:", response.data);
      setIsSent(true);
    } catch (error: any) {
      console.error("Erro ao enviar OTP:", error);
      Alert.alert("Error", error?.response?.data?.message || "Error sending code");
    }
  };

  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => {
        navigation.navigate("OTP");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSent, navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
        <ArrowLeft />
      </TouchableOpacity>
      {isSent ? <SuccesReset /> : <ResetForm email={email} setEmail={setEmail} onReset={handleReset} />}
    </View>
  );
};

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
    zIndex: 10,
  },
});

export default ForgotPasswordScreen;
