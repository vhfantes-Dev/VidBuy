import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import EyePassword from "../../assets/icons/EyePassword";
import styles from "./styles";

interface EmailInputProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
  }

export default function EmailInput({ email, setEmail, password, setPassword }: EmailInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Text>Email</Text>
      <TextInput 
        placeholder="Enter your email here" 
        keyboardType="email-address" 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
      />

      <Text>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Enter your password here" 
          secureTextEntry={!isVisible} 
          style={styles.inputField} 
          value={password} 
          onChangeText={setPassword} 
        />
        <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(!isVisible)}>
          <EyePassword />
        </TouchableOpacity>
      </View>
    </View>
  );
}