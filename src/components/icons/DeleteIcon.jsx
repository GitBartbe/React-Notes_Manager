import { ReactComponent as TrashIcon } from '../../images/trash.svg';
import './delete-icon.scss';

const DeleteIcon = ({ fill, id, handleDelete = (f) => f }) => {
  return (
    <div className='delete-icon-container'>
      <TrashIcon
        fill={fill}
        className='trash-bin'
        onClick={() => handleDelete()}
      />
    </div>
  );
};

export default DeleteIcon;
