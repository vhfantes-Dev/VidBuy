import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./styles";

interface ResetFormProps {
  email: string;
  setEmail: (text: string) => void;
  onReset: () => void;
}

const ResetForm: React.FC<ResetFormProps> = ({ email, setEmail, onReset }) => (
  
  <View style={styles.formContainer}>

    <Text style={styles.title}>Forgot Password</Text>
    <Text style={styles.description}>
      We'll send you an email with a link to reset your password. Please enter your email here:
    </Text>

    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
    />

    <TouchableOpacity style={styles.button} onPress={onReset}>
      <Text style={styles.buttonText}>Reset</Text>
    </TouchableOpacity>
  </View>
);
export default ResetForm