import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,getDocs,getFirestore} from "firebase/firestore";
import db from "../Firebase";
import {Button} from 'react-native-elements'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import {colors,parameters} from '../global/styles'
export default function HomeHeader({navigation}){
    const  [notification,setNotification]=useState([]);
    const [employees,setEmployees]=useState([]);
    const[email,setEmail]=useState('')
    const notification2=[];
    const  [messages,setMessages]=useState([]);
    const messages2=[];
    const messages3=[];
    
    useEffect(()=>{
      let isMounted=true;
      if(isMounted)
     { Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
          setEmployees(response.data);
    
        })}
        return () => { isMounted = false }; // cleanup toggles value, if unmounted

     
    },[]);
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
  


    useEffect(
        () =>
              onSnapshot(collection(db, "notifications"), (snapshot) =>
              setNotification(snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()}) )))
          ,
        []
      );
      useEffect(
        () =>
              onSnapshot(collection(db, "messages"), (snapshot) =>
              setMessages(snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()}) )))
          ,
        []
      );

    //notifications

    notification.map(doc=>{
        const g=doc.Rec_email;
        
       
       if(g===email){
        notification2.push(doc);
       };
      })

    let counter =notification2.length;
    let msg;
    //messages
    messages.map(doc=>{
      const g=doc.receiverId;
      employees.map((val)=>{
        if(val._id===g){
          if(val.email===email){
            messages2.push(doc);
    
          }
    
        }
      })
     
    })
    messages2.map((val)=>{
      employees.map((val3)=>{
        if(val3._id===val.senderId){
          let data={
            'id':val.id,
            'name':val3.firstName+" "+val3.lastName,
            'message':val.msg,
          }
          messages3.push(data);
        }
    
      })
      
    })
     

    let counter2;
    counter2=messages2.length;
    let msg2;

    if(counter==0){
        msg=<View></View>

    }
    else{
        msg=<View style={styles.counter}><Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>{counter}</Text></View>

    }

    if(counter2==0){
        msg2=<View></View>

    }
    else{
        msg2=<View style={styles.counter2}><Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>{counter2}</Text></View>

    }



return ( 
<View style={styles.header}>
    <View style={{alignContent:'center',justifyContent:'center',marginLeft:15}}>
<Icon name='menu' size={32} color={colors.cardbackground}
onPress={()=>navigation.toggleDrawer()}
/>

    </View>
    <View >
<Text style={{color:colors.cardbackground,fontSize:23,fontWeight:'bold',marginTop:8,marginLeft:30}}>Blondy Company</Text>
    </View>
    <View style={{marginTop:5,marginLeft:40}}>
<Icon2 name='notifications'  size={32} color={colors.cardbackground}
onPress={()=>navigation.navigate("Notifications")}
/>

    </View>
    {msg}
   
    <View style={{marginTop:6,marginLeft:15}}>
<Icon3 name='message-square' 
onPress={()=>navigation.navigate("Messages")}
size={32} color={colors.cardbackground}/>

    </View>
    {msg2}
           
       

    </View>
   );
}
const styles = StyleSheet.create({
    header: {
     
      backgroundColor: colors.buttons,
      height:parameters.headerHeight,
      flexDirection:'row',
   
    },
    counter:{
        width: 21,
        height: 21,
        backgroundColor: 'red',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        borderRadius:100,
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        right:65,

    },
    counter2:{
        width: 21,
        height: 21,
        backgroundColor: 'red',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        borderRadius:100,
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        right:18,

    },
  });

  


