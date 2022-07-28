import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getData,
  addNoteToCollection,
  deleteNoteFromCollection,
} from '../../firebase/config';

const NOTES_URL = 'http://localhost:3000/notes';

const initialState = {
  notes: [],
  status: 'idle',
  error: null,
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await getData();
  return response;
});

export const addNewNote = createAsyncThunk(
  'notes/ fetchNotes',
  async (note) => {
    try {
      await addNoteToCollection(note);
      return note;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  try {
    await deleteNoteFromCollection(id);
    return id;
  } catch (err) {
    console.log(err);
  }
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, description) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            description,
          },
        };
      },
    },
    descriptionAdded(state, action) {
      const { noteId, item } = action.payload;
      const existingNote = state.find((note) => note.id === noteId);
      if (existingNote) {
        existingNote.content = [...existingNote.content, item];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.notes.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        console.log(action.payload);
        if (!action.payload) {
          console.log('Update could not complete');

          return;
        }
        const notes = state.notes.filter((note) => note.id !== action.payload);
        state.notes = notes;
      });
  },
});

// export const selectAllNotes = (state) => state;
export const { noteAdded, descriptionAdded } = notesSlice.actions;

export const selectNoteById = (state, noteId) =>
  state.notes.notes.find((note) => note.id === noteId);

export const selectAllNotes = (state) => state.notes.notes;
export const getNotestatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;

export default notesSlice.reducer;
