import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getCurrentPositionAsync } from 'expo-location';

export default function AddTask({ tasks, setTasks }) {
  const [name, setName] = useState('');
  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      name: name,
      completed: false,
      location: null,
    };
    setTasks([newTask, ...tasks]);
    setName('');
  };
 
  const handleGetLocation = async () => {
    try {
      const { coords } = await getCurrentPositionAsync({});
      console.log(coords);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Add a task"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleAddTask();
          handleGetLocation();
        }}
      >
        <Text style={styles.buttonText}>Add Task and Get Location</Text>
      </TouchableOpacity>
      <Text style={styles.location}>Current Location:</Text>
    </View>
  );
    }
    const styles = StyleSheet.create({
        container: {
        flex: 1,
        padding: 16,
        },
        input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
        },
        button: {
        backgroundColor: '#007aff',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        },
        buttonText: {
        color: '#fff',
        },
        location: {
        color: '#999',
        },
        });