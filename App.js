import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { Button, FlatList, StyleSheet, Text, TextInput, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import Sandbox from './components/Sandbox';
import TodoItem from './components/TodoItem';

export default function App() {
  const [todos,setTodos]=useState([
    {text: 'buy coffee', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'write assignments', key:'3'},
  ])

  const pressHandler=(key)=>{
    setTodos((prev)=>{
      return prev.filter(todo=>todo.key!=key)
    })
  }

  const submitHandler=(text)=>{
    if (text.length>3){
      setTodos((prev)=>{
      return [...prev, {text: text, key: Math.random.toString()}]
    })
    }
    else{
      Alert.alert('OOPS!', 'ToDos must be over 3 chars long',[
        {text: 'Understood', onPress: ()=>console.log('alert closed')}
      ])
    }
    
  }

  return (
    //view is like div 
    // <Sandbox/>
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss()
    }}>
    <View style={styles.container}>
      <Header/>
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList 
          data={todos}
          renderItem={({item})=>(
            <TodoItem item={item} pressHandler={pressHandler} />
          )}/>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    padding: 40,
    
    flex:1,
  },
  list:{
    flex: 1,
    marginTop: 20,

  },


  
});
