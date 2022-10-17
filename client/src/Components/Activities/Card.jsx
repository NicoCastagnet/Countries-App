import React from 'react';
import { Link } from 'react-router-dom';

import './Activities.scss';

export default function Card({
  name,
  duration,
  difficulty,
  season,
  countries,
  url,
  id,
}) {
  return (
    <>
      <div className='activities__card-container'>
        <img
          className='activities__card-container-img'
          src={url}
          alt='Activity'
        />
        <h3 className='activities__card-container-title'>{name}</h3>
        <p className='activities__card-container-info'>
          Duration: {duration}hs.
        </p>
        <p className='activities__card-container-info'>
          Difficulty: {difficulty}
        </p>
        <p className='activities__card-container-info'>Season: {season}</p>
        <br />
        <p className='activities__card-container-info'>Avaliable at &#x25BC;</p>
        <Link to={`/countries/${countries.map((e) => e.id)}`}>
          <p
            className='activities__card-container-info'
            style={{ paddingTop: '5px' }}>
            {countries.map((e) => e.name).join(', ')}
          </p>
        </Link>
      </div>
    </>
  );
}
