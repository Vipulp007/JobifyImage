import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import { useState } from 'react';
const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user, userimage } = useAppContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            style={{
              background: 'white',
              color: 'var(--primary-700)',
              boxShadow: 'none',
              fontSize: 'larger',
            }}
            onClick={() => setShowLogout(!showLogout)}
          >
            <img
              src={userimage ? './uploads/' + userimage : './profile.png'}
              alt=''
              style={{
                width: '51px',
                height: '51px',
                borderRadius: '50%',
                border: '2px solid',
              }}
            />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => logoutUser()}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
