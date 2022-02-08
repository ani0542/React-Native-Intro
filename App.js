// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app</Text>
//       <StatusBar style="auto" />
 {/* <Text style={styles.textStyles}>Hello World!</Text>  
                       
                         <Image source={require('./assets/pex.jpg')} style={{width:305,height:159, marginTop:50}} /> */}
                         {/* //button */}
                         {/* <TouchableOpacity activeOpacity={0.5}>
                                    <Text style={{color:"red",backgroundColor:"green"}}>Press Me</Text>
                         </TouchableOpacity> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useEffect, useState } from "react";
import { Text, View,StyleSheet,Image, TouchableOpacity, StatusBar, TextInput,FlatList } from 'react-native';
import SingleTodo from "./components/SingleTodo";
import AsyncStorage from "@react-native-async-storage/async-storage";



const App = ()=>{

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    if (!todo) return;
    setTodos([...todos, { id: Date.now(), text: todo }]);
    setTodo("");
  };

  console.log(todos,'todos')

    return (
      <>
            <View style={styles.container}>
                       

                        <Text style={styles.heading}>TODO LIST!</Text>
                        <View style={styles.inputContainer}>
                        <TextInput
                                value={todo}
                                onChangeText={(text) => setTodo(text)}
                                placeholder="Enter a todo"
                                style={styles.input}
                         />
                          <TouchableOpacity onPress={handleAddTodo}>
                            <Text style={styles.button}>Go</Text>
                          </TouchableOpacity>
                        </View>
                         {/* By FlatList */}
                            <View style={{ width: "100%", marginTop: 10 }}>
                              <FlatList
                                data={todos}
                                renderItem={({ item }) => (
                                  <SingleTodo todos={todos} setTodos={setTodos} todo={item} />
                                  // <Text>{item.text}</Text>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                              />
                            </View>
                       
                        <StatusBar style="auto" />
            </View> 
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor:"#F7DAD9"
  },
  textStyles:{
    marginTop:50,
    marginLeft:50
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10,
  },
  input: {
    elevation: 10,
    shadowColor: "black",
    backgroundColor: "white",
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
});

export default App;