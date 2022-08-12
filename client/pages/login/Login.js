import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';
import 'react-native-gesture-handler';

import Header from '../../components/Header';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button, colors} from 'react-native-elements'
import { parameters } from '../../global/styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { Modal, Portal, Provider } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";

import email from 'react-native-email'

export default function Login({navigation}){
const [emai,setEmail]=useState("");
const [emailpass,setEmailPass]=useState("");

const [pass,setPass]=useState("");
const[open,setOpen]=useState(false);
const[open2,setOpen2]=useState(true);
const [visible, setVisible] = React.useState(false);
const containerStyle = {backgroundColor: 'white', padding: 20};
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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
      
        Alert.alert("🔐 Loged in Successfully","Hello: "+emai)
 


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
      Alert.alert("📢 Loged in Failed","Please be sure of the entered email and password")

			
			
		
   
}
}
async function handleforget(){
  //Alert.alert(emailpass)
  const y=uuidv4();
  
  const response = await fetch('http://10.0.2.2:3001/resetpassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      
      email:emailpass,
      password:y,
      
    }),

  })
  


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

               <Text
               style={{margin:20,fontSize:18,color:'grey',textDecorationLine:'underline'}}
               onPress={showModal}
               >Forgot password ?</Text>
             
               <View style={{margin:30,padding:20}}>
               <Button
              onPress={handlesign}
  
  title="Sign in"
  buttonStyle={parameters.styledButton}
  titleStyle={parameters.buttonTitle}
  
  

 
/>

               </View>
               <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={{fontSize:20,fontWeight:'700'}}>Please enter your email to receive your new password</Text>
          <TextInput
             placeholder='Enter your Email'
             style={styles.TextInput3}
             onChangeText={(Text)=>{setEmailPass(Text)}}
             value={emailpass}

             />

<Button
              onPress={handleforget}
  
  title="Send new password"
  buttonStyle={parameters.styledButton}
  titleStyle={parameters.buttonTitle}
  />
        </Modal>
      </Portal>
      </Provider>
               
        
    

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
  TextInput3:{
    borderWidth:1,
    borderColor:"grey",
    marginVertical:20,
    fontSize:20,
    borderRadius:15,
    
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
