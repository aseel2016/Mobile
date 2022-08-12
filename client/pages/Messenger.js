import React,{useState,useEffect,useRef,useCallback} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text,Image, View,Alert,Dimensions,ImageBackground, ScrollView} from 'react-native';
import {   GiftedChat } from 'react-native-gifted-chat'
import HomeHeader from '../components/HomeHeader';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider,Card,TextInput} from 'react-native-paper'
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import "react-native-get-random-values";
import BG from '../assets/BG.png'
import { Button } from 'react-native-paper';
import { colors } from '../global/styles';
import Message from '../components/Message'
let messages=[];

let othername;

let imageOther;
let Mename;
let Meimage;
let scrollView;
export default function Messenger({ route, navigation }){
    const { id,idMe,key } = route.params;
    const [messages2, setMessages2] = useState([]);
    const [messages3, setMessages3] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);
    const [employees,setEmployees]=useState([]);
    const [messagesFire,setMessagesFire]=useState([]);
    const [newMessage,setNewMessage]=useState("")



 

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
             othername=val.firstName+" "+val.lastName,
             imageOther=val.image;

         
 
         }
         else if(val._id===idMe){
          Mename=val.firstName+" "+val.lastName,
          Meimage=val.image;

      

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
        
        
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }
    return () => { isMounted = false }

  }, [id,messages2]);


    
async function handlesend(){

console.log("pressed send")
  const message = {
    sender: idMe,
    text: newMessage,
    conversationId: currentChat._id,
  };
  try {
    const res = await Axios.post("http://10.0.2.2:3001/addMessage", message);
    setMessages2([...messages2, res.data]);
    const newM=newMessage;
    setNewMessage("")
    let flag=true;
    let idtt;
    messagesFire.map((doc)=>{
      if(doc.senderId===idMe && doc.receiverId===id){
        idtt=doc.id;
        flag=false;
      }
    })
    if(flag==true)
  {     
    const data = {
      senderId:idMe,
      receiverId:id ,
      msg:newM,
      
    };
   
  
   await setDoc(doc(db,"messages",uuidv4()),data);
  }
  else{
    const machinesCollectionRef = collection(db, "messages");
    await deleteDoc (doc(machinesCollectionRef, idtt));
    
    const data = {
      senderId:idMe,
      receiverId:id ,
      msg:newM,
      
    };
   
  
   await setDoc(doc(db,"messages",uuidv4()),data);
  
  
  
  }

    

    
  } catch (err) {
    console.log(err);
  }


 




}

return ( 

  <ImageBackground source={BG} style={{width:'100%',height:'100%'}}>
  <View>
<ScrollView 
ref={ref => {scrollView = ref}}
onContentSizeChange={()=> scrollView.scrollToEnd({animated: true})}
style={{width:'100%'}}>

    <View >
      {messages2.map((val)=>{
       

        return(
          <Message key={uuidv4()}
          message={val} currentId={idMe} own={val.sender === idMe} image={imageOther}
          name={othername}
          />
        );
      
      })}
       
      </View>
     
      <Provider>
      <View  style={{flexDirection:'row'}}>
     <View >
      <TextInput 
      onChangeText={(text)=>setNewMessage(text)}
      multiline
      value={newMessage}
      style={{backgroundColor:'white',width:300,
      flex:1,margin:10,padding:10,
     }} placeholder="Type something ..." />

     </View>

     <View>
    
      <Button  mode="contained"
      style={{marginVertical:15,backgroundColor:colors.buttons}}
      onPress={handlesend}>
   <Icon2 name='send' size={25}/>
  </Button>
      
     </View>
     </View>
     </Provider>

     
      
      </ScrollView>
    

      
      </View>
      </ImageBackground>
   );
}


