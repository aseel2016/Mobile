import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text,TouchableOpacity, View,ScrollView,Alert,Dimensions} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import HomeHeader from '../components/HomeHeader';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { colors } from '../global/styles';
import { Card,Avatar,IconButton } from 'react-native-paper';
import { Modal, Portal,Snackbar ,TextInput,Checkbox  ,  Button, Provider } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";

 // required as a polyfill for uuid. See info here: https://github.com/uuidjs/uuid#getrandomvalues-not-supported

  import 'firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import  { preciseDiff } from 'moment';
import {Picker} from '@react-native-picker/picker';
let requestOffEm=[];
let idEm;
let first;
let idReq;
let last;
let extrav;
let extraw;
let policyAll=[];
let resultFinal=[];
let types=[];

export default function RequestOFF({navigation}){
   const [emai,setEmail]=useState("");
   const [employees,setEmployees]=useState([]);
   const [type,setType]=useState("");
 
 const [visible, setVisible] = useState(false);
 const [sub, setSub] = useState("");
 const [desc, setDesc] = useState("");
 const [dateStart, setDatestart] =useState(moment());

 const [dateend, setDateend] = useState(moment());
 
 const onDismissSnackBar = () => setVisible(false);



   const[totalDays,setTotaldays]=useState([]);

   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

   const showDatePicker = () => {
     setDatePickerVisibility(true);
   };
 
   const hideDatePicker = () => {
     setDatePickerVisibility(false);
   };
 
   const handleConfirm = (date) => {
     console.warn("A date has been picked: ", date);
    
     setDatestart( moment(date));

     hideDatePicker();
   };
   const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (date) => {
    console.warn("A date has been picked: ", date);
    setDateend( moment(date))
    hideDatePicker2();
  };




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
      let isMounted=true
if(isMounted)
    { Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
            setEmployees(response.data);
      
          })}

          return () => { isMounted = false }

       
       })



       employees.map((val)=>{
         if(val.email===emai){
            
            idEm=val._id;
            first=val.firstName;
            last=val.lastName;
            extrav=val.ExtrsVacation;
            extraw=val.ExtraWFH;
         
         }
        })
        useEffect(()=>{
           
            
            Axios.get('http://10.0.2.2:3001/policy').then((response)=>{
              setTotaldays(response.data);
             
            
            })})
            types=[];

        totalDays.map((val)=>{
            let u={
              'key':val._id,
              'type':val.type,
              'state':val.state,
              'total':0,
            }
            policyAll.push(u);
            types.push(val.type);

          }) 

    
    async function handlerequest(){
      const y=dateStart.format("YYYY-MM-DD ")
      const h=dateStart.format("hh:mm:ss")
      const f=(y+"T"+h).toString();
      const f2=new Date(f)
  
      const y1=dateend.format("YYYY-MM-DD")
      const h1=dateend.format("hh:mm:ss")
      const f1=(y1+"T"+h1).toString();
      const f3=new Date(f1)

      const response =  await fetch('http://10.0.2.2:3001/insert_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
         id:idEm,
         type:type,
         description:desc,
         start:f2,
         end:f3,
         
          
        }),
      
      })
      const datay =  await response.json()

  if (datay.user) { 
   idReq=datay.id;
   Alert.alert("📢Successfully sent","💫Yoy will get the reply as soon as possible")

   
   
  } else

  {
    
  }

     
       
      const data = {
        employee_id: idEm,
        employee_first_name:first,
        employee_last_name:last,
        message:"sends you time off request",
        Rec_email:"aseelbustami16@gmail.com",
        Request_id:idReq,
      };
      
     await setDoc(doc(db,"notifications",uuidv4()),data);


      

    }     
return ( 
  <ScrollView style={{width:'100%'}}>
<View >
<Provider>
  <View style={{flexDirection:'row'}}>

<Text
 style={{fontSize:19,fontWeight:'800',
 margin:10}}>🔑Type</Text>
 <Picker style={{width:'100%'}}
 selectedValue={type}
 onValueChange={(itemValue,itemIndex)=>setType(itemValue)}>
   {
     types.map((val)=>{
       return <Picker.Item label={val} key={val}  value={val}/>
     })
   }
 </Picker>


</View>
 
    
    <TextInput
      label="Description"
      value={desc}
      onChangeText={text => setDesc(text)}
      style={{margin:10}}
      multiline={true}
      numberOfLines={3}
      

      

    />
    
    <View style={{flexDirection:'row'}}>
    <IconButton mode="contained"
    icon="calendar"
         onPress={showDatePicker}/>
  

  <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
       <TextInput
     
      label="Start date"
      value={dateStart.format("YYYY-MM-DD")}
      
      style={{width:335,marginVertical:10,color:'black'}}
      
     
    />



      
       
       
       
</View>
       
<View style={{flexDirection:'row'}}>

  <IconButton mode="contained"
    icon="calendar"
         onPress={showDatePicker2}
         />

<TextInput
     
     label="End date"
     value={dateend.format("YYYY-MM-DD")}
     
     style={{width:335,marginVertical:10}}
     
    
   />
   
     
     
</View>

       <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />

 

<Button  mode="contained"  style={{marginVertical:40,marginHorizontal:50,padding:10,backgroundColor:'green'}} onPress={handlerequest}>
    Send Request
  </Button>
 
         
      
   
   
  
  
</Provider>
      

       
         
      
     
       
      
          
          
          




          
     
      
       
      

       
       

      </View>
    
    
  </ScrollView>
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
     width: '100%',
     backgroundColor: 'white',
     paddingHorizontal: 5,
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

