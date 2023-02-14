import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './navigation/MainTabNavigator';
import TaskList from './components/TaskList';
import AddTask from './screens/AddTask';
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { getCurrentPositionAsync } from 'expo-location';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { getCurrentPositionAsync } from 'expo-location';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [location, setLocation] = useState(null);
  
    const handleAddTask = (name) => {
      const id = Date.now().toString();
      const task = { id, name, completed: false, location: null };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
    };
  
    const handleToggleCompleted = () => {
      setCompleted(!completed);
    };
  
    const setTaskLocation = (task, { latitude, longitude }) => {
      const updatedTask = { ...task, location: `${latitude}, ${longitude}` };
      const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
      setTasks(updatedTasks);
    };
  
    useEffect(() => {
      const getLocation = async () => {
        try {
          const { coords } = await getCurrentPositionAsync({});
          setLocation(coords);
        } catch (error) {
          console.log(error);
        }
      };
      getLocation();
    }, []);
  
    const filteredTasks = tasks.filter((task) => task.completed === completed);
  
    return (
      <View style={styles.container}>
        <TaskForm onAddTask={handleAddTask} />

      <View style={styles.toggleContainer}>
        <Button title={completed ? 'Show Uncompleted Tasks' : 'Show Completed Tasks'} onPress={handleToggleCompleted} />
      </View>

      <TaskList tasks={filteredTasks} setTasks={setTasks} setTaskLocation={setTaskLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    marginVertical: 10,
  },
});