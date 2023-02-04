import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  mode: 'dark' | 'light';
};

const initialState: initialStateType = {
  mode: 'dark',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
