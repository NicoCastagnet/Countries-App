import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivities,
  getCountries,
  getCountriesByName,
} from '../../Redux/Actions';
import NavIcon from '../../Assets/app_icon.png';

import './NavBar.scss';

export default function NavBar({ openSideBar }) {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('');

  const handleChange = (e) => setName(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Whoops! Please enter a valid name.');
    } else {
      dispatch(getCountriesByName(name.trim()));
      setName('');
      e.target.reset();
    }
  };

  useEffect(() => {
    !countries.length && dispatch(getCountries());
  }, [dispatch, countries]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getCountries());
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
        <button
          className='navbar__btn-refresh'
          onClick={(e) => {
            handleRefresh(e);
          }}>
          Refresh
        </button>
        <Link to='/create'>
          <button className='navbar__btn-create'>Create activity</button>
        </Link>
        <button
          className='navbar__btn-filters'
          onClick={openSideBar}>
          Filters
        </button>
      </div>
      <div className='navbar__search-bar'>
        <form onSubmit={handleSearch}>
          <input
            className='navbar__search-input'
            type='text'
            placeholder='Search country'
            onChange={(e) => handleChange(e)}
          />
          <button
            className='navbar__search-btn'
            type='submit'>
            🔎
          </button>
        </form>
      </div>
    </nav>
  );
}
