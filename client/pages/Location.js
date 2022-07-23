import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet,ScrollView, Text, View,Animated,Modal,Alert,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import{colors} from "../global/styles"
import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import moment, { preciseDiff } from 'moment';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import Axios from 'axios';
import Icon4 from 'react-native-vector-icons/AntDesign';
import MapView,{Marker,Circle} from 'react-native-maps';

let Mylocations=[];

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
export default function Location({navigation}){
   const [emai,setEmail]=useState("");
   const [locations,setLocations]=useState([])

const [show,setShow]=useState(false)
const [longitude,setLangitude]=useState()
const [latitude,setLatitude]=useState()

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
    Mylocations=[];

    useEffect(()=>{
      Axios.get('http://10.0.2.2:3001/getLocation').then((response)=>{
        setLocations(response.data);}) })

        locations.map((val)=>{
         if(val.email===emai)
          {
            Mylocations.push({
               "id":val._id,
               "longitude":val.longitude,
               "latitude":val.Latitude,
               'date':val.Date,

            })
          }
        })
   
      
  

    
  

return ( 
 
    <View >
    <HomeHeader navigation={navigation}/>
    <View>
      
      <View>
    
    <TouchableOpacity style={styles.container}  >
                        <Text  style={styles.text}> Date  </Text>

            <Text  style={styles.text}>          Latitude    </Text>
            <Text style={styles.text}>  Longitude </Text>
           
            </TouchableOpacity>
            
    {

      Mylocations.map((val,key)=>{
         const y=moment(val.date).utc().format("YYYY/MM/DD")
         return ( <TouchableOpacity style={styles.container} onPress={
            ()=>{
               setShow(true)
               setLangitude(val.longitude)
               setLatitude(val.latitude)
            }
         }   >
                        <Text  style={styles.text}>{y}  </Text>

            <Text key={val.id} style={styles.text}>{val.latitude}  </Text>
            <Text style={styles.text}>{val.longitude} </Text>
           
            </TouchableOpacity>);
      })
    }
    </View>
   
   
{show &&  <View style={styles.mapPreview}>
            

        
        <MapView style={{width:'100%',height:'100%'}} 
        
   
        >
             <Marker 
     
     coordinate={{ latitude : parseFloat(latitude) , longitude : parseFloat(longitude) }}>


     </Marker>
   

    
            </MapView>


    

  


           </View>  }
           
  



   
           </View>
          
           
          
    </View>
   
   );
}

const styles = StyleSheet.create({
   container: {
     
     flexDirection:'row',
     
     marginVertical:5,
     paddingVertical:10,
    
     borderColor:'grey',
     backgroundColor:'#FFC300',
     borderRadius:10,
 
     
  
   },
   text:{
     fontSize:18,
     fontWeight:'bold',
     margin:15,
     
     
 
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
  
 });
 
