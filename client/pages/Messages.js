import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet,TouchableHighlight,TouchableOpacity,Animated, Text, View,Alert,Dimensions,TextInput} from 'react-native';

import HomeHeader from '../components/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {
  Avatar,Button
}from 'react-native-elements'
import Axios from 'axios';
let  messages2=[];
let  messages3=[];
export default function Messages({ navigation }){
    const  [notification,setNotification]=useState([]);
    const [employees,setEmployees]=useState([]);
    const[email,setEmail]=useState('')
    const notification2=[];
    const  [messages,setMessages]=useState([]);
   
    
    useEffect(()=>{
      Axios.get('http://10.0.2.2:3001/getAllActive').then((response)=>{
          setEmployees(response.data);
    
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
           
          }
        } catch(e) {
          // error reading value
          alert("wrong")
        }
      }
      
      getData()
      messages2=[];
      messages3=[];
      useEffect(
        () =>
              onSnapshot(collection(db, "messages"), (snapshot) =>
              setMessages(snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()}) )))
          ,
        []
      );

    //messages
    messages.map(doc=>{
      const g=doc.receiverId;
      employees.map((val)=>{
        if(val._id===g){
          if(val.email===email){
            messages2.push(doc);
    
          }
    
        }
      })
     
    })
    messages2.map((val)=>{
      employees.map((val3)=>{
        if(val3._id===val.senderId){
          let data={
            'key':val.id,
            'name':val3.firstName+" "+val3.lastName,
            'image':val3.image,
            'message':val.msg,
          }
          messages3.push(data);
        }
    
      })
      
    })
    const onLeftActionStatusChange = rowKey => {
      console.log('onLeftActionStatusChange', rowKey);
    };
  
    const onRightActionStatusChange = rowKey => {
      console.log('onRightActionStatusChange', rowKey);
    };
  
    const onRightAction = rowKey => {
      console.log('onRightAction', rowKey);
    };
  
    const onLeftAction = rowKey => {
      console.log('onLeftAction', rowKey);
    };
  
    const VisibleItem = props => {
      const {
        data,
        rowHeightAnimatedValue,
        removeRow,
        leftActionState,
        rightActionState,
      } = props;
  
      if (rightActionState) {
        Animated.timing(rowHeightAnimatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          removeRow();
        });
      }
  
      return (
        <Animated.View
          style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
          <TouchableHighlight
            style={styles.rowFrontVisible}
            onPress={() => console.log('Element touched')}
            underlayColor={'#aaa'}>
<View>
            <View style={{flexDirection:'row'}}>
            <Avatar
    rounded
    avatarStyle={{ borderWidth:2,
      borderColor:"white"}}
    size={50}
    source={{uri:data.item.image}}

    />
   
               <View style={{flexDirection:'column'}}>
              <Text style={{margin:5,fontSize:18,fontWeight:'800'}} numberOfLines={1}>
                {data.item.name}
              </Text>
              <Text style={{marginLeft:5,fontSize:16,fontWeight:'800'}} numberOfLines={1}>
                {data.item.message}
              </Text>
              </View>
              </View>
              
             
             
              
             
            </View>
          </TouchableHighlight>
        </Animated.View>
      );
    };
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
  
    const deleteRow = async(rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...messages3];
      const prevIndex = messages3.findIndex(item => item.key === rowKey);
      
      const machinesCollectionRef = collection(db, "messages");
      await deleteDoc (doc(machinesCollectionRef, rowKey));
      newData.splice(prevIndex, 1);
      messages3=newData;
    };
    const renderItem = (data, rowMap) => {
      const rowHeightAnimatedValue = new Animated.Value(60);
  
      return (
        <VisibleItem
          data={data}
          rowHeightAnimatedValue={rowHeightAnimatedValue}
          removeRow={() => deleteRow(rowMap, data.item.key)}
        />
      );
    };   
    const HiddenItemWithActions = props => {
      const {
        swipeAnimatedValue,
        leftActionActivated,
        rightActionActivated,
        rowActionAnimatedValue,
        rowHeightAnimatedValue,
        onClose,
        onDelete,
        
      } = props;
    
      if (rightActionActivated) {
        Animated.spring(rowActionAnimatedValue, {
          toValue: 500,
          useNativeDriver: false
        }).start();
      } else {
        Animated.spring(rowActionAnimatedValue, {
          toValue: 75,
          useNativeDriver: false
        }).start();
      }
    
      return (
        <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
          <Text>Left</Text>
          {!leftActionActivated && (
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={onClose}
            >
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={25}
                style={styles.trash}
                color="#fff"
              />
            </TouchableOpacity>
          )}
          {!leftActionActivated && (
            <Animated.View
              style={[
                styles.backRightBtn,
                styles.backRightBtnRight,
                {
                  flex: 1,
                  width: rowActionAnimatedValue,
                },
              ]}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={onDelete}
               >
                <Animated.View
                  style={[
                    styles.trash,
                    {
                      transform: [
                        {
                          scale: swipeAnimatedValue.interpolate({
                            inputRange: [-90, -45],
                            outputRange: [1, 0],
                            extrapolate: 'clamp',
                          }),
                        },
                      ],
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={25}
                    color="#fff"
                  />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      );
    };
    const renderHiddenItem = (data, rowMap) => {
      const rowActionAnimatedValue = new Animated.Value(75);
      const rowHeightAnimatedValue = new Animated.Value(60);
    
      return (
        <HiddenItemWithActions
          data={data}
          rowMap={rowMap}
          rowActionAnimatedValue={rowActionAnimatedValue}
          rowHeightAnimatedValue={rowHeightAnimatedValue}
          onClose={() => closeRow(rowMap, data.item.key)}
          onDelete={() => deleteRow(rowMap, data.item.key)}
        
        />
      );
    };
return ( 
<View style={styles.container}>
<SwipeListView
    data={messages3}
    renderItem={renderItem}
    renderHiddenItem={renderHiddenItem}
    leftOpenValue={75}
    rightOpenValue={-150}
    disableRightSwipe
    
    leftActivationValue={100}
    rightActivationValue={-200}
    leftActionValue={0}
    rightActionValue={-500}
    onLeftAction={onLeftAction}
    onRightAction={onRightAction}
    onLeftActionStatusChange={onLeftActionStatusChange}
    onRightActionStatusChange={onRightActionStatusChange}
    />

    </View>
   );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 80,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#FFC300',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#C70039',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },

});
