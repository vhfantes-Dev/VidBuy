import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import ArrowLeft from '../assets/icons/ArrowLeft'
import ResetForm from '../components/ResetForm/ResetForm'
import SuccesReset from '../components/ResetForm/SuccessReset/SuccesReset'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileSelect'>;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleReset = () => {
    setIsSent(true);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("ProfileSelect")}>
      <ArrowLeft></ArrowLeft>
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
     zIndex: 10
    },
});

export default ForgotPasswordScreen;
