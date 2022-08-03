import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';  

import { StyleSheet,Linking ,Modal,Animated, Text, View,Alert,Dimensions,TextInput} from 'react-native';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import {Picker} from '@react-native-picker/picker';
import {colors} from '../global/styles'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import { storage } from "../Firebase";
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Card } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
let appsJob=[];
const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };
export default function Applicants({ route, navigation }){
    const { id } = route.params;
    const [text,setText]=useState("")
    const [urls,setUrls]=useState([])
    const [jobs,setJobs]=useState([])
    const [type,setType]=useState("")
    const [visible,setVisible]=useState(false)
    const [visible2,setVisible2]=useState(false)
    const [emailEmployee,setEmialEmployee]=useState("");
    const [emai,setEmail]=useState("");

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
    {setUrls([])
    const fileList=ref(storage,'applicants/');
    listAll(fileList).then((response)=>{
      response.items.forEach((item)=>{     
        getDownloadURL(item).then((url)=>
    {
        
    setText(url+" "+ item.name)
    setUrls((urls) => [
        ...urls,
        {"name":item.name,"url":url},
      ]);
    }
        )
    
    
    })})}
    return () => { isMounted = false }


},[])
appsJob=[];
useEffect(()=>{
    let isMounted=true;
    if(isMounted)
   { Axios.get('http://10.0.2.2:3001/getAlljobs').then((response)=>{
        setJobs(response.data);
  
      })}
      return () => { isMounted = false }

   
  },[jobs]);
  jobs.map((val)=>{
    if(val._id===id){
        val.Applicants.map((val)=>{
            appsJob.push(val)
        })
    }
  })
   
console.log(appsJob)
async function handlereject(){
    setVisible2(true)
}
async function handleaccept(){
    
setVisible(true)
}
async function handlepress(email,job){
    
if(type!==""){

const response = await fetch('http://10.0.2.2:3001/update_applicant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            job:job,
            email:email,
   state:type,
        }),

    })
  }

    if(type==="Rejected" || type==="Rejected after first interview"){
    
    }
    
    else if(type==="Accepted first interview"){
      const data = {
        managerEmail:emai,
        applicant:email ,
        job:job,
        state:type,
        
      };
     
    
     await setDoc(doc(db,"jobs",uuidv4()),data); 
    
    }
    else if(type==="Accepted for first interview"){
      const data = {
        Rec_email:"aseelbustami16@gmail.com",
        managerEmail:emai,
        applicant:email ,
        job:job,
        state:type,
        
      };
     
    
     await setDoc(doc(db,"jobs",uuidv4()),data); 
    
    }

    else if(type==="Accepted second interview"){
      const data = {
        Rec_email:"aseelbustami16@gmail.com",
        managerEmail:emai,
        applicant:email ,
        job:job,
        state:type,
        
      };
     
    
     await setDoc(doc(db,"jobs",uuidv4()),data); 
    
    }
    else if(type==="Accepted third interview"){
      const data = {
        Rec_email:"aseelbustami16@gmail.com",
        managerEmail:emai,
        applicant:email ,
        job:job,
        state:type,
        
      };
     
    
     await setDoc(doc(db,"jobs",uuidv4()),data); 
    
    }
}

let flag=true;
if(appsJob.length===0){
  flag=false;
}
return ( 
    <View>
       
<View  >

    {   flag? urls.map((val)=>{
            let state;

            const y=val.name.split(" ")
            if(y[1]===id){
              return(
                
                  appsJob.map((val3)=>{
                    if(val3.email===y[0]){
                        state=val3.status;
                        return(<View key={y[0]}>
                          <Card>
                              <Card.Content>
                      <View  style={{flexDirection:'row'}}>
                          
                          <Text style={{fontSize:20,fontWeight:'900'}}
                onPress={() => Linking.openURL(val.url)}>
           📑 {y[2]}
          </Text>
          <Text style={{backgroundColor:'#CED5CD',
          borderRadius:100,fontSize:14,margin:3,
          padding:8,fontWeight:'bold',
          borderWidth:1,borderColor:'#E2E0E0'}}>{state}</Text>
          
          </View>
          <View style={{flexDirection:'row'}} >
          <Icon2  name='account-check'
          onPress={handleaccept}  color="#079401" size={25}
          style={{marginHorizontal:20}}
           />
              <Icon2  name='account-remove' 
              style={{marginHorizontal:20}}
              onPress={handlereject} color="#E20000"  size={25}   />
          
              <Button title="Save" 
              onPress={()=>handlepress(y[0],y[1])} 
              buttonStyle={{marginLeft:170,padding:10,
              backgroundColor:'#FFC300'}}/>
          
          </View>
          </Card.Content>
          </Card>
                          </View>
                         );
                        
                    }
                })
                


              );
               


            
                
            }
        }):
        <View>
          <Text style={{fontSize:20,margin:10,fontWeight:'bold'}}>📢No one applied for this job yet</Text>
          </View>
       
    }
    
    
      
       


    </View>

    {
        visible && <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
           <Icon4  name='close'size={25} onPress={()=>setVisible(false)}/>
          </View>
        </View>
      

        
        <Picker style={{width:'100%'}}
        selectedValue={type}
        onValueChange={(itemValue,itemIndex)=>setType(itemValue)}>
         <Picker.Item label="Accepted for first interview" key="3"  value="Accepted for first interview"/>
         <Picker.Item label="Accepted first interview" key="4"  value="Accepted first interview"/> 

         <Picker.Item label="Accepted second interview" key="5"  value="Accepted second interview"/> 

         <Picker.Item label="Accepted third interview" key="6"  value="Accepted third interview"/> 

        </Picker>
       
          




          
        
      </ModalPoup>
    }
     {
        visible2 && <ModalPoup visible={visible2}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
           <Icon4  name='close'size={25} onPress={()=>setVisible2(false)}/>
          </View>
        </View>
      

        
        <Picker style={{width:'100%'}}
        selectedValue={type}
        onValueChange={(itemValue,itemIndex)=>setType(itemValue)}>
         <Picker.Item label="Rejected" key="1"  value="Rejected"/>
         <Picker.Item label="Rejected after first interview" key="2"  value="Rejected after first interview"/> 
       
         <Picker.Item label="Rejected after second interview" key="7"  value="Rejected after second interview"/> 
         <Picker.Item label="Rejected after third interview" key="8"  value="Rejected after third interview"/> 

        </Picker>
       
          




          
        
      </ModalPoup>
    }
    </View>
   );
}

const styles = StyleSheet.create({
    container: {
      
      flexDirection:'row',
      
      marginVertical:5,
      paddingVertical:10,
      borderWidth:1,
      borderColor:'grey',
      backgroundColor:'white',
      borderRadius:10,
  
      
   
    },
    text:{
      fontSize:20,
      fontWeight:'bold',
      margin:10,
  
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
