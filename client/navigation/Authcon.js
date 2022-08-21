import 'react-native-gesture-handler';

import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/login/Login'
import RootClient from './ClientTabs'
import DawNav from './DrawerNavigate'
import Notifications from '../pages/notifications'
import React from 'react';
import { colors } from '../global/styles';
 import EditProfile from '../pages/EditProfile';
import RequestOFF from '../pages/TimeoffRequest';
import Messenger from '../pages/Messenger'
import Messages from '../pages/Messages';
import Applicants from '../pages/Applicants'
import OutTheoffice from '../pages/OutTheoffice'
import RequestHR from '../pages/RequestHr'
import Location from '../pages/Location'
import EmployeeProfile from '../pages/EmployeeProfile';
import EditprofileEmployee from '../pages/EditprofileEmployee'
import AllOutTheoffice from '../pages/AlloutTheoffice'
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
      
     

     <Stack.Screen  name="RequestHR" component={RequestHR} 
     options={{title:"Review time off request "
  
     }}

     
     />
     
       <Stack.Screen  name="Messenger" component={Messenger} 
       
   
  
     

     
     />
     
     
     <Stack.Screen  name="Messages" component={Messages} 
       />
<Stack.Screen  name="Location" component={Location} 

       />


     
<Stack.Screen  name="Applicants" component={Applicants}

       />
<Stack.Screen  name="OutTheoffice" component={OutTheoffice}
 options={{title:"out the office"
  
}}
/>

<Stack.Screen  name="AllOutTheoffice" component={AllOutTheoffice}
 options={{title:"out the office"
  
}}
/>

<Stack.Screen  name="EmployeeProfile" component={EmployeeProfile}
 options={{title:"Profile"
  
}}
/>


<Stack.Screen  name="EditprofileEmployee" component={EditprofileEmployee}
 options={{title:"Edit Profile"
  
}}
/>
   </Stack.Navigator>
  );
}

