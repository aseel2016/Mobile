import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,ScrollView, Text
  , View,TouchableOpacity,Modal,Animated
  ,Alert,Dimensions,TextInput} from 'react-native';
  import { v4 as uuidv4 } from 'uuid';
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
         Axios.get('http://10.0.2.2:3001/read').then((response)=>{
        setRequests(response.data);
       
      
      })
       },[requests])
       requestOffEm=[];

       requests.map((val)=>{
         if(val.emplyeeId===idEm){
         let ss= moment(val.Starting).utc().format('YYYY/MM/DD');
         let ee= moment(val.Ending).utc().format('YYYY/MM/DD');
         const y=moment.preciseDiff(ss,ee,true)
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
     
     
         
      };
     
      requestOffEm.push(datayy);
         }
       }
        );

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
              r=moment.preciseDiff(ss,ee,true);
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

    async function handlerequest(){
      Alert.alert(type+desc+datestart+dateend)
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
     
      Axios.get('http://10.0.2.2:3001/read').then((response)=>{
        setRequests2(response.data);})
        requests2.map((val)=>{
          if(val.emplyeeId===idEm
            && val.Type===type && 
            val.Ending===dateend &&
            val.Statring===datestart && 
            val.Description===desc
            )
            {
              idReq=val._id;
            }

        })

       
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
       <HomeHeader navigation={navigation}/>
       <View style={{margin:20}}>
       <Button title="➕Send time off request" 
       onPress={()=>navigation.navigate("RequestOFF")}
       titleStyle={{fontSize:20}}
       buttonStyle={{backgroundColor:colors.buttons,borderRadius:100}}/>
       </View>
       

       {
        resultFinal.map((val)=>{
          if(val.type==="Vacation"){
            return(<View  key={val.key}>

              <Text style={{backgroundColor:'#FFC300',
             fontSize:25,fontWeight:'800',padding:20,
             }}
             > 🌈Vacation</Text>
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

       


       <Text style={{backgroundColor:'#D8D5D5',
       fontSize:20,fontWeight:'800',padding:20,color:colors.buttons}}>History of Time off Requests</Text>
       <TouchableOpacity style={styles.container}  >

           
           <Text style={styles.text}> Type       </Text>
           <Text style={styles.text}>   Duration</Text>
           <Text style={styles.text}>Status </Text>

          
          
           </TouchableOpacity>
       {
         requestOffEm.map((val)=>{
            let j="";

            if(val.StatusHR==="rejected"){
              
              j= <Text style={
                  {backgroundColor:'red',
                fontSize:20,
               fontWeight:'bold',
               margin:20,
               marginTop:30,
               

           }}>Rejected</Text>

            }
            else if (val.StatusHR==="accepted"){
              j= <Text style={
                  {backgroundColor:'green',
                fontSize:20,
               fontWeight:'bold',
               margin:10,
           }}>Accepted</Text>

            }
            else{
              j= <Text style={
                  {backgroundColor:'blue',
                fontSize:20,
               fontWeight:'bold',
               margin:10,
              
           }}>Waiting </Text>

            }
            return <View key={val.key}>
               
               
               <TouchableOpacity style={styles.container} onPress={()=>{
                  
                  setShow(true)
                  setStart(val.Starting)
                  setEnd(val.Ending)
                  setDescription(val.Description)

                  
                  }}  >
           
           <Text style={styles.text}> {val.Type}</Text>
           <Text style={styles.text}> {val.duration} </Text>
           <Text style={styles.text}>{j} </Text>
           <Icon3  style={styles.textIcon2} name='arrow-right' />


          
          
           </TouchableOpacity>


            </View>

         })
      
       }
        { show && <ModalPoup visible={show} >
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
           <Icon4  name='close'size={25} onPress={()=>setShow(false)}/>
          </View>
        </View>
      

        <View style={{flexDirection:'column'}}>
           <Text style={styles.text}>Start Date: {start} </Text>
           <Text style={styles.text}> End Date: {end}</Text>
           <Text style={styles.text}>Description: {Description}</Text>
           </View>
          
       
          




          
        
      </ModalPoup>}

    
      
       
      

       
       

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

