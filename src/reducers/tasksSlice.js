import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchTasks from '../api/tasksApi';

const initialState = [];

export const getTasks = createAsyncThunk(
  'data/getTasks',
  async () => {
    const response = await fetchTasks();
    return response;
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        let newState = [...state];
        newState = action.payload;
        return newState;
      });
  },
});

export default tasksSlice.reducer;
