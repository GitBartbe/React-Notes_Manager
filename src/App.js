import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNotestatus, fetchNotes } from './features/notes/notesSlice';
import { selectCurrentUser, setCurrentUser } from './features/users/userSlice';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './firebase/config';
import NotesList from './components/notes-list/NotesList';
import Navbar from './components/navigation/navbar/Navbar';
import AddNoteForm from './components/add-note-form/AddNoteForm';
import Note from './components/note/Note';
import Login from './pages/login/Login';

function App() {
  const dispatch = useDispatch();
  const notesStatus = useSelector(getNotestatus);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user.email));
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (notesStatus === 'idle') {
      dispatch(fetchNotes());
    }
  }, [notesStatus, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='notes' element={<NotesList />} />
          <Route path='notes/:noteId' element={<Note />} />
          <Route path='add-note' element={<AddNoteForm />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
