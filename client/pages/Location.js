import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
import { StyleSheet,ScrollView, Text, View,Animated,Modal,Alert,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import{colors} from "../global/styles"
import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import moment, { preciseDiff } from 'moment';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import Icon4 from 'react-native-vector-icons/AntDesign';
import MapView,{Marker,Circle} from 'react-native-maps';
import {reverseGeocodeAsync} from 'expo-location';

import { acc } from 'react-native-reanimated';
let locations=[];
export default function Location({ route, navigation }){
  const { location } = route.params;
  const [address,setDisplayCurrentAddress]=useState("")

async function getAdddress(latitude,longitude){
  try
   { let response = await reverseGeocodeAsync({
    latitude,
    longitude
    });
    for (let item of response) {
      let addressg = `${item.name},postal code: ${item.postalCode},City: ${item.city}`;
     console.log(addressg)
      setDisplayCurrentAddress(addressg);
    }

  

  }
    catch(error){
      console.log(error)
    }
}
  location.map((val)=>{
    let latitude=val.latitiude;
    let longitude=val.longitude;

    getAdddress(latitude,longitude)
    const y={ "latitiude" :val.latitiude ,
    "longitude" : val.longitude,
  'address':address,
  };

    locations.push(y)
   
  })
return ( 
 
       <View>
      
     
  <View style={styles.mapPreview}>
            

        
        <MapView style={{width:'100%',height:'100%'}} 
        
   
        >
          {locations.map((val)=>{
            return(
              <Marker key={uuidv4()}
              title={val.address}
              description="Address"

             
              coordinate={{ latitude :val.latitiude , longitude : val.longitude }}

              >

         
              </Marker>
            );
          })}
          
        
          
   

    
            </MapView>


    

  


           </View>  
           
  



   
           </View>
          
   
           
          
   
   );
}

const styles = StyleSheet.create({
   container: {
     
     flexDirection:'row',
     
     marginVertical:5,
     paddingVertical:10,
    
     borderColor:'grey',
     backgroundColor:'#FFC300',
     borderRadius:10,
 
     
  
   },
   text:{
     fontSize:18,
     fontWeight:'bold',
     margin:15,
     
     
 
   },
   text2:{
    fontSize:15,
    fontWeight:'bold',
    margin:7,
    
    

  },
   textjj:{
     fontSize:20,
     fontWeight:'bold',
     margin:12,
     marginLeft:20
 
   },
   textIcon2:{
     fontSize:20,
     fontWeight:'bold',
     margin:15,
     borderRadius:100,
     borderWidth:1,
     color:colors.buttons,
 
   },
   textIcon:{
     marginLeft:10,
     marginTop:10,
     marginRight:10,
 
   },
   modalBackGround: {
     flex: 1,
     backgroundColor: 'rgba(0,0,0,0.5)',
     justifyContent: 'center',
     alignItems: 'center',
   },
   modalContainer: {
     width: '80%',
     backgroundColor: 'white',
     paddingHorizontal: 20,
     paddingVertical: 30,
     borderRadius: 20,
     elevation: 20,
   },
   header: {
     width: '100%',
     height: 40,
     alignItems: 'flex-end',
     justifyContent: 'center',
   },
  
 });
 
