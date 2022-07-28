import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import { addNewNote } from '../../features/notes/notesSlice';
import { selectCurrentUser } from '../../features/users/userSlice';

import Input from '../input-component/Input';
import CustomButton from '../button/CustomButton';

import './add-note-form.scss';
import Time from '../time/Time';
import Colors from '../colors/Colors';

const AddNoteForm = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(selectCurrentUser);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [storedDescription, setStoredDescription] = useState([]);
  const [requestStatus, setRequestStatus] = useState();
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState();
  const [color, setColor] = useState({ bg: '#61dafb', color: '#002984' });

  const navigate = useNavigate();

  //set time

  const handleStart = () => {
    if (!startTime) {
      const newStart = new Date().toISOString();
      setStartTime(newStart);
    }
  };

  const handleFinish = () => {
    if (startTime) {
      const finishTime = new Date().toISOString();
      setFinishTime(finishTime);
    }
  };

  //----------------------------Listeners -------------------------------
  const onTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const onDescriptioChange = (event) => {
    setNewDescription(event.target.value);
  };

  //-----------------------------------------------------------------------
  const storeDescription = () => {
    if (newDescription) {
      setStoredDescription((prevDescription) => {
        setNewDescription('');
        return [...prevDescription, newDescription];
      });
    } else alert('Description fild is empty');
  };

  //------------------------ changeColor ------------------------------------
  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  //---------------------------dispatch----------------------------------

  const canSave = [
    newTitle,
    storedDescription.length > 0,
    startTime,
    finishTime,
  ].every(Boolean);

  const addNote = () => {
    if (canSave) {
      if (currentUser) {
        try {
          setRequestStatus('pending');
          dispatch(
            addNewNote({
              title: newTitle,
              description: storedDescription,
              date: startTime,
              finishDate: finishTime,
              bg: `${color.bg}`,
              color: `${color.color}`,
            })
          ).unwrap();

          setNewTitle('');
          setStoredDescription([]);
        } catch (err) {
          console.log(err.message);
        } finally {
          setRequestStatus('idle');
          navigate('/notes');
        }
      } else {
        alert('You dont have permision to run this action');
      }
    }
    return;
  };
  //----------------------------- data to render ---------------------------
  const descriptionToRender = storedDescription.map((item, index) => (
    <p key={index}>{` ${item}`}</p>
  ));

  return (
    <div className='container main'>
      <div className=' add-note-container  '>
        <div className='add-note'>
          <div className='start-button-container'>
            <CustomButton onClick={handleStart}>Start work</CustomButton>
          </div>
          <div className='input-container'>
            <label>Title:</label>
            <Input
              type='text'
              maxlength='20'
              value={newTitle}
              onChange={onTitleChange}
            />
          </div>

          <div className='input-container'>
            <label>Description:</label>
            <Input
              type='text'
              value={newDescription}
              onChange={onDescriptioChange}
            />
            <CustomButton onClick={storeDescription}>
              Add description
            </CustomButton>
          </div>
        </div>
        <div
          className='note-display'
          style={{ background: color.bg, color: color.color }}
        >
          <div className='note-display-header'>
            <h1>{newTitle}</h1>
            <h3>{startTime && <Time date={startTime} displayDate={true} />}</h3>
          </div>
          <div className='decription-container'>{descriptionToRender}</div>

          <div
            className='finish-work-container'
            style={{ borderTop: `1px solid ${color.color}` }}
          >
            <div>
              <CustomButton color={color.color} onClick={handleFinish}>
                Finish work
              </CustomButton>
            </div>
            <h3>
              {finishTime && <Time date={finishTime} displayDate={true} />}
            </h3>
          </div>
        </div>
        <div className='right-side-container'>
          <div className='colors-container'>
            <Colors changeColor={handleColorChange} />
          </div>
          <div className='save-button-container'>
            {canSave ? (
              <CustomButton onClick={addNote}>Save note</CustomButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoteForm;
