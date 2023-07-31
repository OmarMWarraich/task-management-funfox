import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchGroups from '../api/groupsApi';

const initialState = [];

export const getGroups = createAsyncThunk(
  'groups/getGroups',
  async () => {
    const response = await fetchGroups();
    return response;
  },
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.fulfilled, (state, action) => {
        let newState = [...state];
        newState = action.payload;
        return newState;
      });
  },
});

export default groupsSlice.reducer;
