import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import NavigateScreens from './Authcon'
import DawNav from './DrawerNavigate'
import React from 'react'


export default function RootNvigator() {
  return (
    <NavigationContainer>
      <NavigateScreens/>
      
    </NavigationContainer>
  );
}
