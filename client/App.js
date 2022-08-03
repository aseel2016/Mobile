import 'react-native-gesture-handler';

import { StyleSheet, Text, View ,StatusBar,Linking} from 'react-native';
import {colors,parameters} from './global/styles'
import RootNvigator from './navigation/rootnav'
import React from 'react'

export default function App() {


  return (
    <View style={styles.container}>
        <StatusBar
        barStyle="light-content"
        backgroundColor={colors.statusbar}
        />
        <RootNvigator/>

       

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
});
