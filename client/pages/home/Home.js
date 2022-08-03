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
export default function Home({navigation}){
  const [employees,setEmployees]=useState([])
  const [clockin,setClockin]=useState([]);
  const[requests,setRequests]=useState([]);
  const[email,setEmail]=useState("")
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

      const u= moment(val.Clockin).month();
      const d= moment(val.Clockin).day();
      const u2= moment(val.Clockin).year();
      const d2= moment().day();
      const u3= moment().month();
      const u4= moment().year();
  
      if(u===u3 && u2===u4 && d===d2 && val.Clockout==null){
        counter=counter+1;
  
      }
    })
    counter2=0;
    counter3=0;
  
    requests.map((val,key)=>{
      const y= moment(val.Starting).month();
      const y2= moment(val.Starting).year();
      const y5= moment(val.Starting).day();
      const y3= moment().month();
      const y4= moment().year();
      const y6= moment().day();

      if(val.Type==="Work from Home"){
        if(val.StatusHR==="accepted"){
          if(y===y3 && y2===y4 && y5===y6){
            counter2=counter2+1;
  
          }
  
        }
      }
      else if(val.StatusHR==="accepted"  ){
        if(y===y3 && y2===y4 && y5===y6){
          counter3=counter3+1;
  
        }
  
  
      }
     
    })    
  
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
                      fontWeight:'bold',color:colors.buttons}}>💊 Sick leave :  {counter3}</Text>
                    

                 
                  </Card.Content>
                </Card>
                </View>
                </Provider>

            </View>

            <View style={{marginTop:-20,marginBottom:100}} >

              <Text style={{fontSize:20,fontWeight:'bold',margin:10}}>Salaries Chart</Text>
            <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
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
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
            </View>


          </ScrollView>
        
        </View>:
        <View>
          <View>
       <Text style={{backgroundColor:'#D8D5D5',borderWidth:1,
       fontSize:28,fontWeight:'800',padding:20,color:colors.buttons}}>⏰ Attendance</Text>
       </View>
       <Clock />
       <View>
       <Text style={{backgroundColor:'#D8D5D5',borderWidth:1,
       fontSize:28,fontWeight:'800',padding:20,color:colors.buttons}}>🌍 Location</Text>
       </View>
       <View>
        <MapLocation  />
       
       </View>
          
          
        </View>}
       
       </ScrollView>




    </View>
   );
}


