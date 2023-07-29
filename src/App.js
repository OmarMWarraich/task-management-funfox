import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    // Mock API response for tasks
    const mockTasksResponse = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description for Task 1',
        completed: false,
        group: 'group1',
      },
      // Add more tasks here
    ];

    // Mock API response for groups
    const mockGroupsResponse = ['group1', 'group2'];

    setTasks(mockTasksResponse);
    setGroups(mockGroupsResponse);
  }, []);

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
      <h1>
        FunFox Task Manager
      </h1>
      <div>
        <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value="">Groups</option>
          {groups.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <TaskForm addTask={addTask} />
      </div>
      <div>
        <TaskList
          tasks={tasks.filter(
            (task) => selectedGroup === '' || task.group === selectedGroup,
          )}
          deleteTask={deleteTask}
          checkDone={checkDone}
        />
      </div>
    </div>
  );
}

export default App;
