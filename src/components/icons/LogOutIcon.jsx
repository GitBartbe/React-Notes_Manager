import { ReactComponent as LogOut } from '../../images/log-out.svg';
import './log-out-icon.scss';

const LogInIcon = ({ fill, handleLogOut = (f) => f }) => {
  return (
    <div className='log-out-icon-container'>
      <LogOut fill={fill} className='log-out' onClick={() => handleLogOut()} />
    </div>
  );
};

export default LogInIcon;
