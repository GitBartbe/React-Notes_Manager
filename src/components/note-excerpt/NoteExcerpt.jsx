import { Link } from 'react-router-dom';

import Time from '../time/Time';
import DurationTime from '../time/DurationTime';
import ViewNoteIcon from '../icons/ViewNoteIcon';

import './note-excerpt.scss';

const NoteExcerpt = ({ note }) => {
  const { description } = note;

  const title = note.title[0].toUpperCase() + note.title.slice(1);

  return (
    <div
      className='note-container'
      style={{ background: note.bg, color: note.color }}
    >
      <div className='note-title-container' style={{ color: note.color }}>
        <h2>{title}</h2>
        <div className='note-data'>
          <Time date={note.date} displayDate={true} />
        </div>
      </div>
      <div className='finish-time'>
        <p>Finish time</p>
        <Time date={note.finishDate} displayDate={false} />
      </div>
      <div>
        <div className='description-container'>
          <p>{note.description[0]} &nbsp;...</p>
        </div>
      </div>
      <div className='footer-note-container'>
        <div className='total'>
          <p>Total work time:&nbsp;</p>
          <DurationTime date={note.date} finishDate={note.finishDate} />
        </div>
        <div className='footer-note-link'>
          <Link to={`${note.id}`} style={{ color: note.color }}>
            View note
          </Link>
          <div className='footer-note-link-icon'>
            <ViewNoteIcon fill={note.color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteExcerpt;
