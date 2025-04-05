import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from "react";
import FormLogin from '../components/FormLogin/FormLogin'
import ArrowLeft from '../assets/icons/ArrowLeft'
import SocialMediaIcon from '../components/SocialMediaIcon/SocialMediaIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import axios from 'axios';


type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileSelect'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const response = await axios.post('http://10.0.2.2:3000/api/auth/login', {
        email,
        password,
      });

      console.log('Login sucesso:', response.data);
      Alert.alert('Sucesso', 'Login efetuado com sucesso!');
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Erro ao logar:', error.response?.data || error.message);
      Alert.alert('Erro no login', error.response?.data?.message || 'Verifique suas credenciais.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("ProfileSelect")}>
        <ArrowLeft></ArrowLeft>
      </TouchableOpacity>

      <Text style={styles.title}>VidBuy</Text>
      <Text>Please enter your information bellow</Text>

      <FormLogin email={email} setEmail={setEmail} password={password} setPassword={setPassword} />

      <TouchableOpacity style={styles.linkPassword} onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.TextPassword} >Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linkRegister} >
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
  linkPassword: { alignSelf: 'flex-end', color: '#3640e0', padding: 10 },
  linkRegister: { flexDirection: 'row', padding: 10 },
  TextRegister: { color: '#3640e0' },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 }
});