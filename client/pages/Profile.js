import HomeHeader from '../components/HomeHeader';
import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, 
    Text, 
    View,
    Alert,
    Linking,
    Pressable,
    TouchableHighlight,
    Switch,
    Dimensions,
    TextInput} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

  import {
    Avatar,Button
  }from 'react-native-elements'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';  
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon2 from 'react-native-vector-icons/FontAwesome';

import Icon3 from 'react-native-vector-icons/MaterialIcons';

import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/Fontisto';


import Icon6 from 'react-native-vector-icons/FontAwesome5';

  import {colors}from '../global/styles'
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { serverTimestamp } from 'firebase/firestore';
  
 
  
  let officeNew;
  let access;
  let idNew;
  let jobNew;
  let teamNew;
  let firstNew;
  let lastNew;
  let ageNew;
  let phoneNew;
  let emailNew;
  let addNew;
  let hiringNew;
  let bankNew;
  let salaryNew;
  let startKit;
  let image;
  let extrVactionanew;
  let extraWFHnew;
  let hoursNew;
export default function Profile({navigation}){
   const [email,setEmail]=useState('')
   const [employees,setEmployees]=useState([]);

   const[imagepicked,setPicked]=useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg");

   const[firstName,setFirstName]=useState("");
   const[lastName,setLastName]=useState("");
   const[phone,setPhoneNumber]=useState("");
   const[job,setJob]=useState("");
   const[address,setAddress]=useState("");
   const[office,setoffice]=useState("");
   const[start,setStart]=useState("");
   const[team,ssetteam]=useState("");

  
  

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

   useEffect(()=>{
     Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
         setEmployees(response.data);
   
       })
    
   },[employees]);


useEffect(()=>{
  employees.map((val)=>{
    if(val.email===email){
      image=val.image;
      firstNew=val.firstName;
      lastNew=val.lastName;
      addNew=val.Address;
      phoneNew=val.phoneNumber;
      teamNew=val.Team;
      startKit=val.giveEquipment;
      officeNew=val.office;
      jobNew=val.jobTitle;
   
   
      
   
     
    }
   })
  setFirstName(firstNew)
  setLastName(lastNew)
  setPhoneNumber(phoneNew)
  setPicked(image);
  setAddress(addNew)
  setJob(jobNew)
  setoffice(officeNew)
  setStart(startKit)
 ssetteam(teamNew)
  
  },[employees])
return ( 
<View >
       <HomeHeader navigation={navigation}/>
       <View style={{flexDirection:"row",alignItems:'center',marginTop:30,marginLeft:20}}>
    <Avatar
    rounded
    avatarStyle={styles.avatar}
    size={100}
    source={{uri:image}}

    />
    
    <View style={{marginLeft:10,paddingRight:20}}>
        <Text style={{fontWeight:'bold',fontSize:19,color:'#3D4B40'}}>{firstName+" "+lastName} </Text>
        <Text style={{fontWeight:'bold',fontSize:16,color:'#3D4B40'}}>{email}</Text>

    </View>
  
 
       
    <Icon6 name="user-edit" size={30} 
    color="purple" style={{marginBottom:100,marginLeft:-10}}
    onPress={() => {navigation.navigate("EditProfile")}}
    />
    
</View>
<View style={styles.userInfoSection}>
      <View style={styles.row}>
      <Icon name="map-marker-radius" color={colors.buttons} size={28}/>
          <Text style={{color:colors.buttons, marginLeft: 20,fontSize:19,fontWeight:'800'}}>{address}</Text>
      </View>

      <View style={styles.row}>
      <Icon name="phone" color={colors.buttons}  size={28}/>
          <Text style={{color:colors.buttons, marginLeft: 20,fontSize:19,fontWeight:'800'}}>{phone}</Text>
      </View>

      <View style={styles.row}>
      <Icon name="email" color={colors.buttons}  size={28}/>
          <Text style={{color:colors.buttons, marginLeft: 20,fontSize:19,fontWeight:'800'}}>{email}</Text>
      </View>

      <View style={styles.row}>
      <Icon2 name="group" color={colors.buttons}  size={28}/>
          <Text style={{color:colors.buttons, marginLeft: 20,fontSize:19,fontWeight:'800'}}>{team} Team</Text>
      </View>
      <View style={styles.row}>
      <Icon name="tools" color={colors.buttons}  size={28}/>
          <Text style={{color:colors.buttons, marginLeft: 20,fontSize:19,fontWeight:'800'}}>StartKit :{start} </Text>
      </View>

    </View>
    <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
           <Icon name="office-building-marker-outline" color={colors.buttons}  size={30}/>
           <Text style={{color:colors.buttons, fontSize:18,fontWeight:'800'}}>{office}</Text>

           
          </View>
          <View style={styles.infoBox}>
          <Icon3 name="work" color={colors.buttons} size={30}/>
           <Text style={{color:colors.buttons, fontSize:18,fontWeight:'800'}}>{job}</Text>

           
         
          </View>
      </View>
      
      <View style={styles.menuWrapper}>
        <TouchableHighlight  activeOpacity={0.6}
  underlayColor="#DDDDDD" onPress={() => {navigation.navigate("Team")}}>
          <View style={styles.menuItem}>
            <Icon3 name="group-work" color="#FF5733" size={30}/>
            <Text style={styles.menuItemText}>Team</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6}
  underlayColor="#DDDDDD" onPress={() => {navigation.navigate("ClockHistory")}}>
          <View style={styles.menuItem}>
            <Icon4 name="back-in-time" color="#FF5733" size={30}/>
            <Text style={styles.menuItemText}>Clock History</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} onPress={() => {navigation.navigate("TimeoffHistory")}}
  underlayColor="#DDDDDD" >
          <View style={styles.menuItem}>
            <Icon5 name="holiday-village" color="#FF5733" size={25}/>
            <Text style={styles.menuItemText}>Time off History</Text>
          </View>
        </TouchableHighlight>
   
      </View>
     


    </View>
   );
}
const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   userInfoSection: {
     paddingHorizontal: 30,
     marginTop:30,
     marginBottom: 25,
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
   },
   caption: {
     fontSize: 14,
     lineHeight: 14,
     fontWeight: '500',
   },
   row: {
     flexDirection: 'row',
     marginBottom: 10,
   },
   infoBoxWrapper: {
     borderBottomColor: '#dddddd',
     borderBottomWidth: 1,
     borderTopColor: '#dddddd',
     borderTopWidth: 1,
     flexDirection: 'row',
     height: 100,
   },
   infoBox: {
     width: '50%',
     alignItems: 'center',
     justifyContent: 'center',
   },
   menuWrapper: {
     marginTop: 10,
   },
   menuItem: {
     flexDirection: 'row',
     paddingVertical: 15,
     paddingHorizontal: 30,
   },
   menuItemText: {
     color:colors.buttons,
     marginLeft: 22,
     fontWeight: '800',
     fontSize: 18,
    
   },
   avatar: {
      borderWidth:2,
      borderColor:"white",

   
    },
 });

