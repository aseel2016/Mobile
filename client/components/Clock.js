import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity, Alert } from 'react-native';
import {colors,parameters} from '../global/styles'
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import Axios from 'axios'
import moment from 'moment'
import {reverseGeocodeAsync} from 'expo-location';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
require('moment-precise-range-plugin');
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
import { getCurrentPositionAsync,PermissionStatus,useForegroundPermissions } from 'expo-location';
import MapView,{Marker,Circle} from 'react-native-maps';
import { Polyline } from 'react-native-maps';
let locations=[{}];
export default function Clock(){
const [inClock,setClock]=useState(false);
const[hours,setHours]=useState(0);
const[minutes,setMinutes]=useState(0);
const[seconds,setSeconds]=useState(0);
const [email,setEmail]=useState('')
const [clocks,setClocks]=useState([])
const [clocked,setClocked]=useState(false)
const [Address,setAddress]=useState("No location is picked yet")
const [locationPermissionInformation,requestPermission]=useForegroundPermissions();



const [longitude,setLongitude]=useState()
const [latitude,setLatitude]=useState()
const [show,setShow]=useState(false)
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

async function getAdddress(latitude,longitude){
  try
   { let response = await reverseGeocodeAsync({
    latitude,
    longitude
    });
    for (let item of response) {
      let addressg = `${item.name},postal code: ${item.postalCode},City: ${item.city}`;
     console.log(addressg)
      setAddress(addressg);
    }

  

  }
    catch(error){
      console.log(error)
    }
}
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
 
  const getData2 = async () => {
  
       
        
        const response =  await fetch('http://10.0.2.2:3001/find_clock', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  
 email:email,
 
}),

})

const datay =  await response.json()

if (datay.user) { 
  const y=moment();
  const y2=moment(datay.clockin)
  const y3=moment.preciseDiff(y,y2,true);
  const s=y3['hours']*60*60+y3['minutes']*60+y3['seconds']
  setSeconds(s)
  setClock(true)
  if(verifyPermission())
  {
  const locationNew=await getCurrentPositionAsync();
  console.log(locationNew.coords.latitude)
  console.log(locationNew.coords.longitude)
  setLatitude(locationNew.coords.latitude)
  setLongitude(locationNew.coords.longitude)
  if(locationNew.coords.latitude && locationNew.coords.longitude  )

  {

    setShow(true)
    getAdddress(locationNew.coords.latitude,locationNew.coords.longitude )

    

   
  }

 


  }

  




} else

{
  setSeconds(0)
  setClock(false)
  setAddress("No location picked ")
  setShow(false)
  
  
}

        


    
  }
  getData2()
  

const padTTwo=(number)=>(number <=9 ? `0${number}`:number);

const displayTime=(seconds)=>{
    let minute=0;
    let hour=0;
    if(seconds<0){
        seconds=0

    }
    if(seconds<60){
return `00:00:${padTTwo(seconds)}`
    }
    let remainSeconds=seconds%60;
    
    minute=(seconds-remainSeconds)/60

if(minute<60){
return `00:${padTTwo(minute)}:${padTTwo(remainSeconds)}`
    }
    let remainminutes=minute%60;
    
    hour=(minute-remainminutes)/60
 
    return `${padTTwo(hour)}:${padTTwo(remainminutes)}:${padTTwo(remainSeconds)}`

}


      
  

async function handleclock(){
    setClock(!inClock)
    if(!inClock){
      const hasPermit=await verifyPermission();
  if(!hasPermit){
      return;

  }
  else{
  const location=await getCurrentPositionAsync();
  const inC =moment();
  console.log(location.coords.latitude)
  console.log(location.coords.longitude)
  setLatitude(location.coords.latitude)
  setLongitude(location.coords.longitude)
  if(location.coords.latitude && location.coords.longitude  ){
    setShow(true)
    getAdddress(location.coords.latitude,location.coords.longitude )
    
    const response = await fetch('http://10.0.2.2:3001/insert_clock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:email,
        Clockin:inC,
        location:
        {'longitude':location.coords.longitude,'latitiude':location.coords.latitude},
       
  
      }),
  
    })
  
  
    

  

  }
  }
     
  



  

  }
  if(inClock){
    
      const outC=moment()
      setAddress("No location is picked")
      
      const response = await fetch('http://10.0.2.2:3001/update_clock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email:email,
      Clockout:outC,
    }),

  })


  }
 
  
   
}
useEffect(()=>{
  let isMounted=true;
  let interval=null;
  if(isMounted){
  if(inClock){
  
    interval=setInterval(()=>{
        setSeconds(seconds+1)
        displayTime(seconds)
        if(seconds>=54000){
          setClock(false)
          setSeconds(0)
          //send notification you are 
          //in from 15 hours clocked out automaticaly
          const data = {
            message:"You have clocked in for 15 hours,we clocked you out automatically",
            Rec_email:email
          };
          
          setDoc(doc(db,"notifications",uuidv4()),data);



      }
},1000)

  }
  else{
    
    clearInterval(interval)
    setSeconds(0)
   
 


  }
}
  return ()=>{clearInterval(interval); isMounted = false}

},[seconds,inClock])

  
let locationpreviw=<Text style={{fontSize:20,fontWeight:'800',marginRight:80}}>No location picked yet</Text>
if(latitude && show){
  locationpreviw=(
      <MapView 
      style={{width:'100%',height:'100%'}}

      showsUserLocation={true}
      onUserLocationChange={(E)=>{console.log("locationchanged",E.nativeEvent.coordinate)
     setLongitude(E.nativeEvent.coordinate.longitude)
     setLatitude(E.nativeEvent.coordinate.latitude)
     if(inClock){
      setLongitude(E.nativeEvent.coordinate.longitude)
      setLatitude(E.nativeEvent.coordinate.latitude)
      getAdddress(E.nativeEvent.coordinate.latitude,E.nativeEvent.coordinate.longitude )

      const response =  fetch('http://10.0.2.2:3001/update_location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         
          
          location:
          {'longitude':E.nativeEvent.coordinate.longitude,'latitiude':E.nativeEvent.coordinate.latitude},
         
    
        }),
    
      })
     }

     
     
 
    
    }}
      >
        
          
            <Marker 
   
            coordinate={{ latitude : latitude , longitude :longitude }}/>
         
           
          
      
          
          </MapView>


  )

}


    return (<View >
<View style={{margin:40,alignItems:'center'}}>
    <Text style={{fontSize:50,fontWeight:'bold'}}>{displayTime(seconds)}</Text>

   
</View>

       <TouchableOpacity>
        <View >
           

        <Button 
        buttonStyle={{borderRadius:100,margin:20,padding:10,marginTop:50,backgroundColor:inClock?'#FF5733':'#FFC300'}}
        titleStyle={{fontSize:25,fontWeight:'bold'}}
        title={inClock?'Clock out':'Clock in'} 
        onPress={handleclock}
        />
        </View>
       </TouchableOpacity>
       <View>
       <Text style={{backgroundColor:'#D8D5D5',borderWidth:1,
       fontSize:28,fontWeight:'800',padding:20,color:colors.buttons}}>🌍 Location</Text>
       </View>

       <View>
        <Text style={{margin:20,fontSize:20,
          fontWeight:'bold',color:'purple'}}>🗺Address: {Address}</Text>
       </View>
       <View style={styles.mapPreview}>
            {locationpreviw}
       


           </View> 
         
       

    </View>);
}
const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      backgroundColor: colors.buttons,
      height: parameters.headerHeight,
      justifyContent: 'center',
    },
    Title:{
        fontSize:22,
        color:colors.headerText,
        marginTop:13,
        fontWeight:"bold",
        

    },
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