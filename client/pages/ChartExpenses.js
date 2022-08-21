import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';
import Icon3 from 'react-native-vector-icons/Ionicons';
import SelectList from 'react-native-dropdown-select-list'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import "react-native-get-random-values";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
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
let income=0
let expense=0
let payments=[]
let salaries=0
let expenses=[]
let incomes=[];
export default function ChartExpenses({navigation}){
   const [transactiona,setTrans]=useState([]);
   const [offices,setOffices]=useState([]);
   const [show,setShow]=useState(false)
   const [billtypes,setBillTypes]=useState([]);
   const [amount,setAmount]=useState("")
   const [selected, setSelected] = React.useState("");
   const [selected2, setSelected2] = React.useState("");
   const[salary,setSalary]=useState(0)
   let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

const[search,setSearch]=useState(false)
   const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
const [dateStart,setDatestart]=useState("")
const[type,setType]=useState("")

const[showModal,setSHowModL]=useState(false)
        
const [endDate,setEnddate]=useState(null);
const[incomee,setIncome]=useState(0)
const[expensee,setExpense]=useState(0)

const [startDate,setStartdate]=useState(null);
const [displayedDate,setDisplayeddate]=useState(moment());
const [salariesPayments,setSalariesPayments]=useState([]);

const[summ,setSum]=useState(0)
const [salariesPaymentsEx,setSalariesPaymentsEx]=useState([]);
const [salariesPaymentsIn,setSalariesPaymentsIN]=useState([]);


   bills=[];
   officeBranches=[];
    expenses=[]
 incomes=[];
 const randomNumber = () => {
  const generateRandomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
  return `#${generateRandomColor}`;
}
   useEffect(()=>{
     Axios.get('http://10.0.2.2:3001/getBill').then((response)=>{
       setTrans(response.data);
     })
     Axios.get('http://10.0.2.2:3001/getOffice').then((response)=>{
       setOffices(response.data);})
   
   },[])
   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAllpayments').then((response)=>{
        setSalariesPayments(response.data);
      })
  
   },[])


   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getBillTypes').then((response)=>{
      setBillTypes(response.data);
    })
    },[]);
  payments=[];
  
   transactiona.map((val,key)=>{
     const y=moment(val.date).utc().format("YYYY-MM-DD");
     let office="";
   
        offices.map((val2,key2)=>{
         if(val2._id===val.officeId){
           office=val2.branch+"/"+val2.location; 
         }
        })
       let data={
        
         'id':val._id,
         'inout':val.inOut,
         'type':val.Type,
         'amount':val.amount+"$",
         'date':y,
         'office':office,
       }
       bills.push(data)
     
   })
 
   officeBranches.push({key:uuidv4(),value:"General Purpose"});

   {
    offices.map((val,key)=>{
      const y= val.branch+"/"+val.location;
      officeBranches.push({key:val._id,value:y});
    })
   }



   let sum=0;
   bills.map((val)=>{
     const o=val.amount.split("$")
     const i=parseInt(o)
     sum=sum+i
  
   })

 
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
    income=0
    expense=0
    salaries=0;
    salariesPayments.map((val,key)=>{
      const y= moment(val.Date).format("YYYY-MM-DD");
      if(y>=moment(startDate).format("YYYY-MM-DD") 
      && y<=
      moment(endDate).format("YYYY-MM-DD")
      
      )
      {
        salaries=salaries+val.totalSalaries

      }
  
    })
  
    myData.map((val)=>{
      if(val.date>=moment(startDate).format("YYYY-MM-DD") 
      && val.date<=
      moment(endDate).format("YYYY-MM-DD")
      
      ){
        if(val.inout==="Expense")
       { const o=val.amount.split("$")
        const i=parseInt(o)
        expense=expense+i
        const y=randomNumber()
        expenses.push({'name':val.type,'population':i,'color':y,
        'legendFontColor': y,
        'legendFontSize': 14
      })

      }
        else  if(val.inout==="Income")
        { const o=val.amount.split("$")
         const i=parseInt(o)
         income=income+i
         const y=randomNumber()
         incomes.push({'name':val.type,'population':i,'color':y,
         'legendFontColor': y,
         'legendFontSize': 14
        })
        }
   
      }
     })

     setSalariesPaymentsEx(expenses)
     setSalariesPaymentsIN(incomes)

setIncome(income)
setExpense(expense)
setSalary(salaries)
  }
  const Endsearch=()=>{
    setSearch(false)
   setIncome(0)
   setExpense(0)
   setSalary(0)
   expenses=[]
incomes=[];

  }



console.log(salariesPaymentsEx)
console.log(salariesPaymentsIn)


 return ( 
   <ScrollView style={{width:'100%'}}>
<View  >
       <HomeHeader navigation={navigation} />
       <View style={{flexDirection:'row'}}>
      
      <DateRangePicker
      style={{width:'100%',height:'100%'}}
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
      >📊 </Button>

<Filter name="filter-off-outline"  size={30} style={{marginVertical:25,margin:10,
backgroundColor:'white',
borderRadius:100,

color:'grey'}}
      onPress={Endsearch}
      />
    </View>
    <View>
      {
  (incomee===0 && expensee===0 )?
  <Text></Text>
  :
  <View style={{flexDirection:'row'}}>
  <Text style={{
    
    fontSize:25,margin:10,
    fontWeight:'bold',
  
    }}>
    💰 NET INCOME </Text>
    <Text style={{

    fontSize:25,marginVertical:10,
    fontWeight:'bold',color:((incomee-(expensee+salary))>0)?'green':'red'  }}>{incomee-(expensee+salary)}$</Text>
     
</View>

 }
      </View>

    <PieChart
   
data={
  
  [...salariesPaymentsIn,...salariesPaymentsEx].concat({
    'name': "Salary",
    'population': salary,
    'color': "#C70039",
    'legendFontColor': "#C70039",
    'legendFontSize': 15
 
  })

 
}
width={400}
height={290}
chartConfig={{
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
}}
accessor={"population"}
backgroundColor={"transparent"}
paddingLeft={"15"}

absolute
hasLegend={true}

/>

{
  (incomee===0 && expensee===0 )?
 <View></View>
  :
  <View style={{margin:10}}>
  <View style={{flexDirection:'row'}}>
<Text style={{

fontWeight:'bold',
fontSize:18
}}>  Income    {incomee}$
 </Text>
 {
  (incomee===0 && expensee===0 )?
  <Text></Text>
  :
 
  <Text style={{
    marginLeft:10,fontSize:17,
    marginRight:10,fontWeight:'bold',
    backgroundColor:'yellow',borderRadius:100,padding:3
    }}>
      {((incomee/(incomee+expensee+salary))*100).toFixed(2)}%</Text>
     


 }
  </View>

<View style={{flexDirection:'row',margin:10}}>
<Text style={{marginRight:5,fontWeight:'bold',
 fontSize:18}} >Expense  {expensee}$

 </Text>
 {
  (incomee===0 && expensee===0 )?
  <Text></Text>
  :
  <Text style={{marginRight:5,
    fontSize:17,fontWeight:'bold',
    backgroundColor:'yellow',borderRadius:100,padding:3}}>
    
    {(((expensee)/(incomee+expensee+salary))*100).toFixed(2)}%</Text>
    


 }
</View>

<View style={{flexDirection:'row',margin:10}}>
<Text style={{marginRight:5,fontWeight:'bold',fontSize:18}} >Salary  {salary}$

 </Text>
 {
  (incomee===0 && expensee===0 )?
  <Text></Text>
  :
  <Text style={{marginRight:5,
    fontSize:17,fontWeight:'bold',
    backgroundColor:'yellow',borderRadius:100,padding:3}}>
    
    {(((salary)/(incomee+expensee+salary))*100).toFixed(2)}%</Text>
    


 }
</View>
</View>}

      
      
    </View>
    
    </ScrollView>
   );
}


