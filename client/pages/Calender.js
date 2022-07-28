import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text,TouchableOpacity, View,ScrollView,Alert,Dimensions} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import HomeHeader from '../components/HomeHeader';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { colors } from '../global/styles';
import { Card,Avatar,IconButton } from 'react-native-paper';
import { Modal, Portal,Snackbar ,TextInput,Checkbox  ,  Button, Provider } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
let dataEvent=[];

let idEventF;
let eventupdate;
export default function Calender({navigation}){
  const [checked, setChecked] = useState(false);
  const [sub, setSub] = useState("");
  const [desc, setDesc] = useState("");
  const [dateStart, setDatestart] =useState(moment());

  const [dateend, setDateend] = useState(moment());
  const [timeStart, setTimestart] = useState(moment());
  const [timeend, setTimeend] =useState(moment());
const[already,setAlready]=useState(false)
  const [emai,setEmail]=useState("");
  const [employees,setEmployees]=useState([]);
const [items,setItems]=useState({});
const [flag,setFlag]=useState(false);
const [events,setEvents]=useState([]);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
   const [visible, setVisible] = useState(false);
   const [visible2, setVisible2] = useState(false);
   const [visible3, setVisible3] = useState(false);


   const [idEvent, setIdEvent] = useState("");

   const randomNumber = () => {
    const generateRandomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${generateRandomColor}`;
}
   const onToggleSnackBar = () => setVisible(!visible);
 
   const onDismissSnackBar = () => setVisible(false);
   const onToggleSnackBar2 = () => setVisible2(!visible2);
 
   const onDismissSnackBar2 = () => setVisible2(false);

   const onToggleSnackBar3 = () => setVisible3(!visible3);
 
   const onDismissSnackBar3 = () => setVisible3(false);
   const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
   const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);

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

  const showDatePicker3 = () => {
    setDatePickerVisibility3(true);
  };

  const hideDatePicker3 = () => {
    setDatePickerVisibility3(false);
  };

  const handleConfirm3 = (time) => {
    const y=moment(time)
    console.log(y)

    setTimestart(y);

    hideDatePicker3();
  };


  
  const showDatePicker4 = () => {
    setDatePickerVisibility4(true);
  };

  const hideDatePicker4 = () => {
    setDatePickerVisibility4(false);
  };

  const handleConfirm4 = (time) => {
    const y=moment(time)
    console.log(y)

    setTimeend(y);

    hideDatePicker4();
  };
dataEvent=[];
useEffect(()=>{

  let isMounted=true;
  if(isMounted)
  {Axios.get('http://10.0.2.2:3001/getAllEvents').then((response)=>{
    setEvents(response.data);
   
   
  
  })}
  return () => { isMounted = false }
  },[events]);


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
   useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
        setEmployees(response.data);
  
      })
   
  },[]);
  events.map((val,key)=>{
    let d;
    if(val.Emails.includes(emai)){
    if(val.Location===' ' || val.StartTimezone===' ' || val.EndTimezone===' ' ||  val.RecurrenceRule===' '){
      
      if(val.Location===' ' && val.StartTimezone===' ' && val.EndTimezone===' ' &&  val.RecurrenceRule===' ')
      {
        d={Id:val.Id, Subject: val.Subject, StartTime: val.StartTime, EndTime: val.EndTime,
          IsAllDay:val.IsAllDay,resouceID:val.resouceID,Description:val.Description,
            }; 
      }
   
      else if(val.StartTimezone===' ' && val.EndTimezone===' ' &&  val.RecurrenceRule===' '){
        d={Id:val.Id, Subject: val.Subject, StartTime: val.StartTime, EndTime: val.EndTime,
          IsAllDay:val.IsAllDay,resouceID:val.resouceID,Description:val.Description,
          Location:val.Location,
            };
      }
      else if(val.StartTimezone===' ' && val.EndTimezone===' ' ){
        d={Id:val.Id, Subject: val.Subject, StartTime: val.StartTime, EndTime: val.EndTime,
          IsAllDay:val.IsAllDay,resouceID:val.resouceID,Description:val.Description,
          Location:val.Location,
          RecurrenceRule:val.RecurrenceRule,
            };
      }
      else if(val.RecurrenceRule===' ' ){
        d={ Id:val.Id,Subject: val.Subject, StartTime: val.StartTime, EndTime: val.EndTime,
          IsAllDay:val.IsAllDay,resouceID:val.resouceID,Description:val.Description,
          Location:val.Location,
          StartTimezone:val.StartTimezone,
      EndTimezone:val.EndTimezone,
          
            };
      }
      else if(val.StartTimezone===' ' && val.EndTimezone===' ' && val.Location===' '){
        d={ Id:val.Id,Subject: val.Subject, StartTime: val.StartTime, EndTime: val.EndTime,
          IsAllDay:val.IsAllDay,resouceID:val.resouceID,Description:val.Description,
          RecurrenceRule:val.RecurrenceRule,
            };
      }
      else if( val.Location===' '){
        d={ Id:val.Id,Subject: val.Subject, StartTime: val.StartTime, EndTime: val.EndTime,
          IsAllDay:val.IsAllDay,resouceID:val.resouceID,Description:val.Description,
          StartTimezone:val.StartTimezone,
          EndTimezone:val.EndTimezone,
          RecurrenceRule:val.RecurrenceRule,
            };
      }
    }
  
    else {
      d={Id:val.Id, Subject: val.Subject, StartTime: val.StartTime, EndTime: val.EndTime,
        IsAllDay:val.IsAllDay,resouceID:val.resouceID,Description:val.Description,
        Location:val.Location,StartTimezone:val.StartTimezone,
        EndTimezone:val.EndTimezone,
        RecurrenceRule:val.RecurrenceRule,
      };
  
    }
  
    dataEvent.push(d);
  }
  else{
    
  }
  }
  )
  
  async function handleupdateEvent(){
      const y=dateStart.format("YYYY-MM-DD")
      const h=timeStart.format("hh:mm:ss")
      const f=(y+"T"+h).toString();
      const f2=new Date(f)

      const y1=dateend.format("YYYY-MM-DD")
      const h1=timeend.format("hh:mm:ss")
      const f1=(y1+"T"+h1).toString();
      const f3=new Date(f1)
      
      const response = await fetch('http://10.0.2.2:3001/update_event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Id:eventupdate,
				Subject:sub,
        StartTime:f2,
        EndTime:f3,
        IsAllDay:checked,       
        resouceID:1,
        Description:desc,
			}),

		})
    const data = await response.json()

		if (data.user) {
	
setVisible2(true)

       
     
		
		} else

		{
			
			
		}
     
    

  }
  async function handledeleteEvent(){
  
    
    const response = await fetch('http://10.0.2.2:3001/delete_event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Id:eventupdate,
     
    }),

  })
  const data = await response.json()

  if (data.user) {

setVisible3(true)

     
   
  
  } else

  {
    
    
  }
   
  

}
  async function handlecreateEvent(){
    const y=dateStart.format("YYYY-MM-DD")
    const h=timeStart.format("hh:mm:ss")
    const f=(y+"T"+h).toString();
    const f2=new Date(f)

    const y1=dateend.format("YYYY-MM-DD")
    const h1=timeend.format("hh:mm:ss")
    const f1=(y1+"T"+h1).toString();
    const f3=new Date(f1)
    
    const response = await fetch('http://10.0.2.2:3001/insert_event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Id:uuidv4(),
      Subject:sub,
      StartTime:f2,
      EndTime:f3,
      IsAllDay:checked,       
      resouceID:1,
      Description:desc,
    }),

  })
  const data = await response.json()

  if (data.user) {

setVisible(true)

     
     idEventF=data.id;
     console.log("FF",idEventF)

  
  } else

  {
    
    
  }
   
  const response2 = await fetch('http://10.0.2.2:3001/update_email2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Id:idEventF,
      email:emai,
    }),

  })
  

}
const timeToString=(time)=> {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}
const loadItems = (day) => {
  const items = items || {};

  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime =timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];
        
          dataEvent.map((val)=>{
            if(val.IsAllDay){
              const y=moment(val.StartTime).format("YYYY-MM-DD")
              if(y===strTime){
                items[strTime].push({
                  Id:val.Id,
                  
                  name: val.Subject,
                  description:val.Description,
                  isAllday:"All day",
                  day: strTime,
                
                });
  
              }
              
            }
            else{
              const y=moment(val.StartTime).format("YYYY-MM-DD")
              const h=moment(val.StartTime).utc().format("hh:mm");
              const y2=moment(val.EndTime).format("YYYY-MM-DD")
              const h2=moment(val.EndTime).utc().format("hh:mm");
              if(y===y2)
              {if(y===strTime){
                items[strTime].push({
                  Id:val.Id,
                  name: val.Subject,
                  description:val.Description,
                  color:randomNumber(),
                  isAllday:"From "+h+" To "+h2,
                  day: strTime,
                
                });
  
              }}
              else{
                if(strTime>=y && strTime<=y2){
                  items[strTime].push({
                    Id:val.Id,
                    name: val.Subject,
                    description:val.Description,
                    color:randomNumber(),
                    isAllday:"From"+y+" To"+y2,
                    day: y,
                  
                  });
    
                }

              }




            }

           

          })
          
        
      }
    }
    
    const newItems = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
   setItems(newItems)
  }, 1000,[events]);
}
      const renderItem=(item)=>{
        return(
        <ScrollView>
        <TouchableOpacity
        style={{marginRight:10,marginTop:16}}
        onPress={()=>{
        setAlready(true)
        dataEvent.map((val)=>{
          if(val.Id===item.Id){
            eventupdate=val.Id;
            const y=moment(val.StartTime).utc()
            const y2=moment(val.EndTime).utc()
            setDatestart(y)
            setTimestart(y)
            setDateend(y2)
            setTimeend(y2)
            
            setSub(val.Subject)
                    
            setDesc(val.Description)
            setChecked(val.IsAllDay)
            

            


          }
        })


        
        }}
        >
      
          <Card>
            <Card.Content>
              <View
               style={{flexDirection:'row',
               justifyContent:'space-between',
               alignItems:'center'}}>
                <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{fontSize:18,fontWeight:'bold'}}>{item.description}</Text>
                <Text style={{fontSize:15,fontWeight:'bold'}}>🕑 {item.isAllday}</Text>
                </View>

                <Avatar.Text label={Array.from(item.name)[0]} style={{backgroundColor:item.color}}/>
                
              </View>

            </Card.Content>
          </Card>
        </TouchableOpacity>
        </ScrollView>);

      }
      const showModal = () => setFlag(true);
      const hideModal = () => setFlag(false);
      const hideModal2 = () => setAlready(false);

      const containerStyle = {backgroundColor: 'white', padding: 20};

   

return ( 
<View style={{flex:1}}>
<HomeHeader navigation={navigation}/>
{/*<Text 
        style={{fontSize:25,fontWeight:"bold",padding:20,backgroundColor:'#E2E0E0'}}
        
> 📅 My Calendar</Text> */}

 <Agenda
   items={items}
   loadItemsForMonth={loadItems}
   selected={moment().format("YYYY-MM-DD")}
   renderItem={renderItem}
   renderEmptyData={() => {
    return <View style={{justifyContent:'center',
     marginVertical:300,alignItems:'center'}}><Text style={{fontSize:18,fontWeight:'bold'}}>No Scheduled Events</Text></View>;
  }}
 />
 

  <Icon3
  color='#C70039'
    name='add-circle'
  style={{marginLeft:310,margin:20}}
  size={70}
  onPress={() => setFlag(true)}
  
  />
{
  flag &&  <Provider>
  <Portal>
 
    <Modal style={{flex:1}} visible={flag} onDismiss={hideModal} contentContainerStyle={containerStyle}>
    <TextInput
      label="Subject"
      value={sub}
      onChangeText={text => setSub(text)}
      style={{margin:10}}
      

    />
    <TextInput
      label="Description"
      value={desc}
      onChangeText={text => setDesc(text)}
      style={{margin:10}}
      multiline={true}
      numberOfLines={3}
      

      

    />
    
    <View style={{flexDirection:'row'}}>
    <IconButton mode="contained"
    icon="calendar"
         onPress={showDatePicker}/>
  

  <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
       <TextInput
     
      label="Start date"
      value={dateStart.format("YYYY-MM-DD")}
      
      style={{width:120,marginVertical:10,color:'black'}}
      disabled
     
    />


<IconButton mode="contained"
    icon="clock"
         onPress={showDatePicker3}/>
  

  <DateTimePickerModal
        isVisible={isDatePickerVisible3}
        is24Hour={true}
        mode="time"
        onConfirm={handleConfirm3}
        onCancel={hideDatePicker3}
      />
       <TextInput
     
      label="Start time"
      value={timeStart.format("hh:mm")}
      
      style={{width:125,marginVertical:10,color:'black'}}
      disabled
     
    />
      
       
       
       
</View>
       
<View style={{flexDirection:'row'}}>

  <IconButton mode="contained"
    icon="calendar"
         onPress={showDatePicker2}
         />

<TextInput
     
     label="End date"
     value={dateend.format("YYYY-MM-DD")}
     
     style={{width:125,marginVertical:10}}
     disabled
    
   />
   <IconButton mode="contained"
    icon="clock"
         onPress={showDatePicker4}/>
  

  <DateTimePickerModal
        isVisible={isDatePickerVisible4}
        mode="time"
        is24Hour={true}
        onConfirm={handleConfirm4}
        onCancel={hideDatePicker4}
      />
       <TextInput
     
      label="End time"
      value={timeend.format("hh:mm")}
      
      style={{width:125,marginVertical:10,color:'black'}}
      disabled
     
    />
      
</View>

       <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />
<View style={{flexDirection:'row',marginHorizontal:5}}>

<Checkbox 
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    /> 
    <Text style={{margin:5,fontSize:17,fontWeight:'bold'}}>All day</Text>   
</View>
 

<Button  mode="contained"  style={{marginVertical:40}} onPress={handlecreateEvent}>
    Add to calendar
  </Button>
  <Snackbar
    
    style={{backgroundColor:'green'}}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Close',
            onPress: () => {
              setVisible(false)
            },
          }}>
          
          Inserted  successfully to your calendar .
        </Snackbar>
      
   
    </Modal>
   
  </Portal>
  
</Provider>
}
{
  already &&  <Provider>
  <Portal>
 
    <Modal style={{flex:1}} visible={already} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
    <TextInput
      label="Subject"
      value={sub}
      onChangeText={text => setSub(text)}
      style={{margin:10}}
      

    />
    <TextInput
      label="Description"
      value={desc}
      onChangeText={text => setDesc(text)}
      style={{margin:10}}
      multiline={true}
      numberOfLines={3}
      

      

    />
    
    <View style={{flexDirection:'row'}}>
    <IconButton mode="contained"
    icon="calendar"
         onPress={showDatePicker}/>
  

  <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
       <TextInput
     
      label="Start date"
      value={dateStart.format("YYYY-MM-DD")}
      
      style={{width:120,marginVertical:10,color:'black'}}
      disabled
     
    />


<IconButton mode="contained"
    icon="clock"
         onPress={showDatePicker3}/>
  

  <DateTimePickerModal
        isVisible={isDatePickerVisible3}
        is24Hour={true}
        mode="time"
        onConfirm={handleConfirm3}
        onCancel={hideDatePicker3}
      />
       <TextInput
     
      label="Start time"
      value={timeStart.format("hh:mm")}
      
      style={{width:125,marginVertical:10,color:'black'}}
      disabled
     
    />
      
       
       
       
</View>
       
<View style={{flexDirection:'row'}}>

  <IconButton mode="contained"
    icon="calendar"
         onPress={showDatePicker2}
         />

<TextInput
     
     label="End date"
     value={dateend.format("YYYY-MM-DD")}
     
     style={{width:125,marginVertical:10}}
     disabled
    
   />
   <IconButton mode="contained"
    icon="clock"
         onPress={showDatePicker4}/>
  

  <DateTimePickerModal
        isVisible={isDatePickerVisible4}
        mode="time"
        is24Hour={true}
        onConfirm={handleConfirm4}
        onCancel={hideDatePicker4}
      />
       <TextInput
     
      label="End time"
      value={timeend.format("hh:mm")}
      
      style={{width:125,marginVertical:10,color:'black'}}
      disabled
     
    />
      
</View>

       <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />
<View style={{flexDirection:'row',marginHorizontal:5}}>

<Checkbox 
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    /> 
    <Text style={{margin:5,fontSize:17,fontWeight:'bold'}}>All day</Text>   
</View>
 
<View style={{flexDirection:'row'}}>
<Button icon="update" mode="contained"  style={{marginVertical:40,marginHorizontal:40,backgroundColor:'green'}} onPress={handleupdateEvent}>
    Update
  </Button>
  <Button icon="delete" mode="contained"  style={{marginVertical:40,marginHorizontal:40,backgroundColor:'red'}} onPress={handledeleteEvent}>
   Delete
  </Button>
</View>

 


        <Snackbar
    
    style={{backgroundColor:'green'}}
          visible={visible2}
          onDismiss={onDismissSnackBar2}

          action={{
            label: 'Close',
            onPress: () => {
              setVisible2(false)
            },
          }}
          >
          Updated  successfully to your calendar .
        </Snackbar>
        <Snackbar
    
    style={{backgroundColor:'red'}}
          visible={visible3}
          onDismiss={onDismissSnackBar3}
          action={{
            label: 'Close',
            onPress: () => {
              setVisible3(false)
            },
          }}
          >
         Deleted  successfully ...
        </Snackbar>

   
    </Modal>
   
  </Portal>
  
</Provider>
}


        </View>


   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#A8E9CA'
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: 'left',
    width: 230,
    fontSize: 16,
    color : "#000"
  }
});
