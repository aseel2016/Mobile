import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,TouchableOpacity,Modal,Animated, Text, View,Alert,Dimensions,TextInput, FlatList} from 'react-native';
import {colors} from '../global/styles'
import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import moment, { preciseDiff } from 'moment';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/AntDesign';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
import {Button} from 'react-native-elements'

import Axios from 'axios';
let clocksAll=[];
let history=[];
let clocksperday=[];
let accessible;

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
 
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
export default function ClockHistory({navigation}){
   const [emai,setEmail]=useState("");
   const [employees,setEmployees]=useState([]);
   const [clocks,setClocks]=useState([])
const [date,setDate]=useState();
   const [show,setShow]=useState(false);
   const [show2,setShow2]=useState(false);
   const[cohsen,setChosenName]=useState("")

   
   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
        setEmployees(response.data);
  
      })
   
  },[]);
   const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const y=moment(date)
    setDatestart(y);

    hideDatePicker();
  };
  const showDatePicker2 = () => {
   setDatePickerVisibility2(true);
 };

 const hideDatePicker2 = () => {
   setDatePickerVisibility2(false);
 };

 const handleConfirm2 = (date) => {
   const y=moment(date)
   setDateend(y)
   hideDatePicker2();
 };

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

   clocksAll=[];
   history=[];
   clocksperday=[];
useEffect(()=>{
  let isMounted=true;
  if(isMounted)
             { Axios.get('http://10.0.2.2:3001/getClock').then((response)=>{
                  setClocks(response.data);
            
                })}
                return () => { isMounted = false }
              },[clocks])
                accessible?  clocks.map((val)=>{

                    if(val.Clockout!=null){
              let t= moment(val.Clockin).utc().format('hh:mm:ss');
              let x= moment(val.Clockin).utc().format('YYYY/MM/DD');
               
    
    
              const ss=moment(val.Clockin);
              const ee=moment(val.Clockout);
              const r=moment.preciseDiff(ss,ee,true);
              const yyy=r['hours']+(r['minutes']/60.0)

              const hours=r['hours']+"H: "+r['minutes']+"M: "+r['seconds']+"S"
              let tt= moment(val.Clockout).utc().format('hh:mm:ss');
              let xx= moment(val.Clockout).utc().format('YYYY/MM/DD');

              let data={
                'id':val._id,
                'email':val.email,
                
                
                'clockintime':t,
                'clockindate':x,
                'clockouttime':tt,
                'clockoutdate':xx,
                'totalHours':hours,
                'yyy':yyy,
            };
  
            clocksAll.push(data);

                   



          }})

                :  clocks.map((val)=>{


                  if(val.email===emai){
                    if(val.Clockout!=null){
              let t= moment(val.Clockin).utc().format('hh:mm:ss');
              let x= moment(val.Clockin).utc().format('YYYY/MM/DD');
               
    
    
              const ss=moment(val.Clockin);
              const ee=moment(val.Clockout);
              const r=moment.preciseDiff(ss,ee,true);
              const yyy=r['hours']+(r['minutes']/60.0)

              const hours=r['hours']+"H: "+r['minutes']+"M: "+r['seconds']+"S"
              let tt= moment(val.Clockout).utc().format('hh:mm:ss');
              let xx= moment(val.Clockout).utc().format('YYYY/MM/DD');

              let data={
                'id':val._id,
                
                
                'clockintime':t,
                'clockindate':x,
                'clockouttime':tt,
                'clockoutdate':xx,
                'totalHours':hours,
                'yyy':yyy,
            };
  
            clocksAll.push(data);

                   



          }}})
              
          history=[];

accessible? clocksAll.map((val,key)=>{
        
  clocksAll.map((val2,key2)=>{
  if(val.clockindate===val2.clockindate && val.clockoutdate===val2.clockoutdate 
  && val.id!==val2.id && val.email===val2.email){
    if(history.length!=0){
      let flage=false;
    history.map((valt,key)=>{
      if(valt.in===val.clockindate){
        flage=true;}
    })
    if(flage===false){
      history.push({in:val.clockindate,total:0,email:val.email})

    }
  }
  else{
  
    
    history.push({in:val.clockindate,total:0,email:val.email})
        
  }
}

  }
  
  ) }): clocksAll.map((val,key)=>{
        
  clocksAll.map((val2,key2)=>{
  if(val.clockindate===val2.clockindate && val.clockoutdate===val2.clockoutdate 
  && val.id!==val2.id){
    if(history.length!=0){
      let flage=false;
    history.map((valt,key)=>{
      if(valt.in===val.clockindate){
        flage=true;}
    })
    if(flage===false){
      history.push({in:val.clockindate,total:0})

    }
  }
  else{
  
    
    history.push({in:val.clockindate,total:0})
        
  }
}

  }
  
  ) })
         
accessible? clocksAll.map((val,key)=>{
  let r=false;
  let duration;
  history.map((val2,key2)=>{
    if(val2.in===val.clockindate && val2.email===val.email)
    {
        r=true;
        val2.total=val2.total+val.yyy 
      
    }
    

  })

 if(r){

 }
    
  else{
     
    let data ={
      'total':val.totalHours  ,
      'date':val.clockindate ,
      'email':val.email,
    }
    clocksperday.push(data)



  }
  
  

})
: clocksAll.map((val,key)=>{
  let r=false;
  let duration;
  history.map((val2,key2)=>{
    if(val2.in===val.clockindate)
    {
        r=true;
        val2.total=val2.total+val.yyy 
      
    }
    

  })

 if(r){

 }
    
  else{
     
    let data ={
      'total':val.totalHours  ,
      'date':val.clockindate ,
    }
    clocksperday.push(data)



  }
  
  

})
     accessible?history.map((val,key)=>{
          
      const p=Math.floor(val.total)
      const uu=val.total-p;
      if(p===val.total){
        const pp=p+"H: "+"0"+"M: "+"0S"
        clocksperday.push({'total':pp,'date':val.in,'email':val.email})
      }
      else{
        const u=uu*60;
        const u3=Math.ceil(u);
        const pp=p+"H: "+u3+"M: "+"0S"

        clocksperday.push({'total':pp,'date':val.in,'email':val.email})
      }
     
    }):history.map((val,key)=>{
          
      const p=Math.floor(val.total)
      const uu=val.total-p;
      if(p===val.total){
        const pp=p+"H: "+"0"+"M: "+"0S"
        clocksperday.push({'total':pp,'date':val.in})
      }
      else{
        const u=uu*60;
        const u3=Math.ceil(u);
        const pp=p+"H: "+u3+"M: "+"0S"

        clocksperday.push({'total':pp,'date':val.in})
      }
     
    })      
            

    

            employees.map((val)=>{
              if(val.email===emai){
                if(val.accessible==="No"){
                  accessible=false;
            
                }
                else{
                  accessible=true;
            
                }
            
              }
            })
        
     

     
        
      
    
accessible?
clocksperday.map((val)=>{
  employees.map((valr)=>{
    if(valr.email===val.email){
      val.email=valr.firstName+" "+valr.lastName;
    }
  })
})
:null

function handlepress(){
Alert.alert("date")
}
return ( 
<View >
       <HomeHeader navigation={navigation}/>

       {accessible?
       <View>
        <TouchableOpacity style={styles.container2} 
       >
           
           <Text style={styles.text2}>    Name               </Text>
           <Text style={styles.text2}>      Date           </Text>
           <Text style={styles.text2}>      Duration  </Text>

          
          
           </TouchableOpacity>


           
      {
       clocksperday.map((val,key)=>{
         let icon;

         if(val.total>="8H: 0M: 0S"){
           icon=<Icon4  style={{margin:5}} name="checkcircle" color="green" size={28}/>
         }
         else{
           icon=<Icon2  style={{margin:5}} name="error" color="red" size={28}/>

         }

         return  <View key={uuidv4()}  >
           <TouchableOpacity
          
           style={styles.container2}
           onPress={()=>{
            setDate(val.date)
            employees.map((valut)=>{
              if(valut.firstName+" "+valut.lastName===val.email){
                setChosenName(valut.email)
              }
            })
            
            setShow(true)}} 
           
            >
           {icon}
           <Text style={styles.text2}>{val.email}   </Text>
           <Text style={styles.text2}>{val.date}   </Text>
           <Text style={styles.text2}>{val.total}  </Text>
           </TouchableOpacity>
           
           </View>
       })
      }
       { show && <ModalPoup visible={show}>
       <View style={{alignItems: 'center'}}>
         <View style={styles.header}>
          <Icon4  name='close'size={25} onPress={()=>setShow(false)}/>
         </View>
       </View>
     

       
          {
           clocksAll.map((val,key)=>{
             const y=val.clockindate
             if(y===date && cohsen===val.email ){
   
             return  (<View style={styles.container} >
     <Icon4 name='clockcircleo' size={25} style={{marginLeft:10,marginTop:15}}/>


               <Text style={styles.textjj}>
                 
                 {val.clockintime}---{val.clockouttime}</Text>
              
               </View>);
               }
           })
          }
         




         
       
     </ModalPoup>}
      

       </View>
       :
       <View>
         <TouchableOpacity style={styles.container}  >
           
           <Text style={styles.text}>         Date          </Text>
           <Text style={styles.text}>      Duration  </Text>
          
          
           </TouchableOpacity>
      
      
      {
       clocksperday.map((val,key)=>{
         let icon;

         if(val.total>="8H: 0M: 0S"){
           icon=<Icon4  style={styles.textIcon} name="checkcircle" color="green" size={30}/>
         }
         else{
           icon=<Icon2  style={styles.textIcon} name="error" color="red" size={30}/>

         }

         return  <View key={uuidv4()}  >
           <TouchableOpacity style={styles.container}  onPress={()=>{
             setDate(val.date)
             
             setShow(true)}}>
           {icon}
           <Text style={styles.text}>{val.date}   </Text>
           <Text style={styles.text}>{val.total}  </Text>
           <Icon3  style={styles.textIcon2} name='arrow-right' />
           </TouchableOpacity>
           
           </View>
       })
      }
     
    
   { show && <ModalPoup visible={show}>
       <View style={{alignItems: 'center'}}>
         <View style={styles.header}>
          <Icon4  name='close'size={25} onPress={()=>setShow(false)}/>
         </View>
       </View>
     

       
          {
           clocksAll.map((val,key)=>{
             const y=val.clockindate
             if(y===date ){
   
             return  (<View style={styles.container} >
     <Icon4 name='clockcircleo' size={25} style={{marginLeft:10,marginTop:15}}/>


               <Text style={styles.textjj}>
                 
                 {val.clockintime}---{val.clockouttime}</Text>
              
               </View>);
               }
           })
          }
         




         
       
     </ModalPoup>}
        
    


      </View>}
      
   
       


    </View>
   );
}

 const styles = StyleSheet.create({
  container2: {
    
    flexDirection:'row',
    
    marginVertical:5,
    paddingVertical:10,
    borderWidth:1,
    borderColor:'grey',
    backgroundColor:'white',
    borderRadius:10,

    
 
  },
  text2:{
    fontSize:17,
    fontWeight:'bold',
    margin:5,

  },
  textjj2:{
    fontSize:20,
    fontWeight:'bold',
    margin:12,
    marginLeft:20

  },
  textIcon22:{
    fontSize:20,
    fontWeight:'bold',
    margin:15,
    borderRadius:100,
    borderWidth:1,
    color:colors.buttons,

  },
  textIcon2:{
    marginLeft:5,
    marginTop:5,
    marginRight:5,

  },
  container: {
    
    flexDirection:'row',
    
    marginVertical:5,
    paddingVertical:10,
    borderWidth:1,
    borderColor:'grey',
    backgroundColor:'white',
    borderRadius:10,

    
 
  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    margin:10,

  },
  textjj:{
    fontSize:20,
    fontWeight:'bold',
    margin:12,
    marginLeft:20

  },
  textIcon2:{
    fontSize:20,
    fontWeight:'bold',
    margin:15,
    borderRadius:100,
    borderWidth:1,
    color:colors.buttons,

  },
  textIcon:{
    marginLeft:10,
    marginTop:10,
    marginRight:10,

  },

  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
 
})


