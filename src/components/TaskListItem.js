import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import ItemTypes from './ItemTypes';

const TaskContainer = styled(Box)({
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
});

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

  return (
    <div ref={(node) => drag(drop(node))}>
      <TaskContainer done={task.done}>
        <TaskTitle variant="h6" done={task.done}>
          {task.title}
        </TaskTitle>
        <div style={{ wordWrap: 'break-word', width: '165px' }}>
          <Typography>{task.description}</Typography>
        </div>
        <Checkbox
          checked={task.done}
          onChange={() => checkDone(task.id)}
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
