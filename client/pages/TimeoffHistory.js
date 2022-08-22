import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,ScrollView, Text
  , View,TouchableOpacity,Modal,Animated
  ,Alert,Dimensions, Platform} from 'react-native';
  import { v4 as uuidv4 } from 'uuid';
  import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
  import * as DocumentPicker from 'expo-document-picker';
  import "react-native-get-random-values";

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
import { onSnapshot, collection, doc, updateDoc,getDocs,getFirestore} from "firebase/firestore";
import db from "../Firebase";
import { storage } from "../Firebase";
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
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
     <Modal transparent visible={showModal} style={{width:'100%'}}>
       <View style={styles.modalBackGround}>
         <Animated.View
           style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
           {children}
         </Animated.View>
       </View>
     </Modal>
   );
 };
export default function TimeoffHistory({navigation}){
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
const[reqId,setEeqestId]=useState("");
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


   const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
 
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
 
  const handleConfirm2 = (date) => {
   setDatestart(moment(date).format("YYYY-MM-DD"))
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
      

     Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
            setEmployees(response.data);
      
          })
        
       
       })


      emps=[];
       employees.map((val)=>{
        emps.push({
          'key':val._id,
          'value':val.firstName+" "+val.lastName,
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
         Axios.get('http://10.0.2.2:3001/read').then((response)=>{
        setRequests(response.data);
       
      
      })
       },[requests])
       requestOffEm=[];

 
  
  requests.map((val)=>{
  if(val.emplyeeId===idEm){
  let ss= moment(val.Starting).format('YYYY/MM/DD');
  let ee= moment(val.Ending).format('YYYY/MM/DD');

  let ss2= moment(val.Starting)
  let ee2= moment(val.Ending)
  const y=moment.preciseDiff(ss2,ee2,true)
  const u=y['days']
   let datayy={
     'key':val._id,
     'id':val._id,
      'Type':val.Type,
      'Description':val.Description,
      'Starting':ss,
      'Ending':ee,
      'duration':u+" days",
      'StatusHR':val.StatusHR,
      'Deliver':val.Deliver,
      'StatusManager':val.StatusManager,
      'Flag':val.Flag,


  
};

requestOffEm.push(datayy);
  }
}
 );
       
 const myData = [].concat(requestOffEm)
 .sort((a, b) => a.Deliver > b.Deliver ? -1 : 1)

   
policyAll=[];
resultFinal=[];
typesAllLeo=[];
  useEffect(()=>{
   
    
  Axios.get('http://10.0.2.2:3001/policy').then((response)=>{
    setTotaldays(response.data);
   
  
  })})

  totalDays.map((val)=>{
    let u={
      'key':val._id,
      'type':val.type,
      'state':val.state,
      'total':0,
    }
    policyAll.push(u);
    typesAllLeo.push(val.type);

  })
  requests.map((val)=>{
              
    if (val.emplyeeId==idEm && val.StatusHR==='accepted' )
  {  policyAll.map((valueEm)=>{
    if(valueEm.type===val.Type){
      const s=val.Starting;
    const e=val.Ending;

    const now=moment();
    const ss=moment(s);
    const ee=moment(e);
    let r=moment.preciseDiff(ss,ee,true);
    if(valueEm.state==='month'){
      if((now.month()==ss.month()) &&   (now.year()==ss.year()) ){
   
        valueEm.total=valueEm.total+r['days'];
      }

    }
    else if(valueEm.state==='year'){
      if(  now.year()==ss.year() ){
     
        valueEm.total=valueEm.total+r['days'];
          
     }
    
    
     }
    
  
  
 
  } })
}
})

policyAll.map((val)=>{
totalDays.map((val2)=>{
  if(val.type===val2.type){
    let u={
      "key":val2._id,
      "type":val.type,
      "total":val2.totaldays,
      "taken":val.total,
    }
    resultFinal.push(u);
  }


})

})
const handleEdit=()=>{
  setShow(false)
  navigation.navigate("UploadFile",{id:reqId,email:emai})
}
async function  handleupload(){
  try {
const result= await DocumentPicker.getDocumentAsync()
 if(result.type==="cancel"){
  console.log("cancelled")
 }
 else{
  console.log(result.uri)
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

const spaceRef = ref(storage, `allFiles/${file.name}`);
const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);


uploadBytes(spaceRef, bytes).then((snapshot) => {
  console.log('Uploaded an array!');
});

}
return ( 
  <ScrollView style={{width:'100%'}}>
<View >
       <HomeHeader navigation={navigation}/>
   
       <View>
        
       

       {
        resultFinal.map((val)=>{
          if(val.type==="Vacation"){
            return(<View  key={val.key}>

              <Text style={{backgroundColor:'#FFC300',
             fontSize:25,fontWeight:'800',padding:20,
             }}
             > 🏝Vacation</Text>
             <View style={{backgroundColor:'#EEF780'}}>
      
             <Text style={{fontSize:20,
              fontWeight:'900',margin:10}}>Total Days: {val.total+extrav}</Text>
             <Text style={{fontSize:20,
              fontWeight:'900',margin:10}}>Taken Days: {val.taken}</Text>
             <Text style={{fontSize:20,
              fontWeight:'900',margin:10}}>Available Days:  {val.total+extrav-val.taken}</Text>
            
            </View>
             </View>);

          }
          else if(val.type==="Work from Home"){
            return ( <View key={val.key} >

              <Text style={{backgroundColor:'#0093FF',
             fontSize:25,fontWeight:'800',padding:20,
             }}
             >🏡Work from Home</Text>
              <View style={{backgroundColor:'#91F7D8'}}>
      
      <Text style={{fontSize:20,
       fontWeight:'900',margin:10}}>Total Days: {val.total+extraw}</Text>
      <Text style={{fontSize:20,
       fontWeight:'900',margin:10}}>Taken Days:  {val.taken}</Text>
      <Text style={{fontSize:20,
       fontWeight:'900',margin:10}}>Available Days: {val.total+extraw-val.taken}</Text>
      
      </View>
            
            
             </View>);

          }

          else if(val.type==="Sick leave"){
            return(<View  key={val.key}>
              <View >

        <Text style={{backgroundColor:'#FF4600',
       fontSize:25,fontWeight:'800',padding:20,
       }}
       >🚑 Sick leave</Text>
      
      
       </View>
       <View style={{backgroundColor:'#F78D51'}}>

<Text style={{fontSize:20,
 fontWeight:'900',margin:10}}>Total Days: {val.total}</Text>
<Text style={{fontSize:20,
 fontWeight:'900',margin:10}}>Taken Days:  {val.taken}</Text>
<Text style={{fontSize:20,
 fontWeight:'900',margin:10}}>Available Days: {val.total-val.taken}</Text>

</View>
</View>
            );
          }
        })
       }
       
       <View>
       <View style={{flexDirection:'row'}}>

<IconButton mode="contained"
  icon="calendar"
  size={30}
  style={{marginTop:20}}
       onPress={showDatePicker2}
       />

<TextInput
   
   label="choose Date ..."
   value={dateStart}
   onChangeText={(text)=>setDatestart(text)}
  
   style={{width:330,marginVertical:10}} 
   
  
 />

   
</View>

     <DateTimePickerModal
      isVisible={isDatePickerVisible2}
      mode="date"
      onConfirm={handleConfirm2}
      onCancel={hideDatePicker2}
    />
       


       <Text style={{backgroundColor:'#D8D5D5',
       fontSize:20,fontWeight:'800',padding:20,color:colors.buttons}}>History of Time off Requests</Text>
       <TouchableOpacity style={styles.container}  >

           
           <Text style={styles.text}> Type       </Text>
           <Text style={styles.text}>   Duration</Text>
           <Text style={styles.text}>Status </Text>

          
          
           </TouchableOpacity>
           {dateStart===""?<View>
           {
         myData.slice(0,index).map((val)=>{
            let j="";
            let t=val.Type;
            let statusF="Waiting";

            if(val.Flag){
              if (val.StatusHR==="accepted"   ){
                statusF="Accepted"
                console.log("a")
               }
               if (val.StatusHR==="rejected" ){
                statusF="Rejected"
                console.log("r")
               }
            }
            else{
              if (val.StatusHR==="accepted"  && val.StatusManager==="accepted" ){
                statusF="Accepted"
                console.log("a2")
               }
               if (val.StatusHR==="rejected"  || val.StatusManager==="rejected"){
                statusF="Rejected"
                console.log("r2")
               }
      
            }



            if(t==="Work from Home"){
              t="WFH       "
            }


            if(statusF==="Rejected"){
       
              j= <Text style={
                  {backgroundColor:'red',
                fontSize:20,
               fontWeight:'bold',
               marginLeft:20,
              
               marginTop:30,
               
       
           }}>Rejected</Text>
       
            }
            else if (statusF==="Accepted"){
              j=<Text style={
                  {backgroundColor:'green',
                fontSize:20,
               fontWeight:'bold',
               marginLeft:20,
               
           }}>Accepted</Text>
       
            }
            else{
              j= <Text style={
                  {backgroundColor:'blue',
                fontSize:20,
               fontWeight:'bold',
               marginLeft:20,
               
              
           }}>Waiting </Text>
       
            }
            return <View key={val.key}>
               
               
               <TouchableOpacity style={styles.container} onPress={()=>{
                  
                  setShow(true)
                  setStart(val.Starting)
                  setEnd(val.Ending)
                  setDescription(val.Description)
                  setHR(val.StatusHR)
                  setManagerm(val.StatusManager)
                  console.log(val.Flag+"")
                  setFlagA(val.Flag)
                  setEeqestId(val.id)


                  
                  }}  >
           
           <Text style={styles.text}> {t}</Text>
           <Text style={styles.text}> {val.duration} </Text>
           <Text style={styles.text}>{j} </Text>
           <Icon3  style={styles.textIcon2} name='arrow-right' />
 <View style={{marginLeft:-60,marginTop:50,justifyContent:'flex-end',alignSelf:'flex-end'}}>
      <Text
      style={{fontWeight:'bold',color:'grey'}}
      >{moment(val.Deliver).format("YYYY-MM-DD")}</Text>
    </View>


          
          
           </TouchableOpacity>


            </View>

         })
      
       }
           </View>:<View>
           {
         myData.map((val)=>{
            let j="";
            let t=val.Type;
            let statusF="Waiting";

            if(val.Flag){
              if (val.StatusHR==="accepted"   ){
                statusF="Accepted"
                console.log("a")
               }
               if (val.StatusHR==="rejected" ){
                statusF="Rejected"
                console.log("r")
               }
            }
            else{
              if (val.StatusHR==="accepted"  && val.StatusManager==="accepted" ){
                statusF="Accepted"
                console.log("a2")
               }
               if (val.StatusHR==="rejected"  || val.StatusManager==="rejected"){
                statusF="Rejected"
                console.log("r2")
               }
      
            }
            if(t==="Work from Home"){
              t="WFH       "
            }


            if(statusF==="Rejected"){
       
              j= <Text style={
                  {backgroundColor:'red',
                fontSize:20,
               fontWeight:'bold',
               marginLeft:20,
              
               marginTop:30,
               
       
           }}>Rejected</Text>
       
            }
            else if (statusF==="Accepted"){
              j=<Text style={
                  {backgroundColor:'green',
                fontSize:20,
               fontWeight:'bold',
               marginLeft:20,
               
           }}>Accepted</Text>
       
            }
            else{
              j= <Text style={
                  {backgroundColor:'blue',
                fontSize:20,
               fontWeight:'bold',
               marginLeft:20,
               
              
           }}>Waiting </Text>
       
            }

           if(dateStart===moment(val.Deliver).format("YYYY-MM-DD"))
           { 
            return <View key={val.key}>
               
               
               <TouchableOpacity style={styles.container} onPress={()=>{
                  
                  setShow(true)
                  setStart(val.Starting)
                  setEnd(val.Ending)
                  setDescription(val.Description)
                  setHR(val.StatusHR)
                  setManagerm(val.StatusManager)
                  console.log(val.Flag+"")
                  setFlagA(val.Flag)
                  setEeqestId(val.id)


                  
                  }}  >
           
           <Text style={styles.text}> {t}</Text>
           <Text style={styles.text}> {val.duration} </Text>
           <Text style={styles.text}>{j} </Text>
           <Icon3  style={styles.textIcon2} name='arrow-right' />
 <View style={{marginLeft:-60,marginTop:50,justifyContent:'flex-end',alignSelf:'flex-end'}}>
      <Text
      style={{fontWeight:'bold',color:'grey'}}
      >{moment(val.Deliver).format("YYYY-MM-DD")}</Text>
    </View>


          
          
           </TouchableOpacity>


            </View>
            }

         })
      
       }</View>}
      

             
<Text 
onPress={
()=>
 {

  if(text==="see less"){
    setIndex(4)
    setText("see older")

  }
  else
  {
    if((index+4)>= myData.length){
setText("see less")
 }

 setIndex(index+4)
}
}
}
style={{fontSize:20,margin:10,fontWeight:'bold',textDecorationLine:'underline'}}>{text}</Text>



        { show && <ModalPoup visible={show} >
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
           <Icon4  name='close'size={25} onPress={()=>setShow(false)}/>
          </View>
        </View>
      

        <View style={{flexDirection:'column'}}>
        {flagA?
  <View>{(hr===undefined)?<Text style={styles.text}>HR response: Waiting</Text>:
  <Text style={styles.text}>HR response: {hr}</Text>
 }
</View>
:
<View>
{(managerm===undefined)?<Text style={styles.text}>Manager Response: Waiting</Text>:
   <Text style={styles.text}>Manager Response: {managerm}</Text>
}
{(hr===undefined)?<Text style={styles.text}>HR response: Waiting</Text>:
 <Text style={styles.text}>HR response: {hr}</Text>
}</View>}
     
           <Text style={styles.text}>Start Date: {start} </Text>
           <Text style={styles.text}> End Date: {end}</Text>
           <Text style={styles.text}>Description: {Description}</Text>
            <Button mode='contained'
            onPress={handleEdit}
            style={{margin:20}}> Edit </Button>


           </View>
          
       
          




          
        
      </ModalPoup>}

    
      
      { showUp && <ModalPoup visible={showUp} >
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
           <Icon4  name='close'size={25} onPress={()=>setShowUpload(false)}/>
          </View>
        </View>
      

        <View style={{flexDirection:'column'}}>
 

             <Button mode='contained'
             onPress={handleupload}
            
            style={{margin:20}}> upload File</Button>


           </View>
          
       
          




          
        
      </ModalPoup>}
      

       
       

      </View>
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

