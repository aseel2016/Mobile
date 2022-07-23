import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';

import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,getDocs,getFirestore} from "firebase/firestore";
import db from "../Firebase";
export default function Messages({ navigation }){
    const  [notification,setNotification]=useState([]);
    const [employees,setEmployees]=useState([]);
    const[email,setEmail]=useState('')
    const notification2=[];
    const  [messages,setMessages]=useState([]);
    const messages2=[];
    const messages3=[];
    
    useEffect(()=>{
      Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
          setEmployees(response.data);
    
        })
     
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
              onSnapshot(collection(db, "messages"), (snapshot) =>
              setMessages(snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()}) )))
          ,
        []
      );

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
     

  

return ( 
<View >
      <Text>{email}</Text>
       

    </View>
   );
}


