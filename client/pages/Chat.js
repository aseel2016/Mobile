import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text,TouchableOpacity, View,ScrollView,Alert,Dimensions,TextInput} from 'react-native';

import HomeHeader from '../components/HomeHeader';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {
  Avatar,Button
}from 'react-native-elements'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { colors } from '../global/styles';
let employe=[];
let idMe;
export default function Chat({navigation}){
  const [emai,setEmail]=useState("");
  const [employees,setEmployees]=useState([]);
  const [clocks,setClocks]=useState([])
const [date,setDate]=useState();
  const [show,setShow]=useState(false);
  const [search,setSearch]=useState("");



  employe=[];

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
   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
        setEmployees(response.data);
  
      })
   
  },[]);
employees.map((val)=>{
if(val.email!==emai){

 employe.push({'id':val._id,'image':val.image,
 'name':val.firstName+" "+val.lastName

})

}
})
employees.map((val)=>{
  if(val.email===emai){
  
  idMe=val._id;
  
  }
  })

return ( 
<View >

    <HomeHeader navigation={navigation}/>
  <View style={{alignItems:'center',
      justifyContent:'center',
      alignContent:'center',padding:20,backgroundColor:"#F7E749"}}>
  <Text style={{alignItems:'center',
      justifyContent:'center',
      alignContent:'center',fontSize:25,fontWeight:'bold',color:'grey'}}>Contacts</Text>
  </View>
  <TextInput placeholder='search' 
  onChangeText={(e)=>setSearch(e)}

  style={{fontSize:20,padding:10,margin:10}}/>
  <ScrollView style={{width:'100%'}}>
    
    
  <View>
    {
      employe.map((val)=>{
        if(search!=""){
        if((val.name).includes(search)){

          return (
            <View  key={val.id}>
         <TouchableOpacity 
         onPress={()=>navigation.navigate("Messenger",{id:val.id,idMe:idMe})}
         style={{flexDirection:'row',margin:20}}>
           <Avatar
    rounded
    avatarStyle={{ borderWidth:2,
      borderColor:"white"}}
    size={50}
    source={{uri:val.image}}

    />
    <Text style={{margin:10,fontSize:18,fontWeight:'bold'}}>{val.name}</Text>
    </TouchableOpacity>
         
          </View>
          );
        }}
        else{
          return (
            <View  key={val.id}>
         <TouchableOpacity 
         onPress={()=>navigation.navigate("Messenger",{id:val.id,idMe:idMe})}
         style={{flexDirection:'row',margin:20}}>
           <Avatar
    rounded
    avatarStyle={{ borderWidth:2,
      borderColor:"white"}}
    size={50}
    source={{uri:val.image}}

    />
    <Text style={{margin:10,fontSize:18,fontWeight:'bold'}}>{val.name}</Text>
    </TouchableOpacity>
         
          </View>
          );

        }
        
      })
    }

  </View>
  </ScrollView>
      

       


    </View>
   );
}


