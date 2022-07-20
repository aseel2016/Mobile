import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import {colors,parameters} from '../global/styles'

export default function Header({title}){
    return (<View style={styles.header}>
       
        <Text style={styles.Title} >{title}</Text>

    </View>);
}
const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      backgroundColor: colors.buttons,
      height: parameters.headerHeight,
      justifyContent: 'center',
    },
    Title:{
        fontSize:22,
        color:colors.headerText,
        marginTop:13,
        fontWeight:"bold",
        

    },
  });