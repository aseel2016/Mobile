import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet,Linking , Text, View,Alert,Dimensions,TextInput} from 'react-native';


import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import { storage } from "../Firebase";
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage';

let appsJob=[];
export default function Applicants({ route, navigation }){
    const { id } = route.params;
    const [text,setText]=useState("")
    const [urls,setUrls]=useState([])
    const [jobs,setJobs]=useState([])
useEffect(()=>{
    setUrls([])
    const fileList=ref(storage,'applicants/');
    listAll(fileList).then((response)=>{
      response.items.forEach((item)=>{     
        getDownloadURL(item).then((url)=>
    {
        
    setText(url+" "+ item.name)
    setUrls((urls) => [
        ...urls,
        {"name":item.name,"url":url},
      ]);
    }
        )
    
    
    })})
},[])
appsJob=[];
useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAlljobs').then((response)=>{
        setJobs(response.data);
  
      })
   
  },[]);
  jobs.map((val)=>{
    if(val._id===id){
        val.Applicants.map((val)=>{
            appsJob.push(val)
        })
    }
  })
   
console.log(appsJob)
async function handlereject(){
Alert.alert("no")
}
async function handleaccept(){
    Alert.alert("yes")
}
return ( 
    <View>
       
<View  style={{margin:5}}>

    {
        urls.map((val)=>{
            let state;

            const y=val.name.split(" ")
            if(y[1]===id){
                appsJob.map((val3)=>{
                    if(val3.email===y[0]){
                        state=val3.status;
                        
                    }
                })


            return(<View key={y[0]} style={{flexDirection:'row',margin:10}}>
                
                <Text style={{fontSize:20,fontWeight:'900'}}
      onPress={() => Linking.openURL(val.url)}>
 📑 {y[2]}
</Text>
<Text style={{marginLeft:15,backgroundColor:'#CED5CD',borderRadius:100,fontSize:16,padding:8,fontWeight:'bold',borderWidth:1,borderColor:'#E2E0E0'}}>{state}</Text>
<Icon2  name='account-check'onPress={handleaccept}  color="#079401" size={25} style={{marginLeft:20,marginRight:10}}/>
    <Icon2  name='account-remove' onPress={handlereject} color="#E20000"  size={25}   />




                </View>
               );
                
            }
        })
    }
    
    
      
       


    </View>
    </View>
   );
}


