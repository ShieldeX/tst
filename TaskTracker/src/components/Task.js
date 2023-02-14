import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentPositionAsync } from 'expo-location';

export default function Task({ task, setTasks, setTaskLocation }) {
  const handleToggleComplete = () => {
    const updatedTask = { ...task, completed: !task.completed };
    const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  const handleGetLocation = async () => {
    try {
      const { coords } = await getCurrentPositionAsync({});
      setTaskLocation(task, coords);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <Text style={[styles.text, task.completed && styles.completed]}>{task.name}</Text>
        <TouchableOpacity style={styles.button} onPress={handleToggleComplete}>
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={24}
            color={task.completed ? '#4CAF50' : '#999'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.location}>
        {task.location && <Text style={styles.text}>Location: {task.location}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
          <Ionicons name="location-sharp" size={24} color="#007aff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginVertical: 8,
    padding: 16,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  button: {
    padding: 8,
  },
});