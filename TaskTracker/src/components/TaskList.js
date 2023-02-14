import React from 'react';
import { ScrollView } from 'react-native';
import Task from './Task';

export default function TaskList({ tasks, setTasks, setTaskLocation }) {
  return (
    <ScrollView>
      {tasks.map((task) => (
        <Task key={task.id} task={task} setTasks={setTasks} setTaskLocation={setTaskLocation} />
      ))}
    </ScrollView>
  );
}
