import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import NavigateScreens from './Authcon'
import DawNav from './DrawerNavigate'
import React from 'react'
import * as Linking from 'expo-linking';

export default function RootNvigator() {
  const linking = {
    prefixes: ['deeplinking://','myApp://', 'https://myApp.com'],
    config:{
      screens:{
        DawNav:{
          screens:{
            MyCalender:{
              path:'MyCalender/:message'

            },

          },


        },

      }
    }
  };
 
  return (
    <NavigationContainer  >
      <NavigateScreens/>
      
    </NavigationContainer>
  );
}
