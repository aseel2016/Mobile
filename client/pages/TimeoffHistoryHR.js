import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,ScrollView, Text
  , View,TouchableOpacity,Animated
  ,Alert,Dimensions,TextInput} from 'react-native';
  import { v4 as uuidv4 } from 'uuid';

  import SelectList from 'react-native-dropdown-select-list'
  import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionic from 'react-native-vector-icons/Ionicons';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import moment from 'moment';
import { colors } from '../global/styles';
import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-picker/picker';
require('moment-precise-range-plugin');
import {Button} from 'react-native-elements'
import {Modal,Portal,Provider}from 'react-native-paper'
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
let emps=[];
let accessible;
let flag=false
export default function TimeoffHistory({navigation}){
   const [emai,setEmail]=useState("");
   const [requests,setRequests]=useState([]);
   const [requests2,setRequests2]=useState([]);

   const [employees,setEmployees]=useState([]);
   const [show,setShow]=useState(false);
   const [show2,setShow2]=useState(false);
const [desc,setDes]=useState("");
   const [start,setStart]=useState("");
   const [end,setEnd]=useState("");
   const [durationf,setDuration]=useState("");

   const [Description,setDescription]=useState("");
   const [datestart, setDatestart] = useState(new Date())
   const [dateend, setDateend] = useState(new Date())
   const [type,setType]=useState("");
   const [showe,setshoe2]=useState(false)
   const [showe2,setshoe22]=useState(false)
   const [search,setSearch]=useState(false)
   const[selected2,setSelected2]=useState("")
   const [manager,setManager]=useState("")
   const [hr,setHR]=useState("")
const[text,setText]=useState("see older")
const[index,setIndex]=useState(5)
const[flagA,setFlagA]=useState(true)

   const[totalDays,setTotaldays]=useState([]);




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



       employees.map((val)=>{
         if(val.email===emai){
            
            idEm=val._id;
            first=val.firstName;
            last=val.lastName;
            extrav=val.ExtrsVacation;
            extraw=val.ExtraWFH;
         
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
         Axios.get('http://10.0.2.2:3001/read').then((response)=>{
        setRequests(response.data);
       
      
      })
       },[requests])
       requestOffEm=[];

  requests.map((val)=>{
    
    let ss= moment(val.Starting).format('YYYY/MM/DD');
    let ee= moment(val.Ending).format('YYYY/MM/DD');

      
    let ss2= moment(val.Starting)
    let ee2= moment(val.Ending)
    const y=moment.preciseDiff(ss2,ee2,true)
    const u=y['days']
     let datayy={
       'key':val._id,
       'id':val._id,
       'Emid':val.emplyeeId,
        'Type':val.Type,
        'Description':val.Description,
        'Starting':ss,
        'Ending':ee,
        'duration':u+" days",
        'StatusHR':val.StatusHR,
        'StatusManager':val.StatusManager,
        'Deliver':val.Deliver,
        'Flag':val.Flag,


    
 };

 requestOffEm.push(datayy);
    
  }
   )
 
       
  
    requestOffEm.map((val)=>{
  employees.map((valr)=>{
    if(valr._id===val.Emid){
      val.Emid=valr.firstName+" "+valr.lastName;
    }
  })
})


const myData = [].concat(requestOffEm)
.sort((a, b) => a.Deliver > b.Deliver ? -1 : 1)

policyAll=[];
resultFinal=[];
types=[];
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
    types.push(val.type);

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
let clockem=[];

emps=[];
employees.map((val)=>{
 emps.push({
   'key':val._id,
   'value':val.firstName+" "+val.lastName,
 })
})

const handlesearch =()=>{
  clockem=[];
 
    
     myData.map((valk)=>{
       if(valk.email===selected2){
 clockem.push(valk)
       }
     })
 
 
   
 


 setSearch(true)

}

const Endsearch=()=>{
  setSearch(false)
}

return ( 
  <ScrollView style={{width:'100%'}}>
<View >
       <HomeHeader navigation={navigation}/>
     
       <View>

       <View >
    <View  style={{margin:20,flexDirection:'row'}}>
 
               <Picker style={{width:200}}
 selectedValue={selected2}
 onValueChange={(itemValue,itemIndex)=>setSelected2(itemValue)}>
   {
     emps.map((val)=>{
       return <Picker.Item label={val.value} key={val.key}  value={val.value}/>
     })
   }
 </Picker>

<Ionic name="filter" style={{marginVertical:10,marginHorizontal:10}}  size={30} onPress={handlesearch}/>

<Filter name="filter-off-outline"   size={30} style={{
backgroundColor:'white',
borderRadius:100,
marginVertical:10,
height:40,

color:'grey'}}
      onPress={Endsearch}
      />
              </View>

 
    </View>
<View>

       


<Text style={{backgroundColor:'#D8D5D5',
fontSize:20,fontWeight:'800',padding:20,color:colors.buttons}}>History of Time off Requests</Text>
<TouchableOpacity style={styles.container}  >

<Text style={styles.text}> Name       </Text>

    <Text style={styles.text}>   Type   </Text>
    <Text style={styles.text}>    Status </Text>

   
   
    </TouchableOpacity>

 {search?
 <View>
   {
  myData.map((val)=>{

    if(val.Emid===selected2){

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
      t="WFH";
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
       setDuration( val.duration)
       setEnd(val.Ending)
       setDescription(val.Description)
       setHR(val.StatusHR)
       setManager(val.StatusManager)
       console.log(val.Flag+"")
       setFlagA(val.Flag)
      
       
       

       
       }}  >
<Text style={styles.text2}> {val.Emid}</Text>
<Text style={styles.text2}>{t}</Text>
<Text style={styles.text2}>{j} </Text>
<View style={{marginLeft:-60,marginTop:50,justifyContent:'flex-end',alignSelf:'flex-end'}}>
  <Text
  style={{fontWeight:'bold',color:'grey'}}
  >{moment(val.Deliver).format("YYYY-MM-DD")}</Text>
</View>




</TouchableOpacity>


 </View>
    }
   
  
    

  })

}

 </View>:<View>
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
      t="WFH";
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
        
        
        <TouchableOpacity style={styles.container} 
        onPress={()=>{
           
           setShow(true)
           setStart(val.Starting)
           setDuration( val.duration)
           setEnd(val.Ending)
           setDescription(val.Description)
           setHR(val.StatusHR)
           setManager(val.StatusManager)
           console.log(val.Flag+"")
           setFlagA(val.Flag)
           

           
           }}  >
    <Text style={styles.text2}> {val.Emid}</Text>
    <Text style={styles.text2}>{t}</Text>
    <Text style={styles.text2}>{j} </Text>
    <View style={{marginLeft:-60,marginTop:50,justifyContent:'flex-end',alignSelf:'flex-end'}}>
      <Text
      style={{fontWeight:'bold',color:'grey'}}
      >{moment(val.Deliver).format("YYYY-MM-DD")}</Text>
    </View>


   
   
    </TouchableOpacity>


     </View>

  })

}
  </View>}   

      
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



 { show && 
 <Provider>
  <Portal>
    <Modal visible={show} 
    contentContainerStyle={{backgroundColor:'white',padding:20}}
    onDismiss={()=>setShow(false)}>
  

 <View style={{flexDirection:'column'}}>
 
<View>
  {flagA?
  <View>{(hr===undefined)?<Text style={styles.text}>HR response: Waiting</Text>:
 <Text style={styles.text}>HR response: {hr}</Text>
}
</View>
:
<View>
  {(manager===undefined)?<Text style={styles.text}>Manager Response: Waiting</Text>:
   <Text style={styles.text}>Manager Response: {manager}</Text>
}
{(hr===undefined)?<Text style={styles.text}>HR response: Waiting</Text>:
 <Text style={styles.text}>HR response: {hr}</Text>
}</View>}

</View>


 <Text style={styles.text}>Duration: {durationf}</Text>

    <Text style={styles.text}>Start Date: {start} </Text>
    <Text style={styles.text}> End Date: {end}</Text>
    <Text style={styles.text}>Description: {Description}</Text>
    </View>
    </Modal>
  </Portal>
 </Provider>
}









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
