import React,{useState,useEffect} from "react";
import { Text,TextInput,View, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, Alert } from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import HomeHeader from '../components/HomeHeader'
import {Picker} from '@react-native-picker/picker';
import Axios from 'axios'
import { Chip } from 'react-native-paper';
import { colors } from "../global/styles";
import { Button } from "react-native-paper";
import Firebase from '../Firebase';
import { onSnapshot, collection, doc, updateDoc,setDoc,getFirestore,deleteDoc} from "firebase/firestore";
import db from "../Firebase";
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
const PostJob = ({navigation}) => {
   const [title, setTitle] = React.useState("");
   const [manager,setManager]=useState("")
   const [teams,setTeams]=useState([]);
   const [employees,setEmployess]=useState([]);
   const [description,setDescription]=useState("");
   const [keywords,setKeywords]=useState([]);
   const [currentkey,setCurrentKey]=useState();
	const richText = React.useRef();
function editorInitializedCallback(){
}
useEffect(()=>{
   let isMounted=true
if(isMounted)
 { Axios.get('http://10.0.2.2:3001/getAll').then((response)=>{
   setEmployess(response.data);
   
       })
       Axios.get('http://10.0.2.2:3001/getAllteams').then((response)=>{
      setTeams(response.data);
    })
      
      }

       return () => { isMounted = false }

    
    },[])

    let managers=[];
    {
      teams.map((val,key)=>{
        let manager;
        employees.map((val2,key2)=>{
          if(val.Manager===val2._id){  
              manager=val2.firstName+" "+val2.lastName;
              if(managers.includes(manager)){}
              else{managers.push(manager)}
          }
         

          })

          
        }
        )
        
     
        
      }

      const updateCurrentKey=(e)=>{
       
        setCurrentKey(e);
       }

     
       const  handleKeyPress = () => {
         setKeywords([...keywords,currentkey])
           setCurrentKey('')
           console.log(keywords)
        
     }
     function handlepress(key){

 
        let  array = [...keywords]; // make a separate copy of the array
  let  index = array.indexOf(key)
  if (index !== -1) {
    array.splice(index, 1);
    setKeywords(array)
   }
  

     }

     async function handlepost(){
     let y;
     employees.map((val)=>{
       if (val.firstName+" "+val.lastName===manager){
         y=val.email;
       }
     })
     const  job={
       title:title,
       manager:manager,
       Description:description,
       Keywords:keywords,
       openDate:new Date(),
     }
     try {
       const res = await Axios.post("http://10.0.2.2:3001/addJob", job);
     } catch (err) {
       console.log(err);
     }
     
     const data = {
       Rec_email:y,
       message:"you are responsible of a posted new job ",
       
       
     };
    
  
    await setDoc(doc(db,"notifications",uuidv4()),data);
     Alert.alert("💫Success","📢 Posted new Job and "+" "+manager+" has been notified")
     }
	return (
        <SafeAreaView> 
         <HomeHeader navigation={navigation}/>
         <ScrollView style={{width:'100%'}}>
   <View>
      <Text style={{padding:20,borderColor:'grey',backgroundColor:'#E2E0E0',fontSize:20,fontWeight:'bold'}} >➕ Post new Job</Text>
      </View>      
<View style={{margin:10}}>
<TextInput 
style={{borderWidth:0.5,padding:10,borderColor:'grey'}}
      placeholder="Title"
      value={title}
      onChangeText={text => setTitle(text)}
    />
    <Text
 style={{fontSize:19,fontWeight:'800',
 margin:10}}>Responsible Manager</Text>
 <Picker style={{width:'100%'}}
 selectedValue={manager}
 onValueChange={(itemValue,itemIndex)=>setManager(itemValue)}>
   {
     managers.map((val)=>{
       return <Picker.Item label={val} key={val}  value={val}/>
     })
   }
 </Picker>
    </View>
         
            <ScrollView>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                    <RichToolbar
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1 ]}
                
            
            />
                    <RichEditor
                        ref={richText}
                        onChange={ descriptionText => {
                           setDescription(descriptionText)
                            console.log("descriptionText:", descriptionText);
                        }}
                        useContainer={true}
                        editorInitializedCallback={editorInitializedCallback}

                        initialHeight={200}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <View style={{marginTop:20,margin:10}}>
           
               <TextInput
      placeholder="Keywords"
      value={currentkey}
      style={{borderWidth:0.5,padding:10,borderColor:'grey'}}
      
      onChangeText={updateCurrentKey}
      onSubmitEditing={handleKeyPress}

    

    />
<View style={{flexDirection:'row', flexWrap: 'wrap',margin:5}}>
    {keywords.map((val)=>{
      return (
         
         
         <Chip key={uuidv4()}
         style={{margin:10,backgroundColor:"green"}} textStyle={{fontSize:18,fontWeight:'bold',color:'white'}} icon="close"
          onPress={()=>handlepress(val)}>{val}</Chip>

         );
    })}
    </View>
            </View>
            <Button mode="contained" 
            onPress={handlepost}
            style={{margin:50,borderRadius:100
            
            
            }}>
                  Post new Job
               </Button>

            </ScrollView>
        </SafeAreaView>
    );
};

export default PostJob;