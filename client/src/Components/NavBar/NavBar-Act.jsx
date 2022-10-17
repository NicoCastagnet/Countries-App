import React from 'react';
import { Link } from 'react-router-dom';
import NavIcon from '../../Assets/app_icon.png';

import './NavBar.scss';

export default function NavBarAct() {
  return (
    <nav className='navbar__nav'>
      <Link to='/home'>
        <div className='navbar__logo'>
          <img
            src={NavIcon}
            alt='navbar__logo'
          />
        </div>
      </Link>
      <div className='navbar__btns'>
        <Link to='/home'>
          <button className='navbar__btn-back'>Go back</button>
        </Link>
        <Link to='/about'>
          <button className='navbar__btn-filters'>About</button>
        </Link>
      </div>
    </nav>
  );
}
