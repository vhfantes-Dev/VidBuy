import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import FormRegister from '../components/FormRegister/FormRegister';
import ArrowLeft from '../assets/icons/ArrowLeft';
import SocialMediaIcon from '../components/SocialMediaIcon/SocialMediaIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OneSignal} from 'react-native-onesignal';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileSelect'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userType = await AsyncStorage.getItem('userType');

      if (!userType) {
        Alert.alert('Error', 'User type not selected.');
        return;
      }

      const response = await axios.post('http://192.168.5.22:3000/api/auth/register', {
        name,
        email,
        password,
        type: userType,
      });

      OneSignal.login(email); 

      await AsyncStorage.removeItem('userType');
      Alert.alert('Sucess', 'Registration completed successfully!');
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      Alert.alert('Error', error?.response?.data?.message || 'Error registering.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <ArrowLeft />
      </TouchableOpacity>

      <Text style={styles.title}>VidBuy</Text>
      <Text>Please enter your information below</Text>

      <FormRegister
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.linkRegister}>
        <Text>Already have an account?</Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
        <Text style={styles.TextRegister}> log in</Text>
        </TouchableOpacity>
      </View>

      <SocialMediaIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 20, color: '#3640e0' },
  button: {
    backgroundColor: '#3640e0',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 350,
  },
  buttonText: { color: 'white', fontSize: 20, textAlign: 'center' },
  linkRegister: { flexDirection: 'row', padding: 10 },
  TextRegister: { color: '#3640e0' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
});
