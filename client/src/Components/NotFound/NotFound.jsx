import React from 'react';
import NavBarAct from '../NavBar/NavBar-Act';
import Image from '../../Assets/24 (1).png';
import { Link } from 'react-router-dom';

import './NotFound.scss';

export const NotFound = () => {
  return (
    <>
      <NavBarAct />
      <div className='error__container'>
        <div className='error__img-container'>
          <img
            src={Image}
            alt={Image}
          />
        </div>
        <div className='error__text-container'>
          <p className='error__text-detail'>Page not found</p>
          <h1 className='error__text-title'>Oh No! Error 404</h1>
          <p className='error__text-subtitle'>
            Whoops! Something went wrong while trying to load this page.
          </p>
          <Link to='/home'>
            <button>Back to homepage</button>
          </Link>
        </div>
      </div>
    </>
  );
};
