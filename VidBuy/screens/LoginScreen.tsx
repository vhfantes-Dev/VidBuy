import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from "react";
import EmailInput from '../components/FormLogin/FormLogin'
import ArrowLeft from '../assets/icons/ArrowLeft'
import SocialMediaIcon from '../components/SocialMediaIcon/SocialMediaIcon';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
      <ArrowLeft></ArrowLeft>
      </TouchableOpacity>

      <Text style={styles.title}>VidBuy</Text>
      <Text>Please enter your information bellow</Text>

      <EmailInput email={email} setEmail={setEmail} password={password} setPassword={setPassword} />

      <TouchableOpacity style={styles.linkPassword} onPress={handleLogin}>
        <Text style={styles.TextPassword} >Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linkRegister} >
      <Text>Don't have an account?</Text>
      <TouchableOpacity>
        <Text style={styles.TextRegister} > Register</Text>
      </TouchableOpacity>
      </View>

      <SocialMediaIcon></SocialMediaIcon>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 36, fontWeight: "bold", marginBottom: 20, color: '#3640e0' },
  button: { backgroundColor: "#3640e0", padding: 10, borderRadius: 8, marginTop: 10, width: 350, },
  buttonText: { color: "white", fontSize: 20, textAlign: 'center' },
  TextPassword: { color: '#3640e0' },
  linkPassword: { alignSelf: 'flex-end', color: '#3640e0', padding:10 },
  linkRegister:{flexDirection:'row',padding:10},
  TextRegister:{color: '#3640e0'},
  backButton: { position: "absolute", top: 40, left: 20,zIndex: 10}
});