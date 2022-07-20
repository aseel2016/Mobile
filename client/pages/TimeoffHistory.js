import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,Alert,Dimensions,TextInput} from 'react-native';

import HomeHeader from '../components/HomeHeader';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements'
import axios from 'axios';
export default function TimeoffHistory({navigation}){

return ( 
<View >
       <HomeHeader navigation={navigation}/>
       <Text>History time off</Text>


    </View>
   );
}


