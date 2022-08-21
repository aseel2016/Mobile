import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/home/Home'
import RootClient from './ClientTabs'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon4  from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestOFF from '../pages/TimeoffRequest';
import TimeoffHistoryHR from '../pages/TimeoffHistoryHR'
import { Ionicons } from '@expo/vector-icons';
import AllTeams from '../pages/Allteam'
import { View } from 'react-native';
import Icon5  from 'react-native-vector-icons/MaterialIcons';


import Icon44  from 'react-native-vector-icons/AntDesign';
import Employees from '../pages/Employees';
import Calender from '../pages/Calender';
import Location from '../pages/Location';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Expenses from '../pages/Expenses';
import RecentExpenses from '../pages/RecentExpenses';
import {colors} from '../global/styles'
import Profile from '../pages/Profile'
import Team from '../pages/Team'
import Icon336 from 'react-native-vector-icons/FontAwesome';

import ClockHistory from '../pages/ClockHistory'
import TimeoffHistory from '../pages/TimeoffHistory'
import Drawercontent  from '../components/DrawerContent';
import Recruitment  from '../pages/Recruitmrnt';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import  Axios  from 'axios';
import Reset from '../pages/ResetPassword'
import Chat from'../pages/Chat'
import PostJob from '../pages/PostJob';
import Salary from '../pages/Salary';
import ChartExpenses from '../pages/ChartExpenses'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useNavigationContainerRef } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();
const GlobalStyles = {
  colors: {
    primary50: '#e4d9fd',
    primary100: '#c6affc',
    primary200: '#a281f0',
    primary400: '#5721d4',
    primary500: '#3e04c3',
    primary700: '#2d0689',
    primary800: '#200364',
    accent500: '#f7bc0c',
    error50: '#fcc4e4',
    error500: '#9b095c',
    gray500: '#39324a',
    gray700: '#221c30',
  },
};
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
    screenOptions={{
     headerShown:false, 
     tabBarStyle: { backgroundColor: "#201858"},
     tabBarActiveTintColor: GlobalStyles.colors.accent500,  }}
     
    >
       <BottomTabs.Screen name="ChartExpenses" component={ChartExpenses} 
         options={{
   
          tabBarLabel: 'Net chart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen name="Expenses" component={Expenses} 
         options={{
   
          tabBarLabel: 'Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} 
        options={{
         
          tabBarLabel: 'Income',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="server-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen name="Salary" component={Salary} 
        options={{
         
          tabBarLabel: 'Salary',
          tabBarIcon: ({ color, size }) => (
            <Icon336 name="money" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
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
          {accessible?  <Drawer.Screen name="TimeoffHistoryHR" component={TimeoffHistoryHR} 
          options={{
            title:"Time off History",
           
            drawerIcon:({focussed,size})=>(
            <Icon2 name="holiday-village" color={colors.buttons} size={size} />
            )

          }}
          />:  <Drawer.Screen name="TimeoffHistory" component={TimeoffHistory} 
          options={{
            title:"Time off History",
           
            drawerIcon:({focussed,size})=>(
            <Icon2 name="holiday-village" color={colors.buttons} size={size} />
            )

          }}
          />}
       
           {accessible?null:
          <Drawer.Screen name="RequestOFF" component={RequestOFF} 
          options={{
            title:" Time off requests",
           
            drawerIcon:({focussed,size})=>(
            <Icon2 name="holiday-village" color={colors.buttons} size={size} />
            )

          }}
          />
        }
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
       
         
              <Drawer.Screen name="MyCalender" component={Calender} 
          options={{
            title:"My Calender",
           
            drawerIcon:({focussed,size})=>(
            <Icon name="calendar" color={colors.buttons} size={size} />
            )

          }}
          />
        
          {accessible?   <Drawer.Screen name="PostJob" component={PostJob} 
     options={{
      title:"Post new Job",
      
      
       drawerIcon:({focussed,size})=>(
       <Icon5 name="add-circle-outline" color={colors.buttons} size={size} />
       )

     }}
     />:null
         
      }
          {accessible?   <Drawer.Screen name="AllTeams" component={AllTeams} 
     options={{
      title:"Teams",
      
      
       drawerIcon:({focussed,size})=>(
        <Icon44 name="team" color={colors.buttons} size={size} />
        )

     }}
     />:null
         
      }
          
          {accessible?   <Drawer.Screen name="ManageExpenses" component={ExpensesOverview} 
     options={{
      
      title:"Manage Expenses ",
       drawerIcon:({focussed,size})=>(
       <Icon4 name="calculator-variant-outline" color={colors.buttons} size={size} />
       )

     }}
     />:null
         
      }

{accessible?   <Drawer.Screen name="Employees" component={Employees} 
     options={{
      
      
       drawerIcon:({focussed,size})=>(
       <Icon336 name="group" color={colors.buttons} size={size} />
       )

     }}
     />:null
         
      }
{accessible?null:
          <Drawer.Screen name="Team" component={Team} 
          options={{
            title:"Team",
           
            drawerIcon:({focussed,size})=>(
            <Icon44 name="team" color={colors.buttons} size={size} />
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