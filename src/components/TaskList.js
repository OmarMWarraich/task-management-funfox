import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, deleteTask, checkDone }) => (
  <div>
    {tasks.map((task) => (
      <div key={task.id}>
        <h3 style={{ textDecoration: task.done ? 'line-through' : '' }}>
          {task.title}
        </h3>
        <p>{task.description}</p>
        <input
          type="checkbox"
          onChange={() => checkDone(task.id)}
          checked={task.done}
        />
        <button type="button" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    ))}
  </div>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  })).isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkDone: PropTypes.func.isRequired,
};

export default TaskList;
