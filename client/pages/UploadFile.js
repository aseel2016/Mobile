import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,ScrollView, Text
  , View,TouchableOpacity,Modal,Animated
  ,Alert,Dimensions, Platform} from 'react-native';

  import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
  import * as DocumentPicker from 'expo-document-picker';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionic from 'react-native-vector-icons/Ionicons';
import SelectList from 'react-native-dropdown-select-list'

import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import moment from 'moment';

import { colors } from '../global/styles';
import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-picker/picker';
require('moment-precise-range-plugin');
import { IconButton ,TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper'

import Axios from 'axios';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";

import db from "../Firebase";
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";

import { storage } from "../Firebase";
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage';
let requestOffEm=[];
let idEm;
let first;
let idReq;
let last;
let extrav;
let extraw;
let policyAll=[];
let resultFinal=[];
let typesAllLeo=[];
let emps=[];
let accessible;
let firstName;
             let   lastName;
             let   iddem;
export default function UploadFile({navigation,route}){
    const { id ,email} = route.params;
   const [emai,setEmail]=useState("");
   const [requests,setRequests]=useState([]);
   const [requests2,setRequests2]=useState([]);
   const [flagA,setFlagA]=useState(false)
   const[index,setIndex]=useState(5)
   const[text,setText]=useState("see older")
   const [employees,setEmployees]=useState([]);
   const [show,setShow]=useState(false);
   const [show2,setShow2]=useState(false);
const [desc,setDes]=useState("");
   const [start,setStart]=useState("");
   const [end,setEnd]=useState("");
   const [durationf,setDuration]=useState("");
const[search,setSearch]=useState(false)
   const [Description,setDescription]=useState("");
   const [dateend, setDateend] = useState(new Date())
   const [type,setType]=useState("");
   const [showe,setshoe2]=useState(false)
   const [showe2,setshoe22]=useState(false)
   const [dateStart, setDatestart] =useState("");

   const [selected2, setSelected2] = React.useState("");
const[managerm,setManagerm]=useState("")
const[hr,setHR]=useState("")
const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

   const[totalDays,setTotaldays]=useState([]);

const[showUp,setShowUpload]=useState(false)
const [notifications,setNotifications]=useState([])

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

    useEffect(
        () =>
              onSnapshot(collection(db, "notifications"), (snapshot) =>
              setNotifications(snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()}) )))
          ,
        []
      );

    useEffect(()=>{
      

        Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
               setEmployees(response.data);
         
             })
           
          
          },[])
          employees.map((val)=>{
            if(val.email===email){
                firstName=val.firstName;
                lastName=val.lastName;
                iddem=val._id
            }
          })
   

async function  handleupload(){
  try {
const result= await DocumentPicker.getDocumentAsync()
 if(result.type==="cancel"){
  console.log("cancelled")
 }
 else{
  console.log(result.uri)

  uploadFiletoFirebase(result)
 }

  } catch (err) {
  
  }
}

async function NormalizePath(path){
  if(Platform.OS==='ios' || Platform.OS==="android")
  {
    const filePrefix='file://'
    if(path.startsWith(filePrefix)){
      path=path.substring(filePrefix.length)
      try{
        path=decodeURI(path)
      }
      catch(e){

      }
    }
  }
  return path;

}
async function uploadFiletoFirebase(file){

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', file.uri, true);
        xhr.send(null);
      });
const spaceRef = ref(storage, `allFiles/${file.name+" "+email+" "+id}`);


uploadBytes(spaceRef, blob).then((snapshot) => {
  Alert.alert("Success","Your file is uploaded successfully")
});
notifications.map(async(val)=>{
    if(val.Request_id!==undefined)
   {
     if(val.Request_id===id){
        const machinesCollectionRef = collection(db, "notifications");
    await deleteDoc (doc(machinesCollectionRef, val.id));
    
    
    }
}
})
const data = {
    message:"file is uploaded to preview for request time OFF ",
    Rec_email:"aseelbustami16@gmail.com",
    Request_id:id,
    employee_first_name:firstName,
    employee_last_name:lastName,
    employee_id:iddem,
    time:new Date()
  };
  
  await setDoc(doc(db,"notifications",uuidv4()),data);
}


return ( 
  <ScrollView style={{width:'100%'}}>
<View >
   
       



     



      

        <View style={{flexDirection:'column'}}>
 

             <Button mode='contained'
             onPress={handleupload}
            
            style={{margin:20}}> upload File</Button>


           </View>
          
       
          




          
      

       
       

      
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
   text2:{
    fontSize:16,
    fontWeight:'bold',
    margin:15,
    marginLeft:20,
    

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

