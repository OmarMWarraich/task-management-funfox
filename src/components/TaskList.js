import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import TaskListItem from './TaskListItem';

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
  tasks, deleteTask, checkDone, moveTaskItem,
}) => {
  const moveTask = (fromIndex, toIndex) => {
    moveTaskItem(fromIndex, toIndex);
  };

  return (
    <div>
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
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
              moveTask={moveTask}
              deleteTask={deleteTask}
              checkDone={checkDone}
            />
          </motion.div>
        ))}
      </AnimatePresence>
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
