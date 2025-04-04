import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    option: {
      padding: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginVertical: 8,
      width:350,
      height:150,
      alignItems: 'center',
      justifyContent:"center"
    },
    selected: {
      backgroundColor: '#007bff22',
      borderColor: '#007bff',
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign:"center"
    },
    subtext:{
    fontSize: 14,
    },
    iconContainer: {
      justifyContent:"center",
      marginRight: 10,
      width: 82,
      height: 82,
    },
    content:{
      flexDirection:"row",
    },
    textContainer:{
      flex: 1,
      justifyContent:"center"
    }
  });
  export default styles