import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectAllNotes,
  getNotestatus,
  getNotesError,
} from '../../features/notes/notesSlice';

import NoteExcerpt from '../note-excerpt/NoteExcerpt';

import './notes-list.scss';

const NotesList = () => {
  const notes = useSelector(selectAllNotes);
  const notesStatus = useSelector(getNotestatus);
  const notesError = useSelector(getNotesError);

  let content;

  if (notesStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (notesStatus === 'succeeded') {
    const orderedNotes = notes
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedNotes.map((note) => (
      <NoteExcerpt key={note.id} note={note} />
    ));
  }

  return <div className='notes-list-container container'>{content}</div>;
};

export default NotesList;
