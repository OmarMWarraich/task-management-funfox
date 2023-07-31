import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import ItemTypes from './ItemTypes';

const TaskTitle = styled(Typography)(({ done }) => ({
  textDecoration: done ? 'line-through' : 'none',
}));

const TaskListItem = ({
  task, index, moveTask, deleteTask, checkDone,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item) {
      if (item.index === index) {
        return;
      }
      moveTask(item.index, index);
      // eslint-disable-next-line no-param-reassign
      item.index = index;
    },
  });

  const handleDelete = (taskId) => {
    deleteTask(taskId);

    toast.error(`${task.title} has been deleted!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCheck = (taskId) => {
    checkDone(taskId);

    toast.success(`${task.title} has been completed!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div ref={(node) => drag(drop(node))}>
      <Grid
        container
        sx={{
          backgroundColor: '#f0f0f0',
        }}
        alignItems="center"
        marginY={2}
      >
        <Grid item xs={12} sm={3} paddingY={2}>
          <TaskTitle variant="h6" done={task.done}>
            {task.title}
          </TaskTitle>
        </Grid>

        <Grid item xs={12} sm={6} paddingY={2}>
          <Typography>{task.description}</Typography>
        </Grid>

        <Grid item xs={6} sm={1} paddingY={2}>
          <Checkbox
            checked={task.done}
            onChange={() => handleCheck(task.id)}
            inputProps={{ 'aria-label': 'checkbox' }}
          />
        </Grid>

        <Grid item xs={6} sm={2} paddingY={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

TaskListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkDone: PropTypes.func.isRequired,
};

export default TaskListItem;
