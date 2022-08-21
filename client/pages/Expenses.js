import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';
import Icon3 from 'react-native-vector-icons/Ionicons';
import SelectList from 'react-native-dropdown-select-list'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Filter from 'react-native-vector-icons/MaterialCommunityIcons';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import DateRangePicker from "react-native-daterange-picker";

import { StyleSheet, Text, View,Alert,Dimensions, ScrollView} from 'react-native';

import HomeHeader from '../components/HomeHeader';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import moment from 'moment'
import {Card,Provider,TextInput,Portal,Modal} from 'react-native-paper'
import { Button, Menu, Divider,IconButton } from 'react-native-paper';
import { colors } from '../global/styles';

let bills=[];
let billsincome=[];
let officeBranches=[];
export default function RecentExpenses({navigation}){
   const [transactiona,setTrans]=useState([]);
   const [offices,setOffices]=useState([]);
   const [show,setShow]=useState(false)
   const [billtypes,setBillTypes]=useState([]);
   const [amount,setAmount]=useState("")
   const [selected, setSelected] = React.useState("");
   const [selected2, setSelected2] = React.useState("");
   const[text,setText]=useState("see older")
const[search,setSearch]=useState(false)
const [index,setIndex]=useState(4)
   const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
const [dateStart,setDatestart]=useState("")
const[type,setType]=useState("")

const[showModal,setSHowModL]=useState(false)
        
const [endDate,setEnddate]=useState(null);

const [startDate,setStartdate]=useState(null);
const [displayedDate,setDisplayeddate]=useState(moment());

const[summ,setSum]=useState(0)


   bills=[];
   officeBranches=[];
   useEffect(()=>{
     Axios.get('http://10.0.2.2:3001/getBill').then((response)=>{
       setTrans(response.data);
     })
     Axios.get('http://10.0.2.2:3001/getOffice').then((response)=>{
       setOffices(response.data);})
   
   },[])
   
   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getBillTypes').then((response)=>{
      setBillTypes(response.data);
    })
    },[]);

    console.log(billtypes)
   transactiona.map((val,key)=>{
     const y=moment(val.date).utc().format("YYYY-MM-DD");
     let office="";
     if(val.inOut==='Expense'){
        offices.map((val2,key2)=>{
         if(val2._id===val.officeId){
           office=val2.branch+"/"+val2.location; 
         }
        })
       let data={
         'id':val._id,
         'type':val.Type,
         'amount':val.amount+"$",
         'date':y,
         'office':office,
       }
       bills.push(data)
     }
   })
   transactiona.map((val,key)=>{
     const y=moment(val.date).utc().format("YYYY-MM-DD");
     let office="";
     if(val.inOut==='Income'){
        offices.map((val2,key2)=>{
         if(val2._id===val.officeId){
           office=val2.branch+"/"+val2.location; 
         }
        })
       let data={
         'id':val._id,
         'type':val.Type,
         'amount':val.amount+"$",
         'date':y,
         'office':office,
       }
       billsincome.push(data)
     }
   })
   officeBranches.push({key:uuidv4(),value:"General Purpose"});

   {
    offices.map((val,key)=>{
      const y= val.branch+"/"+val.location;
      officeBranches.push({key:val._id,value:y});
    })
   }

async function handledelete(id){
const response = await fetch('http://10.0.2.2:3001/deleteBill', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id:id,
  
  }),

}).then((response)=>{
  if(response.status===200)
  {
    
    Alert.alert("💫Success","Successfully deleted")

   bills=[];
   myData=[];
   Axios.get('http://10.0.2.2:3001/getBill').then((response)=>{
    setTrans(response.data);
  })

  transactiona.map((val,key)=>{
    const y=moment(val.date).utc().format("YYYY-MM-DD");
    let office="";
    if(val.inOut==='Expense'){
       offices.map((val2,key2)=>{
        if(val2._id===val.officeId){
          office=val2.branch+"/"+val2.location; 
        }
       })
      let data={
        'id':val._id,
        'type':val.Type,
        'amount':val.amount+"$",
        'date':y,
        'office':office,
      }
      bills.push(data)
    }
  })




}
})
 

 myData = [].concat(bills)
.sort((a, b) => a.date > b.date ? -1 : 1)

}
async function handleadd(){

   setShow(true)



   }
   let sum=0;
  

 
   let  myData = [].concat(bills)
   .sort((a, b) => a.date > b.date ? -1 : 1)
   let data=[];

   billtypes.map((val)=>{
    if(val.state==="Expense"){
      data.push({key:val._id,value:val.type})
    }
   })


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



  const showDatePicker22 = () => {
    setDatePickerVisibility22(true);
  };
 
  const hideDatePicker22 = () => {
    setDatePickerVisibility22(false);
  };
 
  const handleConfirm22 = (date) => {
   setDatestart2(moment(date).format("YYYY-MM-DD"))
    hideDatePicker22();
  };


  async function handlepress(){
   

    const type=data.filter(item=>item.key===selected)

    const office=officeBranches.filter(item=>item.key===selected2)
   let o="";
    if(office.length!==0)
   {  o=office[0].value;}
   
    let t=type[0].value;

    console.log(o+t+amount+dateStart)
    let id="";
    offices.map((val)=>{
      if (val.branch+"/"+val.location===o){
        id=val._id

      }
    })
    const response = await fetch('http://10.0.2.2:3001/insert_bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
        officeid:id,
        type:t,
        amount:parseInt(amount),
        inout:"Expense",
        date:new Date(dateStart),
        
      }),
   
    }).then((response)=>{
      if(response.status===200)
      {
        
        Alert.alert("💫Success","Successfully added")

       bills=[];
       myData=[];
       Axios.get('http://10.0.2.2:3001/getBill').then((response)=>{
        setTrans(response.data);
      })

      transactiona.map((val,key)=>{
        const y=moment(val.date).utc().format("YYYY-MM-DD");
        let office="";
        if(val.inOut==='Expense'){
           offices.map((val2,key2)=>{
            if(val2._id===val.officeId){
              office=val2.branch+"/"+val2.location; 
            }
           })
          let data={
            'id':val._id,
            'type':val.Type,
            'amount':val.amount+"$",
            'date':y,
            'office':office,
          }
          bills.push(data)
        }
      })




    }
    })
     

     myData = [].concat(bills)
    .sort((a, b) => a.date > b.date ? -1 : 1)

    

  }

  const handledates=(dates)=>{
console.log(dates)

if(dates.displayedDate !==undefined){
  setDisplayeddate(dates.displayedDate)
}
else if(dates.endDate==null && dates.startDate!==null )
{
  setStartdate(dates.startDate)
  setEnddate(null)
}
else if(dates.endDate !==null){
  setEnddate(dates.endDate )
}
  


  }

  const handlesearch=()=>{
    setSearch(true)
    sum=0
    myData.map((val)=>{
      if(val.date>=moment(startDate).format("YYYY-MM-DD") 
      && val.date<=
      moment(endDate).format("YYYY-MM-DD")
      
      ){
        const o=val.amount.split("$")
        const i=parseInt(o)
        sum=sum+i
       
      }
     })


setSum(sum)
  }
  const Endsearch=()=>{
    setSearch(false)
    sum=0
    myData.map((val)=>{
     
      const o=val.amount.split("$")
      const i=parseInt(o)
      sum=sum+i

      
     })
   
     setSum(sum)


  }
      sum=0

      myData.slice(0,index).map((val)=>{
        const o=val.amount.split("$")
        const i=parseInt(o)
        sum=sum+i
 
      })
      useEffect(()=>{
setSum(sum)
      },[sum])

      

 return ( 
   <ScrollView style={{width:'100%'}}>
<View >
       <HomeHeader navigation={navigation} />
       
       <View style={{flexDirection:'row'}}>
      
        <DateRangePicker
          onChange={(dates)=>handledates(dates)}
          endDate={endDate}
          startDate={startDate}
          displayedDate={displayedDate}
          range
        >

          <Button mode='contained' style={{margin:20,
           backgroundColor:'#f7bc0c'}}>Date Range picker</Button>
        </DateRangePicker>
        <Button mode='contained' style={{marginVertical:20}}
        onPress={handlesearch}
        > 🔍 Search</Button>

<Filter name="filter-off-outline"  size={30} style={{marginVertical:25,margin:10,
backgroundColor:'white',
borderRadius:100,

color:'grey'}}
        onPress={Endsearch}
        />
      </View>
       <View style={{flexDirection:'row',borderColor:'grey',backgroundColor:'#E2E0E0'}}>
 
 <Text style={{margin:10,marginTop:15,fontSize:25
   ,fontWeight:'bold',color:'#C70039'}}>Total Expense {summ} $</Text>   
 
  <Icon3
  color='#C70039'
    name='add-circle'
  style={{marginLeft:40}}
  size={60}
onPress={handleadd}
  
  />
   </View>

   {search?
   <View>
    
    {

    
   myData.map((val)=>{
    if(val.date>=moment(startDate).format("YYYY-MM-DD") 
    && val.date<=
    moment(endDate).format("YYYY-MM-DD")
    
    ){
      
     
      return <View key={uuidv4()} >
          
   <Card style={{marginHorizontal:10,marginVertical:5,backgroundColor:'#F9857A'}}>
      <View style={{margin:10}}>
      

         
     

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:19,fontWeight:'bold',justifyContent:'flex-start',alignSelf:'flex-start'}} >{val.type}</Text>

      <Text style={{fontSize:14,color:'#4B3F3F',fontWeight:'bold',justifyContent:'flex-end',alignSelf:'flex-end'}}>
      <AntDesignIcon
  color='#C70039'
    name='delete'
  
  size={30}
 
  onPress={()=>handledelete(val.id)}
  />
         
           </Text>
      
    

      </View>
    
     
      <Text style={{fontSize:16,fontWeight:'bold'}}>{val.amount}</Text>
      

     
      <Text style={{fontSize:15,fontWeight:'bold'}}>{val.office}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:14,color:'#4B3F3F',fontWeight:'bold',justifyContent:'flex-start',alignSelf:'flex-start'}}>  {val.date} </Text>
      <Text style={{fontSize:14,color:'#4B3F3F',fontWeight:'bold',justifyContent:'flex-end',alignSelf:'flex-end'}}>{moment(val.date).fromNow()}   </Text>
      
    

      </View>

    
      </View>
   
      </Card>
</View>

      
    }
   })
}
   </View>
   :
   <View>
    { 

myData.slice(0,index).map((val)=>{

return <View key={uuidv4()} >

   <Card style={{marginHorizontal:10,marginVertical:5,backgroundColor:'#F9857A'}}>
      <View style={{margin:10}}>
      

         
     

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:19,fontWeight:'bold',justifyContent:'flex-start',alignSelf:'flex-start'}} >{val.type}</Text>

      <Text style={{fontSize:14,color:'#4B3F3F',fontWeight:'bold',justifyContent:'flex-end',alignSelf:'flex-end'}}>
      <AntDesignIcon
  color='#C70039'
    name='delete'
  
  size={30}
 
  onPress={()=>handledelete(val.id)}
  />
         
           </Text>
      
    

      </View>
    
     
      <Text style={{fontSize:16,fontWeight:'bold'}}>{val.amount}</Text>
      

     
      <Text style={{fontSize:15,fontWeight:'bold'}}>{val.office}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:14,color:'#4B3F3F',fontWeight:'bold',justifyContent:'flex-start',alignSelf:'flex-start'}}>  {val.date} </Text>
      <Text style={{fontSize:14,color:'#4B3F3F',fontWeight:'bold',justifyContent:'flex-end',alignSelf:'flex-end'}}>{moment(val.date).fromNow()}   </Text>
      
    

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
  }

      
      


    </View>
    {
        show && <Provider>
          <Portal>
            <Modal visible={show} 
            contentContainerStyle={{backgroundColor: 'white', padding: 20}}
            onDismiss={()=>setShow(false)
            
            
            } >
              <Text style={{fontSize:25,fontWeight:'bold',margin:20,marginBottom:30,color:'#C70039'}}>➕ New Expenses</Text>
               <View style={{flexDirection:'row',width:300}}>
              <Text style={{fontSize:17,fontWeight:'bold',margin:10,marginRight:30}}>Type</Text>
              <SelectList
              style={{width:300,margin:10}}
              setSelected={setSelected} data={data} />
              </View>
              <View style={{flexDirection:'row',margin:10,width:330}}>

              <Text style={{fontSize:17,fontWeight:'bold',marginTop:30}}>Amount</Text>
              
              <TextInput
              style={{width:140,margin:10,height:50}}
      label="Amount"
      value={amount}
      
      onChangeText={text => setAmount(text)}
    />



           </View>

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
  
   style={{width:140,marginVertical:10}} 
   
  
 />

   
</View>

     <DateTimePickerModal
      isVisible={isDatePickerVisible2}
      mode="date"
      onConfirm={handleConfirm2}
      onCancel={hideDatePicker2}
    />

<View style={{flexDirection:'row',width:300,margin:10}}>
              <Text style={{fontSize:17,fontWeight:'bold',marginRight:30}}>Office</Text>
              <SelectList
              style={{width:300}}
              setSelected={setSelected2} data={officeBranches} />
              </View>

              <View>
              <Button
              style={{margin:20,backgroundColor:'#C70039'}}
              mode="contained" onPress={handlepress}>
Add new  </Button>
              </View>
            
            </Modal>
          </Portal>
        </Provider>
      }
    </ScrollView>
   );
}


