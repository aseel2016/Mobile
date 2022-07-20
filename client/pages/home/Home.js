import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, Text,ScrollView, View,Alert,Dimensions,TextInput} from 'react-native';

import HomeHeader from '../../components/HomeHeader';
import Clock from '../../components/Clock';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import { colors, parameters } from '../../global/styles';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import MapLocation from '../../components/Map';
export default function Home({navigation}){
  
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

 
 
    
return ( 
<View >
       <HomeHeader navigation={navigation} />
      <ScrollView>
       <View>
       <Text style={{backgroundColor:'#D8D5D5',borderWidth:1,
       fontSize:28,fontWeight:'800',padding:20,color:colors.buttons}}>⏰ Attendance</Text>
       </View>
       <Clock />
       <View>
       <Text style={{backgroundColor:'#D8D5D5',borderWidth:1,
       fontSize:28,fontWeight:'800',padding:20,color:colors.buttons}}>🌍 Location</Text>
       </View>
       <View>
        <MapLocation  />
       
       </View>
       </ScrollView>




    </View>
   );
}


