import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,ScrollView, Text
  , View,TouchableOpacity,Modal,Animated
  ,Alert,Dimensions,TextInput} from 'react-native';
  import { v4 as uuidv4 } from 'uuid';
  import "react-native-get-random-values"; // required as a polyfill for uuid. See info here: https://github.com/uuidjs/uuid#getrandomvalues-not-supported

  import 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import moment, { preciseDiff } from 'moment';
import { colors } from '../global/styles';
import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-picker/picker';

import {Button} from 'react-native-elements'
import Axios from 'axios';
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
   const [requests,setRequests]=useState([]);
   const [requests2,setRequests2]=useState([]);

   const [employees,setEmployees]=useState([]);
   const [show,setShow]=useState(false);
   const [show2,setShow2]=useState(false);
const [desc,setDes]=useState("");
   const [start,setStart]=useState("");
   const [end,setEnd]=useState("");
   const [Description,setDescription]=useState("");
   const [datestart, setDatestart] = useState(new Date())
   const [dateend, setDateend] = useState(new Date())
   const [type,setType]=useState("");
   const [showe,setshoe2]=useState(false)
   const [showe2,setshoe22]=useState(false)




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
     setDatestart(date);

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
    setDateend(date)
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
      

     Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
            setEmployees(response.data);
      
          })
        
       
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
      Alert.alert("📢Successfully sent","💫Yoy will get the reply as soon as possible")

      const response =  await fetch('http://10.0.2.2:3001/insert_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
         id:idEm,
         type:type,
         description:desc,
         start:new Date(datestart),
         end:new Date(dateend),
         
          
        }),
      
      })
      const datay =  await response.json()

  if (datay.user) { 
   idReq=datay.id;
   
   
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

      

       
          <View style={{flexDirection:'row'}}>

       <Text
        style={{fontSize:19,fontWeight:'800',
        margin:10}}>Type</Text>
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
       <View style={{flexDirection:'row'}}>
       <Text style={{fontSize:19,fontWeight:'800',margin:10}}>Description</Text>
       
       <TextInput
          style={{borderColor:'grey',borderWidth:1}}
          value={desc}
         placeholder="Description"
         borderColor='grey'
            width={220}    
          onChangeText={(Text)=>{setDes(Text)}}
          autoCorrect={false}
        />
       
       </View>
       <View style={{flexDirection:'row'}}>
      
       <Button title="Pick start date" titleStyle={{fontSize:19,fontWeight:'800',margin:10}}
       onPress={showDatePicker}
       buttonStyle={{margin:10,alignItems:'center',alignContent:'center',backgroundColor:'#69F32D'}}
       
       
       />
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
       
       
       


       
       </View>
       <View style={{flexDirection:'row'}}>

       <Button title="Pick end date" titleStyle={{fontSize:19,fontWeight:'800',margin:10}}
      
       buttonStyle={{margin:10,alignItems:'center',backgroundColor:'#69F32D'}}
       onPress={showDatePicker2}

       />
       
       <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />
       
        </View>
      
       <Button  
       title="Send"
       buttonStyle={{backgroundColor:colors.buttons,margin:20}}
        titleStyle={{fontSize:20,fontWeight:'800'}}
         onPress={handlerequest}
          />
          
          
          




          
     
      
       
      

       
       

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

