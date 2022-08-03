import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { bg: '#61dafb', color: '#002984' },
  { bg: '#b39ddb', color: '#23163d' },
  { bg: '#ef9a9a', color: '#521a1f' },
  { bg: '#98ee99', color: '#002c01' },
  { bg: '#ffe082', color: '#514214' },
  { bg: '#bf4080', color: '#ffd3fc' },
  { bg: '#42b883', color: '#ffffff' },
  {bg: '#3178c6',color: '#ffffff' }
];

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
});

export const selectAllColors = (state) => state.colors;
export default colorsSlice.reducer;
