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
import io from 'socket.io-client/dist/socket.io'

import AsyncStorage from '@react-native-async-storage/async-storage';  
import { colors } from '../global/styles';
let employe=[];
let idMe;
let y=[];
let online=[];
let restEm=[];
export default function Chat({navigation}){
  const [emai,setEmail]=useState("");
  const [employees,setEmployees]=useState([]);
  const [clocks,setClocks]=useState([])
const [date,setDate]=useState();
  const [show,setShow]=useState(false);
  const [search,setSearch]=useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://10.0.2.2:8900");
  }, []);

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
    let isMounted=true;
    if(isMounted)

    {Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
        setEmployees(response.data);
  
      })}

      return () => { isMounted = false }

   
  },[]);


employees.map((val)=>{
  if(val.email===emai){
  
  idMe=val._id;
  
  }
  })
  
  useEffect(() => {
    let isMounted=true;
    if(isMounted)
   { socket.current.emit("addUser", idMe);
    socket.current.on("getUsers", (users) => {
   setOnlineUsers(users);

    });}
    return () => { isMounted = false }


    
  }, [idMe]);
  console.log(onlineUsers)

  employees.map((val)=>{
    let flag=false;
    if(val.email!==emai){
      onlineUsers.map((val3)=>{
        if(val3.userId ===val._id){
             flag=true
        }
      })
      if(flag===true){
        employe.push({'id':val._id,'image':val.image,
        'name':val.firstName+" "+val.lastName,
        'state':'online'
       
       })

      }
      else{
        employe.push({'id':val._id,'image':val.image,
        'name':val.firstName+" "+val.lastName,
        'state':'offline'
       
       })

      }
    
    
    
    
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
  <TextInput placeholder='search ...' 
  onChangeText={(e)=>setSearch(e)}

  style={{fontSize:20,padding:10,margin:10}}/>
  <ScrollView style={{width:'100%'}}>
    
    
  <View>
    {
      employe.map((val)=>{
        let y;
        if(val.state==="offline"){
          y= <View style={{width: 15,
            height: 15,
            borderRadius: 100,
            backgroundColor: 'red',
            }}>
              </View>

        }
        else if(val.state==="online"){
          y=<View style={{width: 15,
            height: 15,
            borderRadius: 100,
            backgroundColor: 'limegreen',
            }}>

          </View>

        }
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
   
    <Text style={{margin:10,fontSize:18,fontWeight:'bold'}}>{val.name}        {y} </Text>
\   
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
    <Text style={{margin:10,fontSize:18,fontWeight:'bold'}}>{val.name}   {y}</Text>
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


