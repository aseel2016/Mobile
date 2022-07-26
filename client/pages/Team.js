import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput, ScrollView} from 'react-native';


import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
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
export default function Team({navigation}){
    const [emai,setEmail]=useState("");
    const [employees,setEmployees]=useState([]);
    const [teamLeo,setTeams]=useState([]);
  
     names=[];
     teamEm=[];
     finalteam=[];
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
     
    },[]);
  
  
    useEffect(()=>{
      Axios.get('http://10.0.2.2:3001/getAllteams').then((response)=>{
        setTeams(response.data);
      })
      
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

    
    
  
return ( 
<View >
    <HomeHeader navigation={navigation}/>
    <ScrollView style={{width:'100%'}}>
    {
        flag?<View> 
            <Text 
        style={{fontSize:25,fontWeight:"bold",padding:20,backgroundColor:'#FEC49C'}}
        
        > 💢 Teams</Text>
        <View>
          <Button title="Who is out the office ?" buttonStyle={{width:200,marginLeft:180,margin:20,backgroundColor:colors.buttons}}
          titleStyle={{fontSize:18,fontWeight:'bold'}}
          onPress={()=>navigation.navigate("OutTheoffice")}
    
          />
        </View>

        
          {finalteam.map((val)=>{
            return(<View key={val.group}>
              <Text style={{padding:20,backgroundColor:'#E2E0E0',fontSize:20,fontWeight:'bold'}}>🔹{val.team}</Text>
              
                {
                  val.group.map((valt)=>{
                    return(<Text key={valt} style={{fontSize:18,fontWeight:'bold',margin:18,marginTop:-10}}>{valt}</Text>)                    
                  })
                }
              
            </View>)
          })}
       
        </View>
        :
        <View>
        <Text
               style={{fontSize:25,fontWeight:"bold",padding:20,backgroundColor:'#FEC49C'}}
 
        >💥My team</Text>
         <Button title="Who is out the office ?" buttonStyle={{width:200,marginLeft:180,margin:20,backgroundColor:colors.buttons}}
          titleStyle={{fontSize:18,fontWeight:'bold'}}
          onPress={()=>navigation.navigate("OutTheoffice")}
    
          />
        
        <Text style={{padding:20,backgroundColor:'#E2E0E0',fontSize:20,fontWeight:'bold'}}>🔹{MyTeam}</Text>

        {employees.map((val)=>{
            if(val.Team===MyTeam && val._id!==idMe){
            return(<View key={val._id}>
            <Text style={{fontSize:18,fontWeight:'bold',margin:18,}}>{val.firstName+" "+val.lastName}</Text>                 

                
            </View>)}
          })}
    

      
        
        
        </View>
    }
    </ScrollView>


    
      
       


    </View>
   );
}


