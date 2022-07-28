import { ReactComponent as CircleIcon } from '../../images/circle_arrow.svg';
import './view-note.scss';

const ViewNoteIcon = ({ fill }) => {
  return (
    <div className='view-note-icon-container'>
      <CircleIcon fill={fill} className='view-note-icon' />
    </div>
  );
};

export default ViewNoteIcon;
