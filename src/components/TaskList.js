import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, Reorder } from 'framer-motion';

import TaskListItem from './TaskListItem';
import './TaskList.css';

const divVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.3 },
  }),
};

const TaskList = ({
  tasks, deleteTask, checkDone, reOrderTasks,
}) => (
  <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
    <Reorder.Group
      axis="y"
      values={tasks}
      onReorder={reOrderTasks}
    >
      <AnimatePresence>
        {tasks.map((task, index) => (
          <Reorder.Item
            value={task}
            variants={divVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layoutId={task.id}
            custom={index + 1}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1.12 }}
            icons
            key={task.id}
          >
            <TaskListItem
              task={task}
              index={index}
              deleteTask={deleteTask}
              checkDone={checkDone}
            />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  </ul>
);

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
  reOrderTasks: PropTypes.func.isRequired,
};

export default TaskList;
