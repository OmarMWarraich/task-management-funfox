import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchData from '../api/dataApi';

const initialState = [];

export const getData = createAsyncThunk(
  'data/getData',
  async () => {
    const response = await fetchData();
    return response;
  },
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        let newState = [...state];
        newState = action.payload;
        return newState;
      });
  },
});

export default dataSlice.reducer;
