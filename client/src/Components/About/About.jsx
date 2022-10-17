import React from 'react';
import Image from '../../Assets/Avatar.png';
import { Link } from 'react-router-dom';

import './About.scss';

export const About = () => {
  return (
    <>
      <div className='about__container'>
        <div className='about__img-container'>
          <img
            src={Image}
            alt={Image}
          />
        </div>
        <div className='about__text-container'>
          <p className='about__text-detail'>About me</p>
          <h1 className='about__text-title'>Nicolás Castagnet</h1>
          <p className='about__text-subtitle'>
            SPA Project created for Henry Bootcamp.
          </p>
          <Link to='/home'>
            <button>Back to homepage</button>
          </Link>
          <a
            href='https://www.linkedin.com/in/nicolas-castagnet/'
            rel='noreferrer'
            target='_blank'>
            <button>LinkedIN</button>
          </a>
          <a
            href='https://github.com/NicoCastagnet'
            rel='noreferrer'
            target='_blank'>
            <button>Github</button>
          </a>
        </div>
      </div>
    </>
  );
};
