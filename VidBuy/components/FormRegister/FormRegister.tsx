import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import EyePassword from "../../assets/icons/EyePassword";
import styles from "./styles";

interface EmailInputProps {
    name: string,
    setName: (email: string) => void,
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void;
}

export default function EmailInput({ name, setName, email, setEmail, password, setPassword }: EmailInputProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordStrong, setIsPasswordStrong] = useState(true);

    const validateEmail = (text: string) => {
        setEmail(text);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text));
    };

    const validatePassword = (text: string) => {
        setPassword(text);
        setIsPasswordStrong(text.length >= 8);
    };

    return (
        <View style={styles.container}>
            <Text>Name</Text>
            <TextInput
                placeholder="Enter your name here"
                style={styles.Nameinput}
                value={name}
                onChangeText={setName}
            />

            <Text>Email</Text>
            <TextInput
                placeholder="Enter your email here"
                keyboardType="email-address"
                style={[styles.emailInput, !isEmailValid && styles.errorInput]}
                value={email}
                onChangeText={validateEmail}
            />
            {!isEmailValid && <Text style={styles.errorText}>Invalid email format</Text>}
            <Text>Password</Text>
            <View style={styles.passwordInputContainer}>
                <TextInput
                    placeholder="Enter your password here"
                    secureTextEntry={!isVisible}
                    style={[styles.passwordInputField, !isPasswordStrong && styles.errorInput]}
                    value={password}
                    onChangeText={validatePassword}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(!isVisible)}>
                    <EyePassword />
                </TouchableOpacity>
            </View>
            {!isPasswordStrong && <Text style={styles.textLengthPassword}>Must be at least 8 characters</Text>}
        </View>
    );
}