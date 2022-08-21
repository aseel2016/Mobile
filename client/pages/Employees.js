import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput, ScrollView} from 'react-native';
import EmployeeGrid from '../components/EmployeesGrid';

import HomeHeader from '../components/HomeHeader';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native';

import _ from 'lodash';
export default function Employees({navigation}){
   const [searchQuery, setSearchQuery] = useState('');
   const [employees,setEmployess]=useState([]);

   const onChangeSearch = query =>   { 
      setSearchQuery(query);
     
   }
  
   
   useEffect(()=>{
      let isMounted=true
   if(isMounted)
    { Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
      setEmployess(response.data);
      
          })
        
         
         }
   
          return () => { isMounted = false }
   
       
       },[])
 
       const randomNumber = () => {
         const generateRandomColor = Math.floor(Math.random() * 16777215)
             .toString(16)
             .padStart(6, '0');
         return `#${generateRandomColor}`;
     }

 function renderCategoryItem(itemData) {
   const name=itemData.item.firstName+" "+itemData.item.lastName
   return (
     <EmployeeGrid navigation={navigation} title={name} color={randomNumber()} image={itemData.item.image}
     email={itemData.item.email}
     />
   );
 }

 let result;
 if(searchQuery===""){
    result=
    <FlatList
    data={employees}
    keyExtractor={(item) => item._id}
    renderItem={renderCategoryItem}
    numColumns={2}

  />;

  

 }
 else{
   const data=_.filter(employees,user=>{
      const n=user.firstName+" "+user.lastName
      if(n.includes(searchQuery))
      return true
      else{
         return false
      }

   })
    result=<FlatList
    data={data}
    keyExtractor={(item) => item._id}
    renderItem={renderCategoryItem}
    numColumns={2}

  />
};

return ( 
<View >
       <HomeHeader navigation={navigation} />
       <Searchbar style={{margin:10}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />

   
    {result}
       


    </View>
   );
}


