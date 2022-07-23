import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity, Alert } from 'react-native';
import {colors,parameters} from '../global/styles'
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import Axios from 'axios'
import moment from 'moment'
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
require('moment-precise-range-plugin');
import { v4 as uuidv4 } from 'uuid';
export default function Clock(){
const [inClock,setClock]=useState();
const[hours,setHours]=useState(0);
const[minutes,setMinutes]=useState(0);
const[seconds,setSeconds]=useState();
const [email,setEmail]=useState('')
const [clocks,setClocks]=useState([])

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
  setEmail(datay.email);
 


} else

{
    alert("not user")
  
}

        


      }
      else{
        
       
        
      }
    } catch(e) {
      // error reading value
      alert("wrong")
    }
  }
  getData()
  
  const getData2 = async () => {
    try {
        useEffect(()=>{
            Axios.get('http://10.0.2.2:3001/getClock').then((response)=>{
                setClocks(response.data);
          
              })
              let flag=false;
              clocks.map((val)=>{
                if(val.email===email){
                    if(val.Clockout==null){
    
                        console.log("aseel")
                        const y=moment();
                        const y2=moment(val.Clockin)
                        const y3=moment.preciseDiff(y,y2,true);
                        const s=y3['hours']*60*60+y3['minutes']*60+y3['seconds']
                       setSeconds(s)
                       setClock(true)
                       flag=true;
        
                    }
                }
              })
              if(flag===false){
                setSeconds(0)
                       setClock(false)
    
              }
    
           
        })
      
        
      
      }
     catch(e) {
      // error reading value
      alert("wrong")
    }
  }
  getData2()

  
  



const padTTwo=(number)=>(number <=9 ? `0${number}`:number);

const displayTime=(seconds)=>{
    let minute=0;
    let hour=0;
    if(seconds<0){
        seconds=0

    }
    if(seconds<60){
return `00:00:${padTTwo(seconds)}`
    }
    let remainSeconds=seconds%60;
    
    minute=(seconds-remainSeconds)/60

if(minute<60){
return `00:${padTTwo(minute)}:${padTTwo(remainSeconds)}`
    }
    let remainminutes=minute%60;
    
    hour=(minute-remainminutes)/60
 
    return `${padTTwo(hour)}:${padTTwo(remainminutes)}:${padTTwo(remainSeconds)}`

}


      

async function handleclock(){
    setClock(!inClock)
    if(!inClock){
        const inC =moment();
        const response = await fetch('http://10.0.2.2:3001/insert_clock', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        email:email,
        Clockin:inC,
			}),

		})
    

    }
    if(inClock){
      
        const outC=moment()
        
        const response = await fetch('http://10.0.2.2:3001/update_clock', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        email:email,
        Clockout:outC,
			}),

		})


    }
   

  
   
}
useEffect(()=>{
  let interval=null;
  if(inClock){
  
    interval=setInterval(()=>{
        setSeconds(seconds+1)
        displayTime(seconds)
        if(seconds>=54000){
            setClock(!inClock)
            //send notification you are 
            //in from 15 hours clocked out automaticaly
            const data = {
              message:"You have clocked in fot 15 hours,we clocked you automatically",
              Rec_email:email
            };
            
            setDoc(doc(db,"notifications",uuidv4()),data);



        }

    },1000)

  }
  else{
    
    clearInterval(interval)
    setSeconds(0)
   
 


  }
  return ()=>clearInterval(interval)

},[seconds,inClock])



    return (<View >
<View style={{margin:40,alignItems:'center'}}>
    <Text style={{fontSize:50,fontWeight:'bold'}}>{displayTime(seconds)}</Text>

   
</View>

       <TouchableOpacity>
        <View >
           

        <Button 
        buttonStyle={{borderRadius:100,margin:20,padding:10,marginTop:50,backgroundColor:inClock?'#FF5733':'#FFC300'}}
        titleStyle={{fontSize:25,fontWeight:'bold'}}
        title={inClock?'Clock out':'Clock in'} 
        onPress={handleclock}
        />
        </View>
       </TouchableOpacity>
       

    </View>);
}
const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      backgroundColor: colors.buttons,
      height: parameters.headerHeight,
      justifyContent: 'center',
    },
    Title:{
        fontSize:22,
        color:colors.headerText,
        marginTop:13,
        fontWeight:"bold",
        

    },
  });