import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, 
    Text, 
    View,
    Alert,
    Linking,
    Pressable,
    Switch,
    Dimensions,
    TextInput} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

  import {
    Avatar,Button,Icon
  }from 'react-native-elements'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';  

  import {colors}from '../global/styles'
  
 
  
 let NameEm;
 let image;
  export default function Drawercontent(props){
    const [email,setEmail]=useState('')
    const [employees,setEmployees]=useState([]);
    const[imagepicked,setPicked]=useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg");
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
         
          props.navigation.navigate("Signin")
          
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
      NameEm=val.firstName+" "+val.lastName;
      image=val.image;
    }
  })
  setPicked(image)

},[employees])

    

const handlelogout = async () => {
  try {
    await AsyncStorage.removeItem('Mobile')
    props.navigation.navigate("Signin")
    
    

    
  } catch(e) {
    // remove error
  }

  console.log('Done.')

}
   
    


    return(<View style={styles.container}>
        <DrawerContentScrollView {...props}>
<View style={{flexDirection:"row",alignItems:'center',backgroundColor:colors.buttons,paddingLeft:15,paddingVertical:20,marginTop:-10}}>
    <Avatar
    rounded
    avatarStyle={styles.avatar}
    size={70}
    source={{uri:imagepicked}}

    />
    <View style={{marginLeft:10,paddingRight:20}}>
        <Text style={{fontWeight:'bold',fontSize:18,color:'white'}}>{NameEm} </Text>
        <Text style={{fontWeight:'bold',fontSize:14,color:'white'}}>{email}</Text>

    </View>
</View>
<DrawerItemList  {...props}/>

<DrawerItem
label="Sign out"
onPress={handlelogout}
icon={({color,size})=>(
    <Icon
    size={size}
    color="#581845"
    name="logout-variant"
    type="material-community"

    />
)}
/>

</DrawerContentScrollView>
    </View>);

  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    },
    avatar: {
        borderWidth:2,
        borderColor:"white",

     
      },
  });
  