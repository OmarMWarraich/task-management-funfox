import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const AppContainer = styled(Box)({
  textAlign: 'center',
  padding: '0 20px',
});

const GroupSelect = styled(FormControl)({
  minWidth: 200,
});

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
        done: false,
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
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === taskId) {
        // Toggle the `done` property or set it to false if it's missing
        return { ...task, done: !task.done || false };
      }
      return task;
    }));
  };

  const moveTaskItem = (fromIndex, toIndex) => {
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(fromIndex, 1);
    reorderedTasks.splice(toIndex, 0, removed);
    setTasks(reorderedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Typography variant="h3" gutterBottom>
          FunFox Task Manager
        </Typography>
        <Box>
          <GroupSelect>
            <Select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              displayEmpty
              renderValue={(value) => (value || 'Groups')}
            >
              <MenuItem value="">
                <em>Groups</em>
              </MenuItem>
              {groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </GroupSelect>
        </Box>
        <Box mt={4}>
          <TaskForm addTask={addTask} />
        </Box>
        <Box mt={4}>
          <TaskList
            tasks={tasks.filter(
              (task) => selectedGroup === '' || task.group === selectedGroup,
            )}
            deleteTask={deleteTask}
            checkDone={checkDone}
            moveTaskItem={moveTaskItem}
          />
        </Box>
      </AppContainer>
      <ToastContainer />
    </DndProvider>
  );
}

export default App;
