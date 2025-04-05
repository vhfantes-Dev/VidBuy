import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  const handlePress = () => {
    Alert.alert('Bem-vindo!', 'Você está na Home!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home</Text>
      <Text style={styles.subtitle}>Welcome Intp Aplication!</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3640e0',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3640e0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
