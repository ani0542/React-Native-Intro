
import React, { useEffect, useState } from "react";
import { Text,StyleSheet,Image, TouchableOpacity, StatusBar, TextInput,FlatList } from 'react-native';
import { View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleTodo = ({todo,setTodos,todos}) =>{
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    useEffect(() => {
      AsyncStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleEdit=()=>{
        // setEdit(!edit)
        if(!edit){
            setEdit(!edit)
        }
        else{
            setEdit(!edit);
            setTodos(
              todos?.map(contact =>
                contact.id === todo.id ? {
                    id: contact.id,
                    text: editText,
                } : contact
              )
            )
            AsyncStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
      };

    return (
        <>
            <View style={styles.todo}>
                {
                    !edit ?  (
                        <Text style={styles.todotext}>{todo.text}</Text>
                    ) : (
                        <TextInput
                         onChangeText={(text) => setEditText(text)}
                         style={styles.todoinput}
                         value={editText}
                      />
                    )
                }
               
               <TouchableOpacity>
                        <MaterialIcons
                        style={styles.todoaction}
                        name="edit"
                        size={23}
                        color="black"
                        onPress={handleEdit}
                        />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons
                    style={styles.todoaction}
                    name="delete"
                    size={23}
                    onPress={() => handleDelete(todo.id)}
                    color="black"
                    />
                </TouchableOpacity>
             </View>
        </>
    )

}





const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: "black",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 50,
      },
      todotext: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 3,
        paddingHorizontal: 5,
      },
      todoinput: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: "grey",
        borderWidth: 1,
      },
      todoaction: {
        marginLeft: 15,
      },
  });
export default SingleTodo;


