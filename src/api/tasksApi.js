import axios from 'axios';

const URL = 'http://localhost:3001/getAll';

/* eslint-disable consistent-return */
const fetchTasks = async () => {
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    const tasks = data.map((group) => group.users.map((user) => user.tasks)).flat(2);
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTasks;
