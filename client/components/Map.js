import React ,{useState,useEffect}from 'react';
import { StyleSheet, ScrollView,Text, View,Dimensions,TouchableOpacity, Alert, Image } from 'react-native';
import {colors,parameters} from '../global/styles'
import { Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import Axios from 'axios'
import moment from 'moment'
import { getCurrentPositionAsync,PermissionStatus,useForegroundPermissions } from 'expo-location';
import MapView,{Marker} from 'react-native-maps';

require('moment-precise-range-plugin');

export default function MapLocation(){

const [email,setEmail]=useState('')

const [longitude,setLongitude]=useState()
const [latitude,setLatitude]=useState()
const [show,sethow]=useState(false)




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
  setEmail(datay.email);
 


} else

{
    alert("not user")
  
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
  const [locationPermissionInformation,requestPermission]=useForegroundPermissions();
  async function verifyPermission(){
    if(locationPermissionInformation.status===PermissionStatus.UNDETERMINED)
{
    const permissionResponse=await requestPermission();
    return permissionResponse.granted;
}
if(locationPermissionInformation.status===PermissionStatus.DENIED)
{
    Alert.alert("insufficient permissions","you need to grant location permissions")
return false;
}

return true;

  } 
  
  async function  handlegetLocation(){
    Alert.alert("g")
    const hasPermit=await verifyPermission();
    if(!hasPermit){
        return;

    }
    else{
    const location=await getCurrentPositionAsync();
    console.log(location.coords.latitude)
    console.log(location.coords.longitude)
    setLatitude(location.coords.latitude)
    setLongitude(location.coords.longitude)
    }

  }
 async function  handlepickMap(){
    
  }
  let locationpreviw=<Text>No location picked yet</Text>
  if(latitude){
    locationpreviw=(
        <MapView style={{width:'100%',height:'100%'}} >
             <Marker 
     
     coordinate={{ latitude : latitude , longitude : longitude }}
     pinColor="purple"
    
  
   />
    
            </MapView>


    )

  }
    return (<View style={{marginTop:30}} >
       
        <View style={{flexDirection:'row'}}>

            <Button title="🚀Locate Me" onPress={handlegetLocation}
             buttonStyle={{backgroundColor:'#5050E6',paddingHorizontal:15,margin:20}}
             titleStyle={{fontSize:20,fontWeight:'800'}}
             
             />
           
            
            <Button title="🗺Pick on Map" onPress={handlepickMap}
             buttonStyle={{backgroundColor:'#5050E6',paddingHorizontal:15,margin:20}}
             titleStyle={{fontSize:20,fontWeight:'800'}}
            
             />

           



        </View>
        <View style={styles.mapPreview}>
            {locationpreviw}
       


           </View> 
         
         


       

    </View>);
}
const styles = StyleSheet.create({
   mapPreview:{
    marginVertical:8,
    width:500,
    height:500,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#E2E0E0',
    borderRadius:10,
    
    


   },
   
  });