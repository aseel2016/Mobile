import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput, ScrollView} from 'react-native';

import moment from 'moment'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import Icon3 from 'react-native-vector-icons/EvilIcons';

import {Button} from 'react-native-elements'
import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import  Axios  from 'axios';
import { colors } from '../global/styles';
let idMe;
let names=[];
let teamEm=[];
let finalteam=[];
let MyTeam;
let employeesAll=[];
let employeesAll2=[];
let  employeesAll3=[];
let requestsAll=[];
export default function AllOutTheoffice({navigation}){
    const [emai,setEmail]=useState("");
    const [employees,setEmployees]=useState([]);
    const [teamLeo,setTeams]=useState([]);
    
    const [requests,setRequests]=useState([]);

  
  
   
     useEffect(()=>{
      let isMounted=true;
      if(isMounted){

      Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
          setEmployees(response.data);
    
        })
      }
      return () => { isMounted = false };
     
    },[]);
    useEffect(()=>{
        Axios.get('http://10.0.2.2:3001/getAccepted').then((response)=>{
          setRequests(response.data);
         
          
        })
        },[]);
    employeesAll3=[];
    employeesAll=[];
    requestsAll=[];
    useEffect(()=>{
      let isMounted=true;
      if(isMounted){
      Axios.get('http://10.0.2.2:3001/getAllteams').then((response)=>{
        setTeams(response.data);
      })
    }

    return () => { isMounted = false };
      
      },[]);
    


requestsAll=[];
    requests.map((val,key)=>{
        const y=new Date().getTime()

        const y1=new Date(val.Starting).getTime()
        const y3=new Date(val.Ending).getTime()
        

        
       
        const formattedDate = moment(val.Starting).utc().format('YYYY-MM-DD');
       
        const formattedDate2 = moment(val.Ending).utc().format('YYYY-MM-DD');
        if(y>=y1 && y<=y3 ){
       employees.map((valid)=>{
          if(valid._id===val.emplyeeId){
            requestsAll.push({
              'id':val._id,
              'name':valid.firstName+" "+valid.lastName,
              'Type':val.Type,
              'start':formattedDate,
              'end':formattedDate2,
              'team':valid.Team,
            })


          }
        })
      }
        
      }
      )
let g=requestsAll.length;
let gg=true;
if(g>0){
gg=true;
}
else{
  gg=false;
}
return ( 
  <ScrollView style={{width:'100%'}}>
<View >

      { gg?
        requestsAll.map((val)=>{
          let type;let colorr;
          if (val.Type==="Sick leave"){ type='💉Sick leave';colorr="#FF7000"}
        else if (val.Type==="Work from Home"){ type=' 🏡 WFH'; colorr="#6E8EE4"}
        else if (val.Type==="parental leave"){ type='parental leave'; colorr="#FFC300"}
        else if (val.Type==="Vacation"){ type=' 🏖 Vacation';colorr="#53E66C"}
        else{
          type=val.Type;
    
        }
          return <View  key={val.id} style={{marginTop:10}} >


            <View style={{borderRadius:6,elevation:3,backgroundColor:colorr,
            shadowOffset:{width:1,height:1},shadowColor:'#333',shadowOpacity:0.3,shadowRadius:2,
            marginHorizontal:4,marginVertical:6,
            paddingVertical:10,
            
          
          
          }}>
            <Text style={{marginVertical:20,fontSize:19,fontWeight:'700',color:'purple'}}> {val.team}</Text>
<View style={{flexDirection:'row',flexWrap:'wrap'}}>
<Icon3 name='clock' size={50} color={colors.buttons}  style={{marginVertical:10}}/>
              
              <Text style={{marginVertical:15,fontSize:20,fontWeight:'700'}}>{val.name} took ({type} )</Text>
              <Text style={{marginVertical:20,fontSize:19,fontWeight:'700'}}>Starting: {val.start },Ending : {val.end}</Text>

</View>
             
            </View>
          
          </View>
        })
        :<View style={{alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:25,margin:20,fontWeight:'700'}}>🎉No one is out the office</Text></View>
      }
       


    </View>
    </ScrollView>
   );
}


