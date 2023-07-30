import axios from 'axios';

const URL = 'http://localhost:3001/getAll';

/* eslint-disable consistent-return */
const fetchUsers = async () => {
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    const users = data.map((group) => group.users).flat(1);
    return users;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUsers;
