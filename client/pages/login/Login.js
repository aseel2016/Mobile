import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';
import 'react-native-gesture-handler';

import Header from '../../components/Header';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import { parameters } from '../../global/styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  

export default function Login({navigation}){
const [emai,setEmail]=useState("");
const [pass,setPass]=useState("");
const[open,setOpen]=useState(false);
const[open2,setOpen2]=useState(true);
const handllremote=()=>{
  setOpen(!open)
  setOpen2(!open2)
}
const myIcon = <Icon style={{marginRight:15}} name="lock" size={30} color="grey" />;
const myIcon2 = <Icon2 onPress={handllremote} style={{marginRight:10}} name="visibility-off" type="material" size={30} color="grey" />;
const myIcon3 = <Icon2 onPress={handllremote} style={{marginRight:10}} name="visibility" type="material" size={30} color="grey" />;

async function  handlesign(event){
 
	const response = await fetch('http://10.0.2.2:3001/loginEmployee', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				
				email:emai,
				password:pass,
				
			}),

		})
		
		const data = await response.json()

		if (data.user) {
      try{
        await  AsyncStorage.setItem('Mobile', data.token);
      
        Alert.alert("successfully logged in")
 


      }
      catch(e){

      }
      

      navigation.navigate("DawNav")
     
     

	
			  
			
 
			{/**Alert.alert("success"+data.token)
       navigation.navigate("DawNav");
      			   setCookie("token", data.token);
			  window.location.href = '/'; window.location.href = '/'
}*/}
	
		} else

		{
      Alert.alert("failhhh")
			
			
		
   
}
}

return ( 
<View style={styles.container}>
           <Header title="Login to your Account" />
          <View>
             <TextInput
             placeholder='Enter your Email'
             style={styles.TextInput1}
             onChangeText={(Text)=>{setEmail(Text)}}
             value={emai}

             />
               </View>

            <View style={styles.TextInput2}>
              <Animatable.View>
            {myIcon}
               </Animatable.View>
               
               <TextInput
             
               style={{width:'80%'}}
             placeholder='Enter your password'
             secureTextEntry={open2}
             onChangeText={(Text)=>{setPass(Text)}}
             value={pass}

            
             />
               <Animatable.View>

               {open?(myIcon3):(myIcon2)}
           
               </Animatable.View>

               </View>
             
               <View style={{margin:30,padding:20}}>
               <Button
              onPress={handlesign}
  
  title="Sign in"
  buttonStyle={parameters.styledButton}
  titleStyle={parameters.buttonTitle}
  
  

 
/>
              
               </View>
               
        
    

    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  TextInput1:{
    borderWidth:1,
    borderColor:"#86939e",
    margin:20,
    fontSize:20,
    borderRadius:15,
    marginTop:80,
    padding:10,
    paddingLeft:15,
  },
  TextInput2:{
    borderWidth:1,
    borderColor:"#86939e",
    margin:20,
    marginTop:30,
    borderRadius:15,
    fontSize:20,
    flexDirection:"row",
    justifyContent:'space-between',
    padding:10,
    alignContent:'center',
    alignItems:'center',
    paddingLeft:15,

    
  }
});
