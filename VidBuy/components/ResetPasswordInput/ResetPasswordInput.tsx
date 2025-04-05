import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import EyePassword from "../../assets/icons/EyePassword";
import styles from './styles'

interface PasswordInputProps {
  label: string;
  value: string;
  setPassword: (password: string) => void;
}

const ResetPasswordInput: React.FC<PasswordInputProps> = ({ label, value, setPassword }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);

  const validatePassword = (text: string) => {
    setPassword(text);
    setIsPasswordStrong(text.length >= 8);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={!isVisible}
          value={value}
          onChangeText={validatePassword}
        />
        <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(!isVisible)}>
          <EyePassword />
        </TouchableOpacity>
      </View>
      {!isPasswordStrong && <Text style={styles.errorText}>Password must be at least 8 characters long</Text>}
    </View>
  );
};

export default ResetPasswordInput;

