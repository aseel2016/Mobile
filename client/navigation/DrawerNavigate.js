import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/home/Home'
import RootClient from './ClientTabs'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon4  from 'react-native-vector-icons/AntDesign';

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
import Chat from'../pages/Chat'
import { useNavigationContainerRef } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
export default function DawNav() {
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
           <Drawer.Screen name="MyLocation" component={Location} 
          options={{
            title:"My Location",
           
            drawerIcon:({focussed,size})=>(
            <Icon5 name="map-marker" color="green" size={size} />
            )

          }}
          />
            <Drawer.Screen name="MyCalender" component={Calender} 
          options={{
            title:"My Calender",
           
            drawerIcon:({focussed,size})=>(
            <Icon name="calendar" color={colors.buttons} size={size} />
            )

          }}
          />


          <Drawer.Screen name="Team" component={Team} 
          options={{
            title:"Team",
           
            drawerIcon:({focussed,size})=>(
            <Icon4 name="team" color={colors.buttons} size={size} />
            )

          }}
          />
       
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