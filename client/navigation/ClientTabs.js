import 'react-native-gesture-handler';

import React from 'react'
import { StyleSheet, Text, View ,StatusBar} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../pages/home/Home'
import Account from '../pages/MyAccount'
import { colors } from 'react-native-elements';
import Profile from '../pages/Profile';
const Tab = createBottomTabNavigator();

export default function RootClient() {
  return (
    <Tab.Navigator  screenOptions={{headerShown:false}} >
        <Tab.Screen
        name="Home"
        component={Home}
        
        options={{
            tabBarLabel:"Home",
            tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
        }}
        /> 
        <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
            tabBarLabel:"Account",
            tabBarIcon: ({ color, size }) => (
                <Icon2 name="account" color={color} size={size} />
              ),
        }}
        />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
});
