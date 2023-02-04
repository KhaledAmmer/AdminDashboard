import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  mode: 'dark' | 'light';
  userId: string;
};

const initialState: initialStateType = {
  mode: 'dark',
  userId: '63701cc1f03239b7f700000e',
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
