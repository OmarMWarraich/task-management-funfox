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
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const usersData = useSelector((state) => state.users);
  const data = useSelector((state) => state.data);
  const groupsData = useSelector((state) => state.groups);
  const tasksData = useSelector((state) => state.tasks);

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

      const userOfTask = usersData.find((user) =>
      user.tasks.some((userTask) => userTask.id === task.id)
    );

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
  }, [tasksData, data, groupsData]);

  const addTask = (newTask) => {
    newTask.group = selectedGroup;
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const checkDone = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          // Toggle the `done` property or set it to false if it's missing
          return { ...task, done: !task.done || false };
        }
        return task;
      })
    );
  };

  const moveTaskItem = (fromIndex, toIndex) => {
    // Create a copy of the filteredTasks array to perform the reordering
    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(fromIndex, 1);
    reorderedTasks.splice(toIndex, 0, removed);

    // Update the original tasks array with the reordered tasks only for the selected group
    const updatedTasks = tasks.map((task) => {
      if (task.group === selectedGroup && task.user === selectedUserId ) {
        return reorderedTasks.shift();
      }
      return task;
    });

    // Set the state with the updated tasks
    setTasks(updatedTasks);
  };

  const handleUserChange = (event) => {
    const selectedUserName = event.target.value;
    setSelectedUser(selectedUserName);

    // Find the selected user id
    const selectedUserObj = usersData.find((user) => user.Name === selectedUserName);
    if (selectedUserObj) {
      setSelectedUserId(selectedUserObj.id);
    } else {
      setSelectedUserId('');
    }
  };

  const getUserTasksCount = (user) => {
    const userTasks = tasks.filter((task) =>
      user.tasks.some((userTask) => userTask.id === task.id)
    );
    return userTasks.length;
  };

  const filteredTasks = tasks.filter(
    (task) => (selectedGroup === '' || task.group === selectedGroup) &&
    (selectedUserId === '' || task.user === selectedUserId)
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
      <Box mt={2}>
        <FormControl>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            displayEmpty
            renderValue={(value) =>
              value ? `Selected User: ${value}` : 'Select User'
            }
          >
            <MenuItem value="" disabled>
              <em>Select User</em>
            </MenuItem>
            {usersData.map((user) => (
              <MenuItem key={user.id} value={user.Name}>
                {user.Name} {
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

export default TaskManager

