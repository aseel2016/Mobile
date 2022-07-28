import React,{useState,useEffect,useRef,useCallback} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';
import {   GiftedChat } from 'react-native-gifted-chat'
import HomeHeader from '../components/HomeHeader';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
let messages=[];

let othername;

let imageOther;
export default function Messenger({ route, navigation }){
    const { id,idMe,key } = route.params;
    const [messages2, setMessages2] = useState([]);
    const [messages3, setMessages3] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);
    const [employees,setEmployees]=useState([]);
    const [messagesFire,setMessagesFire]=useState([]);



 

    useEffect(()=>{
      let isMounted=true;
      if(isMounted)
      {Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
          setEmployees(response.data);
    
        })}
        return () => { isMounted = false }


     
    },[]);
    
   

    useEffect(()=>{
      const deleteNote=async()=>{
        if(key!=null){
          const machinesCollectionRef = collection(db, "messages");
      await deleteDoc (doc(machinesCollectionRef, key));


        }

      }
      deleteNote()

    },[])

    useEffect(
      () =>
            onSnapshot(collection(db, "messages"), (snapshot) =>
            setMessagesFire(snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()}) )))
        ,
      []
    );
  
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
    let isMounted=true;
    if(isMounted)
   { const getMessages = async () => {
      try {
        const res = await Axios.get("http://10.0.2.2:3001/getCon/" + currentChat?._id);
        setMessages2(res.data);
        console.log(res.data)
        
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();}
    return () => { isMounted = false }

  }, [id,messages2]);

messages=[];
const reversed = [...messages2].reverse();
useEffect(()=>{
  let isMounted=true
  if(isMounted)
  {  reversed.map((val)=>{
      
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
    })}
    return () => { isMounted = false }
 
})
    


  
    const onSend =  async(messages2) => {
      let texy;
      

      messages2.map((val)=>{
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
      let flag=true;
      let idtt;
      messagesFire.map((doc)=>{
        if(doc.senderId===idMe && doc.receiverId===id){
          idtt=doc.id;
          flag=false;
        }
      })
      if(flag===true)
{     
      const data = {
        senderId:idMe,
        receiverId:id ,
        msg:texy,
        
      };
     
   
     await setDoc(doc(db,"messages",uuidv4()),data);
    }
    else{
      const machinesCollectionRef = collection(db, "messages");
      await deleteDoc (doc(machinesCollectionRef, idtt));
      
      const data = {
        senderId:idMe,
        receiverId:id ,
        msg:texy,
        
      };
     
   
     await setDoc(doc(db,"messages",uuidv4()),data);



    }




    }

   

return ( 


    <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <GiftedChat
      
          scrollToBottom
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: idMe,
           
          }}
          alwaysShowSend={true}
         
        />
      </View>

 
   );
}


