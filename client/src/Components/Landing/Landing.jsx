import React from 'react';
import video from '../../Assets/video.mp4';
import { Link } from 'react-router-dom';

import './Landing.scss';

export const Landing = () => {
  return (
    <div>
      <div class='landing__video'>
        <video
          autoPlay
          muted
          loop>
          <source
            src={video}
            type='video/mp4'
          />
        </video>
      </div>
      <div className='landing__text-container'>
        <div className='landing__title'>
          <h1>
            Explore <span>The World</span>
          </h1>
        </div>
        <div className='landing__btn blob'>
          <Link to='/home'>
            <button>Get started!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
