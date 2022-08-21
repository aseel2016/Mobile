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
export default function OutTheoffice({navigation}){
    const [emai,setEmail]=useState("");
    const [employees,setEmployees]=useState([]);
    const [teamLeo,setTeams]=useState([]);
    
    const [requests,setRequests]=useState([]);

  
  
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
      let isMounted=true;
      if(isMounted){

      Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
          setEmployees(response.data);
    
        })
      }
      return () => { isMounted = false };
     
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
      employees.map((val)=>{
        if(val.email===emai){
        MyTeam=val.Team;
        idMe=val._id;
        
        }
        })
        
  
    
      let flag=false;
      let PositionName="Employee"
      names=[];
      employeesAll2=[]
      
      teamLeo.map((val,key)=>{
      
  
          if(val.Manager===idMe){ flag=true;PositionName="Manager"
        names.push(val.name)
        
        }
          else if(val.teamLeader===idMe){flag=true;PositionName="Team Leader"
          names.push(val.name)
        }
          
        
      }
      );

  
      teamEm=[];
      finalteam=[];
        employees.map((vale)=>{
            if(vale._id!==idMe){
            names.map((val)=>{
                
                if( vale.Team===val){
                     teamEm.push({
                        'name':vale.firstName+" "+vale.lastName,
                        'team':val
                     })

                }
            

            })
        }
           
        })
     names.map((team)=>{
        finalteam.push({'team':team,"group":[""]})
     })  
finalteam.map((valee)=>{
  teamEm.map((val)=>{
    if(val.team===valee.team){
      valee.group.push(val.name)
    }
   })
})

finalteam.map((val)=>{
    val.group.map((y)=>{
        employeesAll.push(y)
    })
})

employees.map((val)=>{
    employeesAll.map((vale)=>{
        if(val.firstName+" "+val.lastName=== vale){
            employeesAll3.push({'id':val._id,"name":val.firstName+" "+val.lastName})
          
        }
    }) 
})
employees.map((vale)=>{
    if(vale._id!==idMe){
        if(vale.Team===MyTeam){
            employeesAll2.push({'id':vale._id,"name":vale.firstName+" "+vale.lastName})
        }
    
}
   
})
useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAccepted').then((response)=>{
      setRequests(response.data);
     
      
    })
    },[]);
requestsAll=[];
    requests.map((val,key)=>{
     
        const y=new Date().getTime()

        const y1=new Date(val.Starting).getTime()
        const y3=new Date(val.Ending).getTime()
        
       
        const formattedDate = moment(val.Starting).utc().format('YYYY-MM-DD');
       
        const formattedDate2 = moment(val.Ending).utc().format('YYYY-MM-DD');
        if( y>=y1 && y<=y3 ){
        flag?employeesAll3.map((valid)=>{
          if(valid.id===val.emplyeeId){
            requestsAll.push({
              'id':val._id,
              'name':valid.name,
              'Type':val.Type,
              'start':formattedDate,
              'end':formattedDate2,
            })


          }
        })
        :employeesAll2.map((valid)=>{
          if(valid.id===val.emplyeeId){
            requestsAll.push({
              'id':val._id,
              'name':valid.name,
              'Type':val.Type,
              'start':formattedDate,
              'end':formattedDate2,
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
            <View style={{flexDirection:'row',flexWrap:'wrap',borderRadius:6,elevation:3,backgroundColor:colorr,
            shadowOffset:{width:1,height:1},shadowColor:'#333',shadowOpacity:0.3,shadowRadius:2,
            marginHorizontal:4,marginVertical:6,
            paddingVertical:10,
            
          
          
          }}>
              <Icon3 name='clock' size={50} color={colors.buttons}  style={{marginVertical:10}}/>
              
              <Text style={{marginVertical:15,fontSize:20,fontWeight:'700'}}>{val.name} took ({type} )</Text>
              <Text style={{marginVertical:20,fontSize:19,fontWeight:'700'}}>Starting: {val.start },Ending : {val.end}</Text>

            </View>
          </View>
        })
        :<View style={{alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:25,margin:20,fontWeight:'700'}}>🎉No one is out the office</Text></View>
      }
       


    </View>
   );
}


