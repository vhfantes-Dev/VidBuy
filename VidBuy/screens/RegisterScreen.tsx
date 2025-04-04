import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import FormRegister from '../components/FormRegister/FormRegister'
import ArrowLeft from '../assets/icons/ArrowLeft'
import SocialMediaIcon from '../components/SocialMediaIcon/SocialMediaIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileSelect'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login') }>
      <ArrowLeft></ArrowLeft>
      </TouchableOpacity>

      <Text style={styles.title}>VidBuy</Text>
      <Text>Please enter your information bellow</Text>

      <FormRegister name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OTP')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.linkRegister} >
      <Text>Already have an account?</Text>
        <Text style={styles.TextRegister} > log in</Text>
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
  linkRegister:{flexDirection:'row',padding:10},
  TextRegister:{color: '#3640e0'},
  backButton: { position: "absolute", top: 40, left: 20,zIndex: 10},

});