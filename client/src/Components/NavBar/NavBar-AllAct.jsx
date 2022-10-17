import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getActivities } from '../../Redux/Actions';
import NavIcon from '../../Assets/app_icon.png';

import './NavBar.scss';

export default function NavBarAll() {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(getActivities());
  };

  return (
    <nav className='navbar__nav'>
      <Link to='/'>
        <div className='navbar__logo'>
          <img
            src={NavIcon}
            alt='navbar__logo'
          />
        </div>
      </Link>
      <div className='navbar__btns'>
        <Link to='/create'>
          <button className='navbar__btn-create'>Create activity</button>
        </Link>
        <button
          className='navbar__btn-refresh'
          onClick={(e) => {
            handleRefresh(e);
          }}>
          Refresh
        </button>
        <Link to='/home'>
          <button>Return home</button>
        </Link>
      </div>
    </nav>
  );
}
