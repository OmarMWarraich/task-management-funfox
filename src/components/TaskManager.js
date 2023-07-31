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

  const data = useSelector((state) => state.data);
  const groupsData = useSelector((state) => state.groups);
  const tasksData = useSelector((state) => state.tasks);
  const usersData = useSelector((state) => state.users);

  useEffect(() => {
    // Fetch data only if it's not available in the store
    if (data.length === 0) {
      dispatch(getData());
    }
    if (groupsData.length === 0) {
      dispatch(getGroups());
    }
    if (tasksData.length === 0) {
      dispatch(getTasks());
    }
    if (usersData.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, data, groupsData, tasksData, usersData]);

  useEffect(() => {
    // Transform the tasksData and set the tasks state
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

    setTasks(transformedTaskArray);
    setGroups(groupsData);
  }, [tasksData, data, groupsData]);

  const addTask = (newTask) => {
    newTask.group = selectedGroup;
    setTasks([newTask, ...tasks]);
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
    // Create a copy of the filteredTasks array to perform the reordering
    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(fromIndex, 1);
    reorderedTasks.splice(toIndex, 0, removed);

    // Update the original tasks array with the reordered tasks only for the selected group
    const updatedTasks = tasks.map((task) => {
      if (task.group === selectedGroup) {
        return reorderedTasks.shift();
      }
      return task;
    });

    // Set the state with the updated tasks
    setTasks(updatedTasks);
  };


  const filteredTasks = tasks.filter(
    (task) => selectedGroup === '' || task.group === selectedGroup,
  );

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
          tasks={filteredTasks}
          deleteTask={deleteTask}
          checkDone={checkDone}
          moveTaskItem={moveTaskItem}
        />
      </Box>
    </AppContainer>
  );
};

export default TaskManager;
