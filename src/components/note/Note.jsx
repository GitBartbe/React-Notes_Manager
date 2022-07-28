import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectNoteById, deleteNote } from '../../features/notes/notesSlice';
import { selectCurrentUser } from '../../features/users/userSlice';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import DeleteIcon from '../icons/DeleteIcon';
import Time from '../time/Time';
import CustomButton from '../button/CustomButton';

import './note.scss';

const Note = () => {
  const [requestStatus, setRequestSatus] = useState('idle');
  const [isEditOn, setIsEditOn] = useState(false);

  const { currentUser } = useSelector(selectCurrentUser);
  console.log(currentUser);

  const { noteId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const note = useSelector((state) => selectNoteById(state, noteId));

  const handleDeleteNote = () => {
    if (note)
      try {
        setRequestSatus('pending');
        dispatch(deleteNote(noteId));
      } catch (err) {
        console.log(err);
      } finally {
        setRequestSatus('idle');
        navigate('/notes');
      }
  };

  const handleEdit = () => {
    if (currentUser) {
      setIsEditOn(!isEditOn);
    } else {
      alert('You dont have permision to run this action');
    }
  };

  return (
    <div className='container note'>
      {note ? (
        <div>
          <div className='edit-note-button'>
            <CustomButton onClick={handleEdit}>Edit Note</CustomButton>
          </div>

          <div
            className='note-container'
            style={{ background: note.bg, color: note.color }}
          >
            <div className='note-title-container' style={{ color: note.color }}>
              <h2>{note.title}</h2>
              <div className='note-data'>
                <Time date={note.date} displayDate={true} />
              </div>
            </div>
            <div>
              <div className='description-container'>
                {note.description.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isEditOn && (
        <div className='icons-container'>
          <DeleteIcon
            fill={'#ffffff'}
            id={note.id}
            handleDelete={handleDeleteNote}
          />
        </div>
      )}
    </div>
  );
};

export default Note;
