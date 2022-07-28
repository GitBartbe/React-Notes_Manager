import { ReactComponent as LogIn } from '../../images/log-in.svg';
import './log-in-icon.scss';

const LogInIcon = ({ fill, id, handleLogIn = (f) => f }) => {
  return (
    <div className='log-in-icon-container'>
      <LogIn fill={fill} className='log-in' onClick={() => handleLogIn()} />
    </div>
  );
};

export default LogInIcon;
