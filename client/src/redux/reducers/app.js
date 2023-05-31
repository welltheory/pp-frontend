import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locale: 'en',
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default slice.reducer;
