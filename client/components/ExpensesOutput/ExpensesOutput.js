import { StyleSheet, Text, View } from 'react-native';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import  Axios  from 'axios';
import moment from 'moment';
import React,{useState,useEffect} from 'react';
let bills=[];
let billsincome=[];
const GlobalStyles = {
  colors: {
    primary50: '#e4d9fd',
    primary100: '#c6affc',
    primary200: '#a281f0',
    primary400: '#5721d4',
    primary500: '#3e04c3',
    primary700: '#2d0689',
    primary800: '#200364',
    accent500: '#f7bc0c',
    error50: '#fcc4e4',
    error500: '#9b095c',
    gray500: '#39324a',
    gray700: '#221c30',
  },
};



function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  const [transactiona,setTrans]=useState([]);
  const [offices,setOffices]=useState([]);

  useEffect(()=>{
    Axios.get('http://10.0.2.2:3001/getBill').then((response)=>{
      setTrans(response.data);
    })
    Axios.get('http://10.0.2.2:3001/getOffice').then((response)=>{
      setOffices(response.data);})
  
  },[])
  
  transactiona.map((val,key)=>{
    const y=moment(val.date).utc().format("YYYY-MM-DD");
    let office="";
    if(val.inOut==='Expense'){
       offices.map((val2,key2)=>{
        if(val2._id===val.officeId){
          office=val2.branch+"/"+val2.location; 
        }
       })
      let data={
        'type':val.Type,
        'amount':val.amount+"$",
        'date':y,
        'office':office,
      }
      bills.push(data)
    }
  })
  transactiona.map((val,key)=>{
    const y=moment(val.date).utc().format("YYYY-MM-DD");
    let office="";
    if(val.inOut==='Income'){
       offices.map((val2,key2)=>{
        if(val2._id===val.officeId){
          office=val2.branch+"/"+val2.location; 
        }
       })
      let data={
        'type':val.Type,
        'amount':val.amount+"$",
        'date':y,
        'office':office,
      }
      billsincome.push(data)
    }
  })

  
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
console.log(bills)
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});