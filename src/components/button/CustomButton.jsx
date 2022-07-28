import { Children } from 'react';
import './custom-button.scss';

const CustomButton = ({ onClick, children, color }) => {
  return (
    <button
      className='custom-button'
      onClick={onClick}
      style={color ? { color: `${color}` } : {}}
    >
      {children}
    </button>
  );
};

export default CustomButton;
