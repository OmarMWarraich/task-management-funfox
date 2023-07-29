import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const checkDone = (taskId) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    );
  };

  return (
    <div className="App">
      <div>
        <TaskForm addTask={addTask} />
      </div>
      <div>
        <TaskList tasks={tasks} deleteTask={deleteTask} checkDone={checkDone} />
      </div>
    </div>
  );
}

export default App;
