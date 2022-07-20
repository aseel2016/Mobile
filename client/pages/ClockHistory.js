import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';

import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';

export default function ClockHistory({navigation}){
   const [emai,setEmail]=useState("");
   const [employees,setEmployees]=useState([]);
   const [clocks,setClocks]=useState([])
   let clocksAll=[];

   


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
          navigation.navigate("Signin")
        }
      } catch(e) {
        // error reading value
        alert("wrong")
      }
    }
    
    getData()

    const getData2 = async () => {
      try {
          useEffect(()=>{
              Axios.get('http://10.0.2.2:3001/getClock').then((response)=>{
                  setClocks(response.data);
            
                })
                
                clocks.map((val)=>{
                  if(val.email===emai){
                     let y={
                        'clockin':val.Clockin,
                        'clockout':val.Clockout,

                     }
                     clocksAll.push(y)



          }})
               
      
             
          })
        
          
        
        }
       catch(e) {
        // error reading value
        alert("wrong")
      }
    }
    getData2()

return ( 
<View >
       <HomeHeader navigation={navigation}/>
       <Text>History clock</Text>



    </View>
   );
}


