import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { DataTable } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import  Axios  from 'axios';
import { colors } from '../global/styles';
import {Provider,TextInput,Modal,Portal,Button} from 'react-native-paper'
import { async } from '@firebase/util';
let idMe;
let names=[];
let teamEm=[];
let finalteam=[];
let MyTeam;
let manager="";
            let teamleader="";
export default function AllTeams({navigation}){
    const [emai,setEmail]=useState("");
    const [employees,setEmployees]=useState([]);
    const [teams,setTeams]=useState([]);
    const[idd,setId]=useState("")
  const[show,setShow]=useState(false)

  const[show2,setShow2]=useState(false)

  const[name,setName]=useState("")
  const[managerr,setManager]=useState("")
  const[teamleaderr,setTeamleader]=useState("")

  
     
  
    let teamsAll=[];
    let nameEmployees=[];
      useEffect(()=>{
        Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
          setEmployees(response.data);
        })
    
        },[]);
        useEffect(()=>{
            Axios.get('http://10.0.2.2:3001/getAllteams').then((response)=>{
              setTeams(response.data);
            })
           
        
            },[teams]);
        {
          teams.map((val,key)=>{
            
            employees.map((val2,key2)=>{
            
              if(val.Manager===val2._id){  
                  manager=val2.firstName+" "+val2.lastName;
              }
              else if(val.teamLeader ===val2._id){
                teamleader=val2.firstName+" "+val2.lastName;
              }
    
              })
    
              let data={
                'id':val._id,
    
                'name':val.name,
                'teamLeader':teamleader,
                'Manager':manager,
              
              }
              teamsAll.push(data);
            }
            )
            
         
            
          }
        
  
    

    async function handledelete(){
        setShow(false)
        const response =  fetch('http://10.0.2.2:3001/deleteteam', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id:idd,
            
            }),
          
          }).then((response)=>{
            console.log(response);
            if(response.status===200){Alert.alert("Success","Successfully Deleted")}
          })
    }
 function handleAdd(){
    setShow2(true)
}  

async function handleaddTeam(){
    setShow2(false)

    let idM;let idT;
  employees.map((val2,key2)=>{
    const n=val2.firstName+" "+val2.lastName;
    if(managerr===n){
       idM=val2._id;
    }
    else if(teamleaderr===n){
      idT=val2._id;
    }

    })
    const response = await fetch('http://10.0.2.2:3001/insert_team', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				
				name:name,
				manager:idM,
        teamleader:idT,
				
			}),

		}).then((response)=>{
      if(response.status===200){Alert.alert("Added successfully")}
    })
}
return ( 
<View >
    <HomeHeader navigation={navigation}/>
    <ScrollView style={{width:'100%'}}>
    
        <View>
        <Text
               style={{fontSize:25,fontWeight:"bold",padding:20,marginBottom:30,backgroundColor:'#E9A1F5'}}
 
        >Teams</Text>
        
        

      <Button mode='contained'
      onPress={handleAdd}
      style={{alignSelf:'flex-end',margin:20,padding:5}}>Add new team</Button>

<DataTable>
      <DataTable.Header  >
        <DataTable.Title textStyle={{fontWeight:'bold',color:"purple",fontSize:17}} >Team</DataTable.Title>
        <DataTable.Title textStyle={{fontWeight:'bold',color:'purple',fontSize:17}} >TeamLeader</DataTable.Title>
        <DataTable.Title textStyle={{fontWeight:'bold',color:'purple',fontSize:17}}>Manager</DataTable.Title>
      </DataTable.Header>
      {teamsAll.map((val)=>{
           
           return(<DataTable.Row key={val.id} onPress={()=>{setId(val.id)
            setShow(true)
           
           }}>
            <DataTable.Cell textStyle={{fontWeight:'bold'}}>{val.name}</DataTable.Cell>
            <DataTable.Cell>{val.teamLeader}</DataTable.Cell>
            <DataTable.Cell >{val.Manager}</DataTable.Cell>
            </DataTable.Row>)


         })}
      

    
      
    </DataTable>
    

      
        
        
        </View>
  
    </ScrollView>


    {show && <Provider>
        <Portal>
            <Modal visible={show} contentContainerStyle={{backgroundColor:'white',padding:20}} onDismiss={()=>setShow(false)}>
                <Text
                style={{fontSize:20,fontWeight:'bold'}}
                >Are you sure you want to delete this team?</Text>
                <View style={{flexDirection:'row'}}>
                <Button 
                onPress={handledelete}
                mode='contained' style={{margin:20,backgroundColor:'red'}}>Yes</Button>
                <Button mode='contained'
                onPress={()=>setShow(false)}
                style={{marginVertical:20,backgroundColor:'green'}}>No</Button>
                </View>

            </Modal>
            
            </Portal></Provider>}
      
       
            {show2 && <Provider>
        <Portal>
            <Modal visible={show2} contentContainerStyle={{backgroundColor:'white',padding:20}} onDismiss={()=>setShow2(false)}>
               <TextInput placeholder='Name'
               onChangeText={(text)=>setName(text)}
               />
               
               <View style={{flexDirection:'row'}}>
               <Text
 style={{fontSize:19,fontWeight:'800',
 margin:10}}> Manager</Text>
 <Picker style={{width:'100%'}}
 selectedValue={managerr}
 onValueChange={(itemValue,itemIndex)=>setManager(itemValue)}>
   {
     employees.map((val)=>{
       return <Picker.Item label={val.firstName+" "+val.lastName} key={val.firstName+" "+val.lastName}  value={val.firstName+" "+val.lastName}/>
     })
   }
 </Picker>
               </View>
               <View style={{flexDirection:'row'}}>
               <Text
 style={{fontSize:19,fontWeight:'800',
 margin:10}}>Teamleader</Text>
 <Picker style={{width:'100%'}}
 selectedValue={teamleaderr}
 onValueChange={(itemValue,itemIndex)=>setTeamleader(itemValue)}>
   {
     employees.map((val)=>{
       return <Picker.Item label={val.firstName+" "+val.lastName} key={val.firstName+" "+val.lastName}  value={val.firstName+" "+val.lastName}/>
     })
   }
 </Picker>
               </View>
               
               
                <Button 
                onPress={handleaddTeam}
                mode='contained' style={{margin:20,backgroundColor:'purlpe'}}>Add new</Button>
             
            </Modal>
            
            </Portal></Provider>}

    </View>
   );
}


