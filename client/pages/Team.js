import React,{useState,useEffect,useRef} from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';


import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
export default function Team({navigation}){

return ( 
<View >
    <HomeHeader navigation={navigation}/>
    <Text>Team</Text>
      
       


    </View>
   );
}


