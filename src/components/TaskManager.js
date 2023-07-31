import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const TaskManager = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  /* eslint-disable no-unused-vars */
  const [groups, setGroups] = useState([]);
  /* eslint-disable no-unused-vars */
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const usersData = useSelector((state) => state.users);
  const data = useSelector((state) => state.data);
  const groupsData = useSelector((state) => state.groups);
  const tasksData = useSelector((state) => state.tasks);

  useEffect(() => {
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
    const transformedTaskArray = tasksData.map((task) => {
      /* eslint-disable max-len */
      const groupOfTask = data.find((group) => group.users.some((user) => user.tasks.some((userTask) => userTask.id === task.id)));
      const userOfTask = usersData.find((user) => user.tasks.some((userTask) => userTask.id === task.id));

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        done: task.done,
        group: groupOfTask ? groupOfTask.name : 'Unknown Group',
        user: userOfTask ? userOfTask.id : 'Unknown User',
      };
    });

    setTasks(transformedTaskArray);
    setGroups(groupsData);
  }, [tasksData, data, groupsData, usersData]);

  const addTask = (newTask) => {
    /* eslint-disable no-param-reassign */
    const nameOfGroup = data.find((group) => group.users.some((user) => user.id === selectedUserId))?.name;
    // Assign selectedGroup and selectedUser to the new task object
    newTask = {
      ...newTask,
      group: nameOfGroup,
      user: selectedUserId,
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const checkDone = (taskId) => {
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !task.done || false };
      }
      return task;
    }));
  };

  const filteredTasks = tasks.filter(
    (task) => (selectedGroup === '' || task.group === selectedGroup)
    && (selectedUserId === '' || task.user === selectedUserId),
  );

  const moveTaskItem = (fromIndex, toIndex) => {
    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(fromIndex, 1);
    reorderedTasks.splice(toIndex, 0, removed);

    const updatedTasks = tasks.map((task) => {
      if (task.user === selectedUserId) {
        return reorderedTasks.shift();
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleUserChange = (event) => {
    const selectedUserName = event.target.value;
    setSelectedUser(selectedUserName);

    const selectedUserObj = usersData.find((user) => user.Name === selectedUserName);
    if (selectedUserObj) {
      setSelectedUserId(selectedUserObj.id);
    } else {
      setSelectedUserId('');
    }
  };

  return (
    <AppContainer>

      <Box mt={2}>
        <FormControl>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            displayEmpty
            renderValue={(value) => (value ? `Selected User: ${value}` : 'Select User')}
          >
            <MenuItem value="" disabled>
              <em>Select User</em>
            </MenuItem>
            {usersData.map((user) => (
              <MenuItem key={user.id} value={user.Name}>
                {user.Name}
                {' '}
                {
                  data.map((group) => (
                    group.users.some((userGroup) => userGroup.id === user.id) ? `(${group.name})` : ''
                  ))
                }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
