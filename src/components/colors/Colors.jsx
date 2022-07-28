import { useSelector } from 'react-redux';
import { selectAllColors } from '../../features/notes/colorsSlice';

import './colors.scss';

const Colors = ({ changeColor }) => {
  const colors = useSelector(selectAllColors);

  return (
    <div className='colors'>
      {colors &&
        colors.map((color, index) => (
          <div
            key={index}
            className='color'
            style={{ background: color.bg }}
            onClick={() => changeColor(color)}
          ></div>
        ))}
    </div>
  );
};

export default Colors;
