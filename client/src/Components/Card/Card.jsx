import React from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';

export default function Card({ name, flag_img, continent, id }) {
  return (
    <>
      <Link to={`/countries/${id}`}>
        <div className='card__container'>
          <img
            className='card__container-img'
            src={flag_img}
            alt='img'
          />
          <hr />
          <h3 className='card__container-title'>{name}</h3>
          <h5 className='card__container-subtitle'>{continent}</h5>
          <button className='card__container-btn'>Read more</button>
        </div>
      </Link>
    </>
  );
}
