import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,TouchableOpacity,Modal,Animated,ScrollView, Text, View,Alert,Dimensions, FlatList} from 'react-native';
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
import { Searchbar } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Card,Avatar,IconButton } from 'react-native-paper';
import {  Portal,Snackbar ,TextInput,Checkbox  ,  Button, Provider } from 'react-native-paper';

import Axios from 'axios';
let clocksAll=[];
let history=[];
let clocksperday=[];
let accessible;

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
 
  React.useEffect(() => {

    let isMounted=true;
    if(isMounted)
   { toggleModal();}
   return () => { isMounted = false }


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

   const [searchQuery, setSearchQuery] = React.useState('');

   const onChangeSearch = query => setSearchQuery(query);
   const [dateStart, setDatestart] =useState("");

   
   const onDismissSnackBar = () => setVisible(false);
  
  
  
     const[totalDays,setTotaldays]=useState([]);
  
     const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  
  
   
   useEffect(()=>{
    let isMounted=true;
    if(isMounted){
    Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
        setEmployees(response.data);
  
      })
    }
    return () => { isMounted = false }


  },[]);
  


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
              let x= moment(val.Clockin).utc().format('YYYY-MM-DD');
               
    
    
              const ss=moment(val.Clockin);
              const ee=moment(val.Clockout);
              const r=moment.preciseDiff(ss,ee,true);
              const yyy=r['hours']+(r['minutes']/60.0)

              const hours=r['hours']+"H: "+r['minutes']+"M: "+r['seconds']+"S"
              let tt= moment(val.Clockout).utc().format('hh:mm:ss');
              let xx= moment(val.Clockout).utc().format('YYYY-MM-DD');

              let data={
                'id':val._id,
                'email':val.email,
                'location':val.location,
                
                
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
              let x= moment(val.Clockin).utc().format('YYYY-MM-DD');
               
    
    
              const ss=moment(val.Clockin);
              const ee=moment(val.Clockout);
              const r=moment.preciseDiff(ss,ee,true);
              const yyy=r['hours']+(r['minutes']/60.0)

              const hours=r['hours']+"H: "+r['minutes']+"M: "+r['seconds']+"S"
              let tt= moment(val.Clockout).utc().format('hh:mm:ss');
              let xx= moment(val.Clockout).utc().format('YYYY-MM-DD');

              let data={
                'id':val._id,
                'location':val.location,
                
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

let records=[];
const myData = [].concat(clocksperday)
    .sort((a, b) => a.date > b.date ? -1 : 1)


 async function handlepressed (){
Alert.alert("gg")
 }
return ( 
  <ScrollView style={{width:'100%'}}>
<View >
       <HomeHeader navigation={navigation}/>

       {accessible?
       <View>

<View style={{flexDirection:'row'}}>

<IconButton mode="contained"
  icon="calendar"
  size={30}
  style={{marginTop:20}}
       onPress={showDatePicker2}
       />

<TextInput
   
   label="choose Date ..."
   value={dateStart}
   onChangeText={(text)=>setDatestart(text)}
  
   style={{width:330,marginVertical:10}} 
   
  
 />

   
</View>

     <DateTimePickerModal
      isVisible={isDatePickerVisible2}
      mode="date"
      onConfirm={handleConfirm2}
      onCancel={hideDatePicker2}
    />
        <TouchableOpacity style={styles.container2} 
       >
           
           <Text style={styles.text2}>    Name               </Text>
           <Text style={styles.text2}>      Date           </Text>
           <Text style={styles.text2}>      Duration  </Text>

          
          
           </TouchableOpacity>


           
      {
       myData.map((val,key)=>{
         let icon;
         const y=val.total.split(" ");
         const o=y[0].split("H")  
           const integerHour= parseInt(o[0]);
         
         
                  
         
                  if(integerHour ===8){
                   icon=<Icon4  style={styles.textIcon} name="checkcircle" color="green" size={30}/>
                 }
                  else if(integerHour >8){
         
                   icon=<Icon4  style={styles.textIcon} name="checkcircle" color="green" size={30}/>
         
         
         
                  }
                  else{
                   icon=<Icon2  style={styles.textIcon} name="error" color="red" size={30}/>
         
                  }

                  if(dateStart!==""){
                    if(val.date===dateStart){
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
                    }
                    
                  }
                  else{
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

                  }

         
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
   
             return  (<View style={styles.container} key={uuidv4()} >
     <Icon4 name='clockcircleo' size={25} style={{marginLeft:10,marginTop:15}}/>


               <Text style={styles.textjj}>
                 
                 {val.clockintime}---{val.clockouttime}</Text>

                 <Button mode="contained" 
  onPress={()=>{
    navigation.navigate("Location",{location:val.location});

  }}
  style={{margin:10}}
  >

 
 <Icon2 name='location-pin' size={25}
 />

</Button>
              
               </View>);
               }
           })
          }
         




         
       
     </ModalPoup>}
      

       </View>
       :
       <View>
        <View style={{flexDirection:'row'}}>

<IconButton mode="contained"
  icon="calendar"
  size={30}
  style={{marginTop:20}}
       onPress={showDatePicker2}
       />

<TextInput
   
   label="choose Date ..."
   value={dateStart}
   onChangeText={(text)=>setDatestart(text)}
  
   style={{width:330,marginVertical:10}} 
   
  
 />

   
</View>

     <DateTimePickerModal
      isVisible={isDatePickerVisible2}
      mode="date"
      onConfirm={handleConfirm2}
      onCancel={hideDatePicker2}
    />





         <TouchableOpacity style={styles.container}  >
           
           <Text style={styles.text}>         Date          </Text>
           <Text style={styles.text}>      Duration  </Text>
          
          
           </TouchableOpacity>
      
      
      {
       myData.map((val,key)=>{
         let icon;
         const y=val.total.split(" ");
const o=y[0].split("H")  
  const integerHour= parseInt(o[0]);


         

         if(integerHour ===8){
          icon=<Icon4  style={styles.textIcon} name="checkcircle" color="green" size={30}/>
        }
         else if(integerHour >8){

          icon=<Icon4  style={styles.textIcon} name="checkcircle" color="green" size={30}/>



         }
         else{
          icon=<Icon2  style={styles.textIcon} name="error" color="red" size={30}/>

         }

         if(dateStart!==""){
          if(val.date===dateStart){
               return  <View key={uuidv4()}  >
          <TouchableOpacity style={styles.container}  
          onPress={()=>{
            setDate(val.date)             
            setShow(true)}}>
          {icon}
          <Text style={styles.text}>{val.date}   </Text>
          <Text style={styles.text}>{val.total}  </Text>
          <Icon3  style={styles.textIcon2} name='arrow-right' />
          </TouchableOpacity>
          
          </View>

          }

         }
         else{
          return  <View key={uuidv4()}  >
          <TouchableOpacity style={styles.container}  
          onPress={()=>{
            setDate(val.date)             
            setShow(true)}}>
          {icon}
          <Text style={styles.text}>{val.date}   </Text>
          <Text style={styles.text}>{val.total}  </Text>
          <Icon3  style={styles.textIcon2} name='arrow-right' />
          </TouchableOpacity>
          
          </View>


         }

        
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
   
             return  (
             
             <View style={styles.container} key={uuidv4()}>
     <Icon4 name='clockcircleo' size={25} style={{marginLeft:10,marginTop:15}}/>


               <Text style={styles.textjj}>
                 
                 {val.clockintime}---{val.clockouttime}</Text>


  <Button mode="contained" 
  onPress={()=>{
    navigation.navigate("Location",{location:val.location});

  }}
  style={{margin:10}}
  >

 
 <Icon2 name='location-pin' size={25}
 />

</Button>
              
               </View>);
               }
           })
          }

         




         
       
     </ModalPoup>}
        
    


      </View>}
      
   
       


    </View>
    </ScrollView>
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
    fontSize:16,
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
    width: '100%',
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


