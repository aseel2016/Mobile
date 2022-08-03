import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,ScrollView,useWindowDimensions,Alert,Dimensions,TextInput} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';  

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import RenderHtml from 'react-native-render-html';
import { colors } from '../global/styles';

let nameMe;
let myJobs=[];
export default function Recruitment({navigation}){
    const [emai,setEmail]=useState("");
    const [employees,setEmployees]=useState([]);
    const [jobs,setJobs]=useState([]);
const [show,setShow]=useState(false)
const [jobid,setJobid]=useState("")
    const { width } = useWindowDimensions();

  
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
  
  myJobs=[];
     useEffect(()=>{
      let isMounted=true;
      if(isMounted)
     { Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
          setEmployees(response.data);
    
        })}
        return () => { isMounted = false }
     
    },[]);
    useEffect(()=>{
      let isMounted=true
      if(isMounted)
       { Axios.get('http://10.0.2.2:3001/getAlljobs').then((response)=>{
            setJobs(response.data);
      
          })}
          return () => { isMounted = false }
       
      },[]);
  
  
    
      employees.map((val)=>{
        if(val.email===emai){
        
        nameMe=val.firstName+" "+val.lastName;
        
        }
        })
        jobs.map((val)=>{
            if(val.manager===nameMe && val.state!=="Finished"){
                myJobs.push(val);
            }
        })

        const m=myJobs.length;
        let r=true;
        if(m>0){
          r=true
        }
        else{
          r=false;
        }
        
return ( 
    <ScrollView style={{width:'100%'}}>
<View >
    <HomeHeader navigation={navigation}/>
    <View style={{backgroundColor:'#F4F9B0'}}>
    <Text style={{fontSize:25,
        margin:20,
        fontWeight:'bold'}}>📚 Posted jobs</Text>
        </View>
      

        {r?
            myJobs.map((val)=>{
             
                return (<View key={val._id} style={{backgroundColor:'#F8FEA1',borderColor:'grey',borderWidth:2,borderRadius:20}}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,margin:10,marginVertical:15,fontWeight:'bold'}}>{val.title} </Text> 
                  <Button title="🧐 Applicants "  
                  buttonStyle={{margin:8,marginVertical:15,backgroundColor:"#E61800"}}
                  titleStyle={{fontSize:16}}
                  onPress={()=>{
                  navigation.navigate("Applicants",{id:val._id})
                    setJobid(val._id)
                  }}
                  />

                  </View>

<View style={{margin:15}}>
 <RenderHtml
     contentWidth={width}
      source={{
        html: val.Description
      }}/>
<View style={{flexDirection:"row", flexWrap: 'wrap'}}>      
          {
    val.Keywords.map((val)=>{
    return <Text key={val}  style={{margin:10,
    padding:10,fontSize:15,fontWeight:"800",backgroundColor:colors.buttons,color:'white'
    }}>{val}
    </Text>
  })}
  </View>
          </View> 

          

                </View>);
            }):<View style={{alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:25,margin:20,fontWeight:'700'}}>✨ No Jobs related to you</Text></View>

           
        }

    </View>
    </ScrollView>

   );
}


