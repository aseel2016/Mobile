import React,{useState,useEffect,useRef,useCallback} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text,Image, View,Alert,Dimensions,ImageBackground,TextInput, ScrollView} from 'react-native';
import {   GiftedChat } from 'react-native-gifted-chat'
import HomeHeader from '../components/HomeHeader';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider,Card} from 'react-native-paper'
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import "react-native-get-random-values";
import { Button } from 'react-native-paper';
import { colors } from '../global/styles';

export default function Message({message,currentId,own,image,name}){
    let u;
    if(!own){
        u=<View style={{flexDirection:'row',marginRight:50}}>
       
       
         <Image

     style={{width:35,height:35,borderRadius:100,margin:5}}
     source={{uri:image}}
   />
   
 <View>
<Provider>
   <Card style={{margin:10,padding:10,marginRight:50,width:300}}>
   <Text style={{fontWeight:'bold',color:"#30D5B7",marginBottom:5}}>{name}</Text>

 <Text style={{fontSize:15}}>{message.text}</Text>
 <Text style={{fontSize:15,color:'grey',alignSelf:'flex-end',margin:5}}>{moment(message.createdAt).fromNow()}</Text>

 </Card>
 </Provider>
   </View>

        </View>
     
     }
     else{
       u=<View style={{flexDirection:"row",marginLeft:50}}>

<View style={{margin:20}}>
 <Provider>
<Card style={{margin:10,padding:10,backgroundColor:'#DCF8C5',width:300}}>


 <Text style={{fontSize:15}}>{message.text}</Text>
 <Text style={{fontSize:15,alignSelf:'flex-end',color:'grey',margin:5}}>{moment(message.createdAt).fromNow()}</Text>

 </Card>  
 </Provider>
   </View>

      </View>


     }
     return (<View key={uuidv4()}>
       <View>{u}</View>

       
     </View>);
}