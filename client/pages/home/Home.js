import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, Text,ScrollView, View,Alert,Dimensions,TextInput, ImageBackground} from 'react-native';

import HomeHeader from '../../components/HomeHeader';
import Clock from '../../components/Clock';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import { colors, parameters } from '../../global/styles';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import MapLocation from '../../components/Map';
import moment from 'moment'
import {Card,Provider} from 'react-native-paper'
let accessible=false;
let counter=0;
let counter2=0;
let counter3=0;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

let income=0
let expense=0
let salarieschart6=[];
let salarieschart66=[];
let salariesAll=0;
export default function Home({navigation}){
  const [employees,setEmployees]=useState([])
  const [clockin,setClockin]=useState([]);
  const[requests,setRequests]=useState([]);
  const[email,setEmail]=useState("")
  const [transactiona,setTrans]=useState([]);
   const [offices,setOffices]=useState([]);
   const [shoe,setShow]=useState(false)
   const [salariesPayments,setSalariesPayments]=useState([]);

    income=0;
   expense=0;
   salariesAll=0;
    salarieschart6=[];
salarieschart66=[];
   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAllpayments').then((response)=>{
        setSalariesPayments(response.data);
      })
  
   },[])
   salariesPayments.map((val,key)=>{
    const y=moment().year();
    const y2=moment(val.Date).year();
    const y3=moment(val.Date).month();
    
    let month;
    if(y3==0){month= 'Janauary'}
    else if(y3==1){month="February";}
    else if(y3==2){month="March";}
    else if(y3==3){month="April";}
    else if(y3==4){month="May";}
    else if(y3==5){month="June";}
    else if(y3==6) {month="July";}
    else if(y3==7){month="August";}
    else if(y3==8){month="September";}
    else if(y3==9){month="October";}
    else if(y3==10){month="November";}
    else if(y3==11){month="December";}
    if(y===y2){
    
      salarieschart6.push(month);
      salarieschart66.push(val.totalSalaries);
      salariesAll=salariesAll+val.totalSalaries;

    }
  })

   useEffect(()=>{
     Axios.get('http://10.0.2.2:3001/getBill').then((response)=>{
       setTrans(response.data);
     })
     Axios.get('http://10.0.2.2:3001/getOffice').then((response)=>{
       setOffices(response.data);})
   
   },[])
   transactiona.map((val,key)=>{
    const y=moment(val.date).utc().format("YYYY-MM-DD");
    const yj=moment(val.date).year();
    const yej=moment().year();
    let office="";
    if(val.inOut==='Expense' && yj===yej ){
      expense=expense+val.amount;
     
    }
  })
  transactiona.map((val,key)=>{
    const y=moment(val.date).utc().format("YYYY-MM-DD");
    const yj=moment(val.date).year();
    const yej=moment().year();
    let office="";

    if(val.inOut==='Income' && yj===yej){
       income=income+val.amount
    }
  })
  useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
        setEmployees(response.data);
  
      })
   
  },[]);
  counter=0;
  counter2=0;
  counter3=0;
    useEffect( ()=>{
  
   Axios.get('http://10.0.2.2:3001/getClock').then((response)=>{
    setClockin(response.data);}
      )
      Axios.get('http://10.0.2.2:3001/read').then((response)=>{
        setRequests(response.data);
       
      
      })
      
    },[]);
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
    setEmail(datay.email)
   
   
  } else

  {
    
  }

          


        }
        else{
          navigation.navigate("Signin")
        }
      } catch(e) {
        // error reading value
        alert("wrong")
      }
    }
    
    getData()

    employees.map((val)=>{
      if(val.email===email){
        if(val.accessible==="No"){
          accessible=false;
    
        }
        else{
          accessible=true;
    
        }
    
      }
    })
 
    clockin.map((val)=>{

      const u= moment(val.Clockin).format("YYYY-MM-DD")
      const uF= moment().format("YYYY-MM-DD")
    
  
      if(u===uF && val.Clockout==null){
        counter=counter+1;
  
      }
    })
    counter2=0;
    counter3=0;
  
    requests.map((val,key)=>{
    
      const u= new Date(val.Starting).getTime()
      const u2= new Date(val.Ending).getTime()
      const uF= new Date().getTime()



    

      if(val.Type==="Work from Home"){
        if(val.StatusHR==="accepted" && val.StatusManager==="accepted"){
          if(uF>=u && uF<=u2){
            counter2=counter2+1;
  
          }
  
        }
      }
      else if  (val.StatusHR==="accepted" && val.StatusManager==="accepted" ){
        if(uF>=u && uF<=u2){
          counter3=counter3+1;
  
        }
  
  
      }
     
    })
    
    console.log(salarieschart66)
return ( 
<View >
       <HomeHeader navigation={navigation} />
      <ScrollView>
        {accessible?
        <View>

          <ScrollView style={{width:'100%'}}>
            <View style={{width:'100%',height:300}}>
              <ImageBackground
              resizeMode='cover'
              
              source={{ uri: "https://t4.ftcdn.net/jpg/02/51/73/45/360_F_251734591_z3NOi3f9ElIAQFPM1gbqLBq4X56QAD20.jpg" }}

              style={{flex:1,alignItems:'center'}}
              >


              </ImageBackground>
            </View>
            <View>
            <Provider>      
  <View style={{width:333,height:300,marginTop:-50,marginLeft:10}}>
                <Card >
                  <Card.Content style={{backgroundColor:'#E8A2F2',borderRadius:100}} >
                    <Text style={{fontSize:25,
                      fontWeight:'bold',color:colors.buttons
                      
                      }}>🕰 Clocked in :  {counter}</Text>

                 
                  </Card.Content>
                </Card>
                <Card >
                  <Card.Content style={{backgroundColor:'#E8A2F2',borderRadius:100,marginTop:10}} >
                  <Text style={{fontSize:25,
                      fontWeight:'bold',color:colors.buttons}}>🏡 Work from home:  {counter2}</Text>
                  
                  </Card.Content>
                </Card>
                <Card >
                  <Card.Content style={{borderRadius:100,backgroundColor:'#E8A2F2',marginTop:10}} >
                  <Text style={{fontSize:25,
                      fontWeight:'bold',color:colors.buttons}}>🛩out the office :  {counter3}</Text>
                    

                 
                  </Card.Content>
                </Card>
                </View>
                </Provider>

            </View>

            <View>
              <Card  onPress={()=>navigation.navigate("AllOutTheoffice")} style={{marginHorizontal:20,backgroundColor:'green',marginBottom:60,padding:25}}>
                <Card.Content style={{padding:25}}>
                  <Text style={{color:'white',fontSize:22,fontWeight:'bold'}}>💡check out the office →</Text>
                </Card.Content>
              </Card>
            </View>

            <View style={{marginTop:-20,marginBottom:100}} >

              <Text style={{fontSize:20,fontWeight:'bold',margin:10}}>Salaries Chart</Text>
            <LineChart 
           
    data={{
      labels: salarieschart6,
      datasets: [
        {
          data:  salarieschart66,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
        }
      ]
    }}
  
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisLabel="$"
   
    yAxisSuffix="$"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
     
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
     
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,

    }}
   

  />

  
<View style={{width:'100%',height:'100%'}}>
<Text style={{fontSize:20,fontWeight:'bold',margin:10}}>Income vs Expense </Text>
<PieChart
data={[
  {
    name: "Income",
    population: income,
    color: "#23B730",
    legendFontColor: "#23B730",
    legendFontSize: 15
    
  },
  {
    name: "EXpense",
    population: expense+salariesAll,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
 
 
]}
width={400}
height={220}
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

/>



            </View>
            </View>



          </ScrollView>
        
        </View>:
        <View>
          <View>
       <Text style={{backgroundColor:'#D8D5D5',borderWidth:1,
       fontSize:28,fontWeight:'800',padding:20,color:colors.buttons}}>⏰ Attendance</Text>
       </View>
       <Clock />
   
          
          
        </View>}
       
       </ScrollView>




    </View>
   );
}


