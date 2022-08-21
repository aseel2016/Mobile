import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';
import Icon3 from 'react-native-vector-icons/Ionicons';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
import { StyleSheet, Text, View,Alert,Dimensions, ScrollView} from 'react-native';

import HomeHeader from '../components/HomeHeader';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import moment from 'moment'
import {Card,Provider,Portal,Modal,TextInput,IconButton} from 'react-native-paper'
import DateTimePickerModal from "react-native-modal-datetime-picker";

let bills=[];
let billsincome=[];
let payments=[];
export default function Salary({navigation}){
   const [transactiona,setTrans]=useState([]);
   const [offices,setOffices]=useState([]);
const [openModal,setOpenModal]=useState(false);
    const [activeEmployee,setActiveEmployee]=useState([]);
    const [salariesPayments,setSalariesPayments]=useState([]);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [dateStart,setDatestart]=useState("")
    const [text,setText]=useState("see older")
    const [index,setIndex]=useState(4)
    const showDatePicker2 = () => {
      setDatePickerVisibility2(true);
    };
   
    const hideDatePicker2 = () => {
      setDatePickerVisibility2(false);
    };
   
    const handleConfirm2 = (date) => {
     setDatestart(moment(date).format("YYYY-MM-DD"))
      hideDatePicker2();
    };
   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAllpayments').then((response)=>{
        setSalariesPayments(response.data);
      })
  
   },[])
   payments=[];
   salariesPayments.map((val,key)=>{
    const y= moment(val.Date).format("YYYY-MM-DD");
    let data={
      'Date':y,
      'totalSalaries':val.totalSalaries+" $",
      'number':val.numberHired,
    }
    payments.push(data)

  })

 const myData = [].concat(payments)
 .sort((a, b) => a.Date > b.Date ? -1 : 1)


 return ( 
   <ScrollView style={{width:'100%'}}>
<View >
       <HomeHeader navigation={navigation} />

       <View style={{flexDirection:'row'}}>

<IconButton mode="contained"
  icon="calendar"
  size={30}
  style={{marginTop:20,marginRight:30}}
       onPress={showDatePicker2}
       />

<TextInput
   
   label="Date ..."
   value={dateStart}
   onChangeText={(text)=>setDatestart(text)}
  
   style={{width:280,marginVertical:10}} 
   
  
 />

   
</View>

     <DateTimePickerModal
      isVisible={isDatePickerVisible2}
      mode="date"
      onConfirm={handleConfirm2}
      onCancel={hideDatePicker2}
    />
       <Text style={{fontSize:25,fontWeight:'bold',
       margin:10}}>💰 Salaries payments</Text>
   {dateStart===""? 
   <View>
      {
myData.slice(0,index).map((val)=>{

   

   
   return <View key={uuidv4()}>
   

   <Card style={{marginHorizontal:10,marginVertical:5,backgroundColor:'#FCF585'}}>
      <View style={{margin:10}}>
      

         
     <View style={{flexDirection:'row',margin:15}}>

     <Text style={{fontSize:17,fontWeight:'bold',margin:5,justifyContent:'flex-start',alignSelf:'flex-start'}} >{val.Date}</Text>

      
    

    
     
<Text style={{fontSize:17,margin:5,marginHorizontal:50,fontWeight:'bold'}}>{val.totalSalaries}</Text>



<Text style={{fontSize:17,margin:5,fontWeight:'bold'}}>{val.number} 👩🏽🙍🏽‍♂️</Text>

     </View>

     
    
      </View>
   
      </Card>
</View>
})
}

<Text 
onPress={
()=>
 {

  if(text==="see less"){
    setIndex(4)
    setText("see older")

  }
  else
  {
    if((index+4)>= myData.length){
setText("see less")
 }

 setIndex(index+4)
}
}
}
style={{fontSize:20,margin:10,fontWeight:'bold',textDecorationLine:'underline'}}>{text}</Text>




   </View> 
   :
   <View>
    { 
    
    myData.map((val)=>{
   if(dateStart===val.Date){
      return <View key={uuidv4()}>
   

   <Card style={{marginHorizontal:10,marginVertical:5,backgroundColor:'#FCF585'}}>
      <View style={{margin:10}}>
      

         
     <View style={{flexDirection:'row',margin:15}}>

     <Text style={{fontSize:17,fontWeight:'bold',margin:5,justifyContent:'flex-start',alignSelf:'flex-start'}} >{val.Date}</Text>

      
    

    
     
<Text style={{fontSize:17,margin:5,marginHorizontal:50,fontWeight:'bold'}}>{val.totalSalaries}</Text>



<Text style={{fontSize:17,margin:5,fontWeight:'bold'}}>{val.number} 👩🏽🙍🏽‍♂️</Text>

     </View>

     
    
      </View>
   
      </Card>
</View>
   
}
    }
    )
    }
   </View>
   }   

      
      


    </View>
    </ScrollView>
   );
}


