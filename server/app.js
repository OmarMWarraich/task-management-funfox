const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = './data/db.json';

app.use(cors())
app.use(express.json());

app.get('/getAll', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const groups = JSON.parse(data).groups;
      res.json(groups);
    }
  });
});

app.get('/getGroupName/:groupName', (req, res) => {
    const groupName = req.params.groupName;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const groups = JSON.parse(data).groups;
        const matchingGroups = groups.filter((group) => group.name === groupName);
        if (matchingGroups.length > 0) {
          const allTasks = matchingGroups.flatMap((group) =>
            group.users.reduce((acc, user) => acc.concat(user.tasks), [])
          );
          res.setHeader('Content-Type', 'application/json');
          res.json(allTasks);
        } else {
          res.status(404).json({ error: 'Group not found' });
        }
      }
    });
  });
  
  app.post('/postGroupName/:groupName', (req, res) => {
    console.log('POST /postGroupName - Request received');
    const groupName = req.params.groupName;
    const newTask = req.body;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading data from the file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('POST /postGroupName - Data read from the file');
        const groups = JSON.parse(data).groups;
        console.log('POST /postGroupName - Groups in the data:', groups);
        const group = groups.find((group) => group.name === groupName);
        if (group) {
          group.users[0].tasks.push(newTask); // Assuming the first user in the group will get the new task
          fs.writeFile(dbFilePath, JSON.stringify({ groups }), (err) => {
            if (err) {
              console.error('Error writing data to the file:', err);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              console.log('POST /postGroupName - Task added to the group');
              res.status(201).json(newTask); // Return the newly created task in the response
            }
          });
        } else {
          res.status(404).json({ error: 'Group not found' });
        }
      }
    });
  });
  

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
