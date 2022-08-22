import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Linking,Text,TouchableOpacity, View,ScrollView,Alert,Dimensions} from 'react-native';
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


 // required as a polyfill for uuid. See info here: https://github.com/uuidjs/uuid#getrandomvalues-not-supported

  import 'firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import  { preciseDiff } from 'moment';
import {Picker} from '@react-native-picker/picker';
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
let types=[];
let dateStartd=moment();
let dateEndd=moment();
let managerName;
let typed="";
let descd="";
let Rec_email="";
let Mefirst;
let Melast;
let Meid;
let accessible;
let flaggg=false;
let hrstate="Waiting";
let managerstate="Waiting";

let objType={"type":"","taken":0,"Total":0,"Available":0};
export default function RequestHR({route,navigation}){
    const { name,keyNote,idEm,reqId } = route.params;
   const [emai,setEmail]=useState("");
   const [employees,setEmployees]=useState([]);
   const [type,setType]=useState("");
   const [requests,setRequests]=useState([]);
 const [visible, setVisible] = useState(false);
 const [sub, setSub] = useState("");
 const [desc, setDesc] = useState("");
 const [dateStart, setDatestart] =useState(moment());

 const [dateend, setDateend] = useState(moment());
 const [flag, setFlag] = useState(false);
const[urls,setUrls]=useState([]);
useEffect(()=>{
      
  setUrls([])
  const fileList=ref(storage,'allFiles/');
  listAll(fileList).then((response)=>{
    response.items.forEach((item)=>{     
      getDownloadURL(item).then((url)=>
  {
      
 
  setUrls((urls) => [
      ...urls,
      {"name":item.name,"url":url},
    ]);
  }
      )
  
  
  })})
  


},[])

console.log(urls)
  
urls.map((val)=>{
  const u=val.name.split(" ");
if(u[2]===reqId){
  flaggg=true  }
}
)
 resultFinal=[];

   const[totalDays,setTotaldays]=useState([]);

   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

   const onDismissSnackBar = () => setVisible(false);
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
       { Axios.get('http://10.0.2.2:3001/read').then((response)=>{
       setRequests(response.data);
      
     
     })}
     return () => { isMounted = false }

      },[requests])


      useEffect(()=>{
        let isMounted=true
  if(isMounted)
      { Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
              setEmployees(response.data);
        
            })}
  
            return () => { isMounted = false }
  
         
         })
  
  
  
         employees.map((val)=>{
           if(val._id===idEm){
              
              first=val.firstName;
              Rec_email=val.email;
              last=val.lastName;
              extrav=val.ExtrsVacation;
              extraw=val.ExtraWFH;
           
           }
           else if(val.email===emai){
            Mefirst=val.firstName;
            Melast=val.lastName;
            Meid=val._id;
           }
          })

          employees.map((val)=>{
            if(val.email===emai){
              if(val.accessible==="No"){
                accessible=false;
          
              }
              else{
                accessible=true;
          
              }
          
            }
          })
          
       useEffect(()=>{
           
            
        Axios.get('http://10.0.2.2:3001/policy').then((response)=>{
          setTotaldays(response.data);
         
        
        })
    },[reqId])
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
   
        requests.map((val)=>{
            if(val._id === reqId){
            managerstate=val.StatusManager
            hrstate=val.StatusHR
            let ss= moment(val.Starting).utc().format('YYYY/MM/DD');
            let ee= moment(val.Ending).utc().format('YYYY/MM/DD');
            
    
            dateStartd=moment(val.Starting);
            dateEndd=moment(val.Ending);
            typed=val.Type;
            descd=val.Description
    
         };
        
        }
           ); 

           requests.map((val)=>{
              
            if (val.emplyeeId==idEm && val.StatusHR==='accepted' && val.StatusManager==='accepted' )
          {  policyAll.map((valueEm)=>{
            if(valueEm.type===val.Type){
              const s=val.Starting;
            const e=val.Ending;
        
            const now=moment();
            const ss=moment(s);
            const ee=moment(e);
            const r=moment.preciseDiff(ss,ee,true);
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
      const gett=()=>{
        resultFinal=[];
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
                  }}
                  )}
                  )   
    
            
        
      }

         gett()


        
         
            resultFinal.map((val)=>{
                if(val.type===typed){
                    objType.type=val.type;
                    objType.Total=val.total;
                    objType.taken=val.taken;
                    objType.Available=val.total-val.taken;
                     
                }
            })


            let u;
          
           
            if(objType.type==="Vacation"){
                u=(<View  >
    
                  <Text style={{backgroundColor:'#FFC300',
                 fontSize:25,fontWeight:'800',padding:20,
                 }}
                 > 🏝Vacation</Text>
                 <View style={{backgroundColor:'#EEF780'}}>
          
                 <Text style={{fontSize:20,
                  fontWeight:'900',margin:10}}>Total Days: {objType.Total+extrav}</Text>
                 <Text style={{fontSize:20,
                  fontWeight:'900',margin:10}}>Taken Days: {objType.taken}</Text>
                 <Text style={{fontSize:20,
                  fontWeight:'900',margin:10}}>Available Days:  {objType.Available+extrav}</Text>
                
                </View>
                 </View>);
    
              }
              else if(objType.type==="Work from Home"){
                u= ( <View >
    
                  <Text style={{backgroundColor:'#0093FF',
                 fontSize:25,fontWeight:'800',padding:20,
                 }}
                 >🏡Work from Home</Text>
                  <View style={{backgroundColor:'#91F7D8'}}>
          
          <Text style={{fontSize:20,
           fontWeight:'900',margin:10}}>Total Days: {objType.Total+extraw}</Text>
          <Text style={{fontSize:20,
           fontWeight:'900',margin:10}}>Taken Days:  {objType.taken}</Text>
          <Text style={{fontSize:20,
           fontWeight:'900',margin:10}}>Available Days: {objType.Available+extraw}</Text>
          
          </View>
                
                
                 </View>);
    
              }
    
              else if(objType.type==="Sick leave"){
                u=(<View  >
                  <View >
    
            <Text style={{backgroundColor:'#FF4600',
           fontSize:25,fontWeight:'800',padding:20,
           }}
           >🚑 Sick leave</Text>
          
          
           </View>
           <View style={{backgroundColor:'#F78D51'}}>
    
    <Text style={{fontSize:20,
     fontWeight:'900',margin:10}}>Total Days: {objType.Total}</Text>
    <Text style={{fontSize:20,
     fontWeight:'900',margin:10}}>Taken Days:  {objType.taken}</Text>
    <Text style={{fontSize:20,
     fontWeight:'900',margin:10}}>Available Days: {objType.Available}</Text>
    
    </View>
    </View>
                );
              }
             
  async function handleaccept(){
    let status="accepted"
    const response = await fetch('http://10.0.2.2:3001/accept-reject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            
            id:reqId,
            status:'accepted',
            accessible:accessible,
            
        }),

    })
    
    const data = await response.json()

    if (data.user) {
     Alert.alert("📢Request Accepted successfully","The employee will be notified about your respnse")
          
    } 
else

    {
        Alert.alert("error")
        
    }

let messageSent;
       messageSent=Mefirst+" "+Melast+" "+ status+ " "+"your time off request" ;
            
                const data2 = {
                  employee_id: Meid,
                  employee_first_name: Mefirst,
                  employee_last_name: Melast,
                  message:messageSent,
                  Rec_email:Rec_email,
                  Request_id:reqId,
                };
                
                // Add a new document in collection "cities" with ID 'LA'
                //const machinesCollectionRef = collection(db, "notifications")
               // updateDoc(doc(machinesCollectionRef, '7v3z6bLMVHvudL7gPA41'), {employee_first_name:'aseel'});
             
               await setDoc(doc(db,"notifications",uuidv4()),data2);
            
                ///////delte this notification
            
                const machinesCollectionRef = collection(db, "notifications");
               await deleteDoc (doc(machinesCollectionRef, keyNote));
                 navigation.navigate("Notifications")

  }  
  
  async function handlereject(){

    let status="rejected"
    const response = await fetch('http://10.0.2.2:3001/accept-reject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            
            id:reqId,
            status:'rejected',
            
        }),

    })
    
    const data = await response.json()

    if (data.user) {
        Alert.alert("📢Request Rejected ","The employee will be notified about your respnse")
          
    } 
else

    {
        Alert.alert("error")
        
    }

let messageSent;
       messageSent=Mefirst+" "+Melast+" "+ status+ " "+"your time off request" ;
            
                const data2 = {
                  employee_id: Meid,
                  employee_first_name: Mefirst,
                  employee_last_name: Melast,
                  message:messageSent,
                  Rec_email:Rec_email,
                  Request_id:reqId,
                };
                
                // Add a new document in collection "cities" with ID 'LA'
                //const machinesCollectionRef = collection(db, "notifications")
               // updateDoc(doc(machinesCollectionRef, '7v3z6bLMVHvudL7gPA41'), {employee_first_name:'aseel'});
             
               await setDoc(doc(db,"notifications",uuidv4()),data2);
            
                ///////delte this notification
            
                const machinesCollectionRef = collection(db, "notifications");
               await deleteDoc (doc(machinesCollectionRef, keyNote));
                 navigation.navigate("Notifications")
  
}
return ( 
  <ScrollView style={{width:'100%'}}>
<View >

<View>

   {u}
  
</View>
<View>
<Text style={{padding:20,fontSize:20,
    fontWeight:'bold',
    backgroundColor:'#C29BFA'}}>Review time off request:</Text>

<View style={{borderColor:'grey',backgroundColor:'#E2E0E0'}}>
{(managerstate===undefined)?null:
<Text style={{fontSize:20,margin:10,fontWeight:'bold'}}>🔔Manager :{managerstate}</Text>

} 
{(hrstate===undefined)?null:<Text
 style={{fontSize:20,margin:10,
 fontWeight:'bold'}}>🔔Human Resources: {hrstate}</Text>
}

</View>
</View>
<Provider >
  <View style={{flexDirection:'row' }}>

<Text
 style={{fontSize:19,fontWeight:'800',
 margin:10}}>🔑Type</Text>
 <Picker style={{width:'100%'}}
 selectedValue={typed}
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
      value={descd}
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
      value={dateStartd.format("YYYY-MM-DD")}
      
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
     value={dateEndd.format("YYYY-MM-DD")}
     
     style={{width:335,marginVertical:10}}
     
    
   />
   
     
     
</View>

       <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />
<View>
  {flaggg?
  <View>
  <Text style={{margin:10,
    fontSize:18,fontWeight:'bold'}}>Attached Files:</Text>
    {   
        urls.map((val)=>{
          const u=val.name.split(" ");
        if(u[2]===reqId)

        {
        return  (
          
          <View key={uuidv4()}>
  <Text style={{fontSize:20,fontWeight:'900'}}
                onPress={() => Linking.openURL(val.url)}>
          📄 {u[0]}
          </Text>
  </View>
  
  );
        }
       
        }
        )
        }
  </View>
  :
  <View>
    
  </View>}
</View>
<View style={{flexDirection:"row"}}>

<Button  mode="contained" onPress={handleaccept} style={{marginVertical:40,marginHorizontal:50,padding:10,backgroundColor:'green'}} >
    Accept
  </Button>

  <Button  mode="contained" onPress={handlereject} style={{marginVertical:40,marginHorizontal:50,padding:10,backgroundColor:'red'}} >
    Reject
  </Button>
</View>

 
         
      
   
   
  
  
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

