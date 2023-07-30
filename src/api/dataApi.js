import axios from 'axios';

const URL = 'http://localhost:3001/getAll';

/* eslint-disable consistent-return */
const fetchData = async () => {
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchData;
