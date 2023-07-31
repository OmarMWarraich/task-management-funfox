import React from 'react';
import PropTypes from 'prop-types';

import TaskListItem from './TaskListItem';

const TaskList = ({
  tasks, deleteTask, checkDone, moveTaskItem,
}) => {
  const moveTask = (fromIndex, toIndex) => {
    moveTaskItem(fromIndex, toIndex);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <TaskListItem
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          deleteTask={deleteTask}
          checkDone={checkDone}
        />
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
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkDone: PropTypes.func.isRequired,
  moveTaskItem: PropTypes.func.isRequired,
};

export default TaskList;
