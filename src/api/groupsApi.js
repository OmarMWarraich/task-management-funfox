import axios from 'axios';

const URL = 'http://localhost:3001/getAll';

/* eslint-disable consistent-return */
const fetchGroups = async () => {
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    const groups = data.map((group) => group.name);
    return groups;
  } catch (error) {
    console.log(error);
  }
};

export default fetchGroups;
