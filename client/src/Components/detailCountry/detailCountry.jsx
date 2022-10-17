import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBarInfo from '../NavBar/NavBar-Info';
import { getCountriesById } from '../../Redux/Actions';

import './detailCountry.scss';

export const DetailCountry = (props) => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.detail);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getCountriesById(id));
  }, [dispatch, id]);

  return (
    <div className='country__info-page'>
      <NavBarInfo />
      <div className='country__info-title'>
        <h1>
          {country.name} ({country.id})
        </h1>
      </div>
      <div className='country__info'>
        <img
          src={country.flag_img}
          alt={country.name}
        />
        <div className='country__info-data'>
          <hr />
          <p>Continent: {country.continent}</p>
          <p>Capital: {country.capital}</p>
          <p>
            Sub-region:{' '}
            {country.sub_region ? country.sub_region : 'No data found.'}
          </p>
          <p>
            Area: {country.area?.toLocaleString('es-AR') || ''} km<sup>2</sup>
          </p>
          <p>Population: {country.population?.toLocaleString('es-AR') || ''}</p>
        </div>
        <div className='separator'>Activities</div>
        <div className='country__info-activities'>
          {country.activities && country.activities.length ? (
            country.activities.map((e) => {
              return (
                <Link to='/activities'>
                  <div
                    className='country__info-activity'
                    key={e.name}>
                    <p>Name: {e.name}</p>
                    <p>Difficulty: {e.difficulty}</p>
                    <p>Duration: {e.duration}hs.</p>
                    <p>Season: {e.season}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className='country__info-no-activity'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='128'
                height='128'>
                <path d='M114 15.25H14A9.761 9.761 0 0 0 4.25 25v77A10.762 10.762 0 0 0 15 112.75h98A10.762 10.762 0 0 0 123.75 102V25a9.761 9.761 0 0 0-9.75-9.75zm6.25 9.75v11.683H52.888L61.37 18.75H114a6.257 6.257 0 0 1 6.25 6.25zM14 18.75h43.5l-8.484 17.933H7.75V25A6.257 6.257 0 0 1 14 18.75zm99 90.5H15A7.258 7.258 0 0 1 7.75 102V40.183h112.5V102a7.258 7.258 0 0 1-7.25 7.25z' />
                <path d='M21.57 33.466a5.75 5.75 0 1 0-5.75-5.75 5.756 5.756 0 0 0 5.75 5.75zm0-8a2.25 2.25 0 1 1-2.25 2.25 2.253 2.253 0 0 1 2.25-2.25zM37.626 33.466a5.75 5.75 0 1 0-5.75-5.75 5.756 5.756 0 0 0 5.75 5.75zm0-8a2.25 2.25 0 1 1-2.25 2.25 2.253 2.253 0 0 1 2.25-2.25zM67.522 29.466h44.745a1.75 1.75 0 0 0 0-3.5H67.522a1.75 1.75 0 0 0 0 3.5zM48.4 77.485h-2.053V58.44a1.751 1.751 0 0 0-3.147-1.05l-15.6 20.8a1.75 1.75 0 0 0 1.4 2.8h13.847v8.008a1.75 1.75 0 0 0 3.5 0v-8.013H48.4a1.75 1.75 0 1 0 0-3.5zm-5.556 0H32.5l10.347-13.8zM99 77.485h-2.056V58.44a1.75 1.75 0 0 0-3.15-1.05l-15.6 20.8a1.75 1.75 0 0 0 1.4 2.8h13.85v8.008a1.75 1.75 0 0 0 3.5 0v-8.013H99a1.75 1.75 0 0 0 0-3.5zm-5.556 0H83.1l10.347-13.8zM64 56.69c-6.681 0-10.067 5.728-10.067 17.026S57.319 90.743 64 90.743s10.067-5.728 10.067-17.027S70.681 56.69 64 56.69zm0 30.553c-1.624 0-6.567 0-6.567-13.527S62.376 60.19 64 60.19s6.567 0 6.567 13.526S65.624 87.243 64 87.243z' />
              </svg>
              <p>
                <span>Whoops!</span> there is no activity created yet
              </p>
              <Link to='/create'>
                <button>Create one now!</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
