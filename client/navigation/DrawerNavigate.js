import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/home/Home'
import RootClient from './ClientTabs'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon4  from 'react-native-vector-icons/AntDesign';
import RequestOFF from '../pages/TimeoffRequest';

import { View } from 'react-native';
import Icon5  from 'react-native-vector-icons/FontAwesome';

import Calender from '../pages/Calender';
import Location from '../pages/Location';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../global/styles'
import Profile from '../pages/Profile'
import Team from '../pages/Team'
import ClockHistory from '../pages/ClockHistory'
import TimeoffHistory from '../pages/TimeoffHistory'
import Drawercontent  from '../components/DrawerContent';
import Recruitment  from '../pages/Recruitmrnt';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import  Axios  from 'axios';
import Reset from '../pages/ResetPassword'
import Chat from'../pages/Chat'
import { useNavigationContainerRef } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

let idMe;
let accessible;
export default function DawNav() {


  const [emai,setEmail]=useState("");
  const [employees,setEmployees]=useState([]);
  const [teamLeo,setTeams]=useState([]);


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
      
      idMe=val._id;
      
      }
      })
      

  
    let flag=false;
    teamLeo.map((val,key)=>{
    

        if(val.Manager===idMe){ flag=true;
      }
        else if(val.teamLeader===idMe){flag=true;
      }
        
      
    }
    );



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
    return (
     
        <Drawer.Navigator useLegacyImplementation  screenOptions={{headerShown:false}}
        drawerContent={(props,navigation)=><Drawercontent navigation={navigation} {...props}/>}>
          <Drawer.Screen name="RootClient" component={RootClient} 
          options={{
            title:"Home",
           
            drawerIcon:({focussed,size})=>(
            <Icon name="home" color={colors.buttons} size={size} />
            )

          }}
          />
          <Drawer.Screen name="Profile" component={Profile} 
          options={{
            title:"Profile",
           
            drawerIcon:({focussed,size})=>(
            <Icon3 name="account-circle-outline" color={colors.buttons} size={size} />
            )

          }}
          />
           <Drawer.Screen name="Reset" component={Reset} 
          options={{
            title:"Reset password",
           
            drawerIcon:({focussed,size})=>(
            <Icon3 name="form-textbox-password" color={colors.buttons} size={size} />
            )

          }}
          />

<Drawer.Screen name="ClockHistory" component={ClockHistory} 
          options={{
            title:"Clock in History",
           
            drawerIcon:({focussed,size})=>(
            <Icon name="back-in-time" color={colors.buttons} size={size} />
            )

          }}
          />
         <Drawer.Screen name="TimeoffHistory" component={TimeoffHistory} 
          options={{
            title:"Time off History",
           
            drawerIcon:({focussed,size})=>(
            <Icon2 name="holiday-village" color={colors.buttons} size={size} />
            )

          }}
          />
          <Drawer.Screen name="RequestOFF" component={RequestOFF} 
          options={{
            title:" Time off requests",
           
            drawerIcon:({focussed,size})=>(
            <Icon2 name="holiday-village" color={colors.buttons} size={size} />
            )

          }}
          />
           <Drawer.Screen name="MyLocation" component={Location} 
          options={{
            title:"Location History",
           
            drawerIcon:({focussed,size})=>(
            <Icon5 name="map-marker" color="green" size={size} />
            )

          }}
          />
          {flag ? <Drawer.Screen name="Recruitment" component={Recruitment} 
          options={{
            title:"Recruitment",
           
            drawerIcon:({focussed,size})=>(
            <Icon2 name="joomla" color={colors.buttons} size={size} />
            )

          }}
          />:
           null
          
          
          }
          {accessible?null:
         
              <Drawer.Screen name="MyCalender" component={Calender} 
          options={{
            title:"My Calender",
           
            drawerIcon:({focussed,size})=>(
            <Icon name="calendar" color={colors.buttons} size={size} />
            )

          }}
          />}

{accessible?null:
          <Drawer.Screen name="Team" component={Team} 
          options={{
            title:"Team",
           
            drawerIcon:({focussed,size})=>(
            <Icon4 name="team" color={colors.buttons} size={size} />
            )

          }}
          />}
          
          
          
       
            <Drawer.Screen name="Chat" component={Chat} 
          options={{
            title:"Chat",
           
            drawerIcon:({focussed,size})=>(
            <Icon2 name="messenger" color={colors.buttons} size={size} />
            )

          }}
          />
          
        </Drawer.Navigator>
     
    );
  }