import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchUsers from '../api/usersApi';

const initialState = [];

export const getUsers = createAsyncThunk(
  'data/getUsers',
  async () => {
    const response = await fetchUsers();
    return response;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        let newState = [...state];
        newState = action.payload;
        return newState;
      });
  },
});

export default usersSlice.reducer;
