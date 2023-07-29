import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const TaskContainer = styled(Box)({
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
});

const TaskTitle = styled(Typography)(({ done }) => ({
  textDecoration: done ? 'line-through' : 'none',
}));

const TaskList = ({ tasks, deleteTask, checkDone }) => {
  const handleCheckboxChange = (taskId) => {
    checkDone(taskId);
  };

  return (
    <div>
      {tasks.map((task) => (
        <TaskContainer key={task.id}>

          <TaskTitle variant="h6" done={task.done}>
            {task.title}
          </TaskTitle>

          <Typography>{task.description}</Typography>

          <Checkbox
            checked={task.done}
            onChange={() => handleCheckboxChange(task.id)}
            inputProps={{ 'aria-label': 'checkbox' }}
          />

          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </Button>
        </TaskContainer>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkDone: PropTypes.func.isRequired,
};

export default TaskList;
