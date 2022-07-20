import 'react-native-gesture-handler';

import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/login/Login'
import RootClient from './ClientTabs'
import DawNav from './DrawerNavigate'
import Notifications from '../pages/notifications'
import React from 'react';
import { colors } from '../global/styles';
 import EditProfile from '../pages/EditProfile'
const Stack = createNativeStackNavigator();

export default function NavigateScreens() {
  return (
   <Stack.Navigator
   screenOptions={{ headerStyle: { backgroundColor:colors.buttons},headerTintColor:'white'}}>
    <Stack.Screen  name="Signin" component={Login}
     options={{headerShown:false
  
    }} />
    <Stack.Screen  name="DawNav" component={DawNav} 
    options={{headerShown:false}} />

<Stack.Screen  name="Notifications" component={Notifications} 
     />
     
     <Stack.Screen  name="EditProfile" component={EditProfile} 
     options={{title:"Edit My profile"
  
     }}
     />
     





   </Stack.Navigator>
  );
}
