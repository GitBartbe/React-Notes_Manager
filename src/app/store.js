import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';
import colorsReducer from '../features/notes/colorsSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    colors: colorsReducer,
    currentUser: userReducer,
  },
});
