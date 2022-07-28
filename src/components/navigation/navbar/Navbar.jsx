import navLinks from '../navLinks';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/users/userSlice';

import { logOutUser } from '../../../firebase/config';

import LogInIcon from '../../icons/LogInIcon';
import LogOutIcon from '../../icons/LogOutIcon';

import './navbar.scss';

const Navbar = () => {
  const { currentUser } = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <div>
      <nav className='navbar-container'>
        <ul>
          {navLinks.map((navLink, index) => (
            <NavLink
              key={index}
              to={navLink.url}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {navLink.name}
            </NavLink>
          ))}
        </ul>
        <div className='navigation-login'>
          {!currentUser ? (
            <LogInIcon fill='white' handleLogIn={goToLogIn} />
          ) : (
            <LogOutIcon fill='white' handleLogOut={logOutUser} />
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Navbar;
