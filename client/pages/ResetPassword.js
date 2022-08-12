import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';

import HomeHeader from '../components/HomeHeader';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import moment from 'moment'
import { parameters } from '../global/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';


export default function Reset({navigation}){

    const [emai,setEmail]=useState("");
    const [employees,setEmployees]=useState([]);
  
  const [pass,setPass]=useState("");
  const [passold,setPassold]=useState("");

  const[open,setOpen]=useState(false);
  const[open2,setOpen2]=useState(true);

  const[open3,setOpen3]=useState(false);
  const[open4,setOpen4]=useState(true);
  const handllremote=()=>{
    setOpen(!open)
    setOpen2(!open2)
  }

  const handllremote2=()=>{
    setOpen3(!open3)
    setOpen4(!open4)
  }
  const myIcon = <Icon style={{marginRight:15}} name="lock" size={30} color="grey" />;
  const myIcon2 = <Icon2 onPress={handllremote} style={{marginRight:10}} name="visibility-off" type="material" size={30} color="grey" />;
  const myIcon3 = <Icon2 onPress={handllremote} style={{marginRight:10}} name="visibility" type="material" size={30} color="grey" />;
  const myIcon22 = <Icon2 onPress={handllremote2} style={{marginRight:10}} name="visibility-off" type="material" size={30} color="grey" />;
  const myIcon33 = <Icon2 onPress={handllremote2} style={{marginRight:10}} name="visibility" type="material" size={30} color="grey" />;
  

    const getData = async () => {
        try {
          const  value = await AsyncStorage.getItem('Mobile')
          if(value !== null) {
           
            
            const response =  await fetch('http://10.0.2.2:3001/check3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      
     value,
     
      
    }),
   
   })
   
   const datay =  await response.json()
   
    if (datay.user) { 
     setEmail(datay.email)
     
     
    } else
   
    {
      
    }
   
            
   
   
          }
          else{
            
          }
        } catch(e) {
          // error reading value
          alert("wrong")
        }
      }
      
      getData()

      async function  handlereset(){

        const response2 = await fetch('http://10.0.2.2:3001/checkPassword', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              
              email:emai,
              password:passold,
              
          }),

      })

      const datay =  await response2.json()

      if (datay.user) { 

        const response = await fetch('http://10.0.2.2:3001/updatePassword', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              
              email:emai,
              password:pass,
              
          }),

      })

      Alert.alert("🔑Password reset successfully","Your password was reset successfully")
      
      
       
       
       
      } else
      {
        Alert.alert("Wrong old Password")

      }
 
   
      
            
       
    
    }
return ( 
<View >
       <HomeHeader navigation={navigation} />
       <View style={{margin:20,flexDirection:'row'}}>
       <TextInput    
             style={{width:'80%'}}
           placeholder='Enter your old password'
           secureTextEntry={open4}
           onChangeText={(Text)=>{setPassold(Text)}}
           value={passold}

          
           />
            <Animatable.View>

{open?(myIcon33):(myIcon22)}

</Animatable.View>
       </View>
       <View style={{margin:20,flexDirection:'row'}}>
     
       <TextInput    
             style={{width:'80%'}}
           placeholder='Enter your new password'
           secureTextEntry={open2}
           onChangeText={(Text)=>{setPass(Text)}}
           value={pass}

          
           />
            <Animatable.View>

{open?(myIcon3):(myIcon2)}

</Animatable.View>


       </View>
       <BarPasswordStrengthDisplay
          password={pass}
          labelStyle={{fontSize:18,marginLeft:-20}}
        />
       <View style={{margin:30,padding:20}}>
               <Button
              onPress={handlereset}
  
  title="Reset Password"
  buttonStyle={parameters.styledButton}
  titleStyle={parameters.buttonTitle}
  
  

 
/>
              
               </View>
       


    </View>
   );
}


