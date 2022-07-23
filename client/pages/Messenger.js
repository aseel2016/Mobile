import React,{useState,useEffect,useRef,useCallback} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import HomeHeader from '../components/HomeHeader';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
let messages=[];

let othername;

let imageOther;
export default function Messenger({ route, navigation }){
    const { id,idMe } = route.params;
    const [messages2, setMessages2] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);
    const [employees,setEmployees]=useState([]);
    
    useEffect(()=>{
      Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
          setEmployees(response.data);
    
        })
     
    },[]);
  
      employees.map((val)=>{
        
          if(val._id===id){
           console.log(imageOther)
             othername=val.firstName+" "+val.lastName,
             imageOther=val.image;
         
 
         }
         })

   

 
    
   const getData2=async()=>{
    if(id!==null){
        try {
          const res = await Axios.get(
            `http://10.0.2.2:3001/find/${idMe}/${id}`
          );
          setCurrentChat(res.data)

          if(res.data==null){
            try {
              const res = await Axios.post("http://10.0.2.2:3001/newCon", {senderId:idMe,
              receiverId:id});
             
            } catch (err) {
              console.log(err);
            }
            
          }
          
      }
      catch (err) {
        console.log(err);
      }
    }

   }
   getData2()

   useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await Axios.get("http://10.0.2.2:3001/getCon/" + currentChat?._id);
        setMessages2(res.data);
        console.log(res.data)
        
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [messages2]);

messages=[];
const reversed = [...messages2].reverse();
useEffect(()=>{
    reversed.map((val)=>{
      
 let y={
           
            _id: val._id,
            text: val.text,
            createdAt: val.createdAt,
            user: {
              _id: val.sender,
              name:othername,
              avatar:imageOther ,
            },
        }

        
        messages.push(y);
    })
       

})
    


  
    const onSend =  async(messages) => {
      let texy;
      messages.map((val)=>{
        texy=val.text;

      })
      const message = {
        sender: idMe,
        text: texy,
        conversationId: currentChat._id,
      };
      try {
        const res = await Axios.post("http://10.0.2.2:3001/addMessage", message);
        setMessages2([...messages2, res.data]);
        

        
      } catch (err) {
        console.log(err);
      }



    }

   

return ( 

<GiftedChat 
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: idMe,
       

      }}
      alwaysShowSend={true}
    />

 
   );
}


