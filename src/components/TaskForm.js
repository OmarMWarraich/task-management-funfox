import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  /* Add your styles here */
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') return;
    const newTask = {
      id: uuid(),
      title,
      description,
      done: false,
    };
    addTask(newTask);

    toast(`Task "${title}" has been added.`, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="filled"
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="filled"
          margin="normal"
        />
        <ButtonWrapper>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<AddIcon />}
          >
            Add Task
          </Button>
        </ButtonWrapper>
      </form>
    </FormContainer>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
