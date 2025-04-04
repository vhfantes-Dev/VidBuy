import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   text:{
    padding:10,
    textAlign:'center'
   },
   iconArea:{
     flexDirection:'row',
     gap:10
   },
   button: {
    width: 60, 
    height: 60,
    borderRadius: 30, 
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5, 

   
    elevation: 8,
  },
});

export default styles