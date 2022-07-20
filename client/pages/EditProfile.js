import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TouchableOpacity, ImageBackground,TextInput} from 'react-native';

import { storage } from "../Firebase";
import {ref,uploadBytes,putFile,listAll,getDownloadURL} from 'firebase/storage';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { colors } from '../global/styles';
import {launchCameraAsync,launchImageLibraryAsync} from "expo-image-picker";

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
let extrVactionanew;
let extraWFHnew;
let hoursNew;
let image;
export default function EditProfile({navigation}){
    const [email,setEmail]=useState('')
    const [employees,setEmployees]=useState([]);
    const[imagepicked,setPicked]=useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg");

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[phone,setPhoneNumber]=useState("");
    const[emailNew,setEmailNew]=useState("");
    const[address,setAddress]=useState("");

    
   
 
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
     
    },[]);
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


 async function handleupdate(){


//Alert.alert(firstName+lastName+emailNew+phone+address+imagepicked)
{/*
const filrex=imagepicked.split('.').pop()

const imageRef=ref(storage,'files/'+email+"."+filrex)
uploadBytes(imageRef,pickedimage)
 */}



const response =  await fetch('http://10.0.2.2:3001/uploadImage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    
   email:email,
   first:firstName,
   last:lastName,
   add:address,
   phone:phone,
   image:imagepicked,




   
    
  }),
 
 })
 

 }
 const renderInner = () => (
  <View style={styles.panel}>
    <View style={{alignItems: 'center'}}>
      <Text style={styles.panelTitle}>Upload Photo</Text>
      <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
    </View>
    <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera} >
      <Text style={styles.panelButtonTitle}>Take Photo</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary} >
      <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.panelButton}
      onPress={() => bs.current.snapTo(1)}>
      <Text style={styles.panelButtonTitle}>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>);
 let bs = React.createRef();
 let fall = new Animated.Value(1);
useEffect(()=>{

setFirstName(firstNew)
setLastName(lastNew)
setPhoneNumber(phoneNew)
setPicked(image);
setAddress(addNew)
setEmailNew(email);


},[image])
const takePhotoFromCamera = async() => {
 try{
   const img=await launchCameraAsync({
     allowsEditing:true,
     aspect:[16,9],
     quality:0.5,
   })
   console.log(img);
   image=img.uri;
   setPicked(image);
   
 }
 catch(e){
   console.log(e)
 }
 
 
 }
 
 const choosePhotoFromLibrary = async() => {
 try{
   const img=await launchImageLibraryAsync({
     allowsEditing:true,
     aspect:[16,9],
     quality:0.5,
   })
   console.log(img);
   image=img.uri;
   setPicked(image);
 
  }
   catch(e){
     console.log(e)
   }
 }


return ( 
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
        <Animated.View style={{
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
      <View style={{alignItems: 'center',marginTop:30}}>
        <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri:imagepicked,
              }}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
          {firstNew+" "+lastNew}
        </Text>
      </View>
     

      <View style={styles.action }>
        <FontAwesome name="user-o" color="black" size={20} />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(Text)=>{setFirstName(Text)}}
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "black",
              fontSize:18
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="black"size={20} />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          onChangeText={(Text)=>{setLastName(Text)}}
          value={lastName}
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "black",
              fontSize:18
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <Feather name="phone" color="black" size={20} />
        <TextInput
          placeholder="Phone"
          keyboardType='number-pad'
          onChangeText={(Text)=>{setPhoneNumber(Text)}}
          placeholderTextColor="#666666"
         value={phone+" "}
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "black",
              fontSize:18
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="envelope-o" color="black" size={20} />
        <TextInput
          placeholder="Email"
          onChangeText={(Text)=>{setEmailNew(Text)}}
          value={email}
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "black",
              fontSize:18
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="globe" color="black" size={20} />
        <TextInput
          placeholder="Address"
          onChangeText={(Text)=>{setAddress(Text)}}
          value={address}
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "black",
              fontSize:18
            },
          ]}
        />
      </View>
      </Animated.View>
   
      <TouchableOpacity style={styles.commandButton} onPress={handleupdate}>
        <Text style={styles.panelButtonTitle}>Update</Text>
      </TouchableOpacity>
   
  </View>
 

   );
        }




const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      margin:10,
      borderRadius: 10,
      backgroundColor: colors.buttons,
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      marginTop:-20,
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      height:300,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: colors.buttons,
      marginBottom:10,
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      fontSize:20,
      marginLeft:20,
      marginBottom: 10,
    
      borderBottomWidth:1,
      borderBottomColor: '#E2E0E0',
      paddingBottom: 8,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });