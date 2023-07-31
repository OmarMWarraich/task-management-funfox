/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { getData } from '../reducers/dataSlice';
import { getGroups } from '../reducers/groupsSlice';
import { getTasks } from '../reducers/tasksSlice';
import { getUsers } from '../reducers/usersSlice';

import TaskList from './TaskList';
import TaskForm from './TaskForm';

const AppContainer = styled(Box)({
  textAlign: 'center',
  padding: '0 20px',
});

const GroupSelect = styled(FormControl)({
  minWidth: 200,
});

const TaskManager = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      return;
    } else {
      dispatch(getData());
    }
    if (groupsData.length > 0) {
      return;
    } else {
      dispatch(getGroups());
    }
    if (tasksData.length > 0) {
      return;
    } else {
      dispatch(getTasks());
    }
    if (usersData.length > 0) {
      return;
    } else {
      dispatch(getUsers());
    }
  }, [dispatch]);
  
  const data = useSelector((state) => state.data);
  const groupsData = useSelector((state) => state.groups);
  const tasksData = useSelector((state) => state.tasks);
  const usersData = useSelector((state) => state.users);
  const transformedTaskArray = tasksData.map((task) => {
    const groupOfTask = data.find((group) =>
      group.users.some((user) =>
        user.tasks.some((userTask) => userTask.id === task.id)
      )
    );
  
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      done: task.done,
      group: groupOfTask ? groupOfTask.name : 'Unknown Group',
    };
  });

  useEffect(() => {
    setTasks(transformedTaskArray);
    setGroups(groupsData);
  }, [transformedTaskArray]);

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
  );
};

export default TaskManager;
