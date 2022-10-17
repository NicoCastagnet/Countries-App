import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByActivity,
  filterByContinent,
  orderByName,
  orderByPopulation,
} from '../../Redux/Actions';

import './SideBar.scss';

export default function SideBar({
  openSideBar,
  sideBar,
  setMinPageNumber,
  setMaxPageNumber,
  setCurrentPage,
}) {
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);

  function handleFilterContinent(e) {
    // Se toma como payload el value de la option que elija el usuario
    e.preventDefault();
    setCurrentPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(5);
    dispatch(filterByContinent(e.target.value));
  }

  function handleSort(e) {
    if (e.target.value === 'asc' || e.target.value === 'desc') {
      dispatch(orderByName(e.target.value));
      setCurrentPage(1);
      setMinPageNumber(0);
      setMaxPageNumber(5);
    }
  }

  function handlePop(e) {
    if (e.target.value === 'me-ma' || e.target.value === 'ma-me') {
      dispatch(orderByPopulation(e.target.value));
      setCurrentPage(1);
      setMinPageNumber(0);
      setMaxPageNumber(5);
    }
  }

  function handleFilterActivity(e) {
    e.preventDefault();
    setCurrentPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(5);
    dispatch(filterByActivity(e.target.value));
  }

  return (
    <div className={sideBar ? 'sidebar sidebar__open' : 'sidebar'}>
      <svg
        onClick={openSideBar}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
      <div className='home__filters-container'>
        Order alphabetically
        <div className='home__filters'>
          <select
            defaultValue='dis'
            onChange={handleSort}>
            <option
              label='Select an option below'
              value='dis'
              disabled
            />
            <option
              value='asc'
              label='A-Z'
            />
            <option
              value='desc'
              label='Z-A'
            />
          </select>
        </div>
        Order by population
        <div className='home__filters'>
          <select
            defaultValue='dis'
            onChange={(e) => handlePop(e)}>
            <option
              label='Select an option below'
              value='dis'
              disabled
            />
            <option
              value='me-ma'
              label='Smallest to largest'
            />
            <option
              value='ma-me'
              label='Largest to smallest'
            />
          </select>
        </div>
        Filter by continent
        <div className='home__filters'>
          <select
            defaultValue='dis'
            onChange={(e) => handleFilterContinent(e)}>
            <option
              label='Select an option below'
              value='dis'
              disabled
            />
            <option
              value={'All'}
              label='All'
            />
            <option
              value={'South America'}
              label='South America'
            />
            <option
              value={'North America'}
              label='North America'
            />
            <option
              value={'Africa'}
              label='Africa'
            />
            <option
              value={'Asia'}
              label='Asia'
            />
            <option
              value={'Europe'}
              label='Europe'
            />
            <option
              value={'Oceania'}
              label='Oceania'
            />
            <option
              value={'Antarctica'}
              label='Antarctica'
            />
          </select>
        </div>
        Filter by activity
        <div className='home__filters'>
          {allActivities && allActivities.length ? (
            <select
              defaultValue='dis'
              onChange={(e) => handleFilterActivity(e)}>
              <option
                label='Select an option below'
                value='dis'
                disabled
              />
              <option
                value='All'
                label='All'
              />
              {allActivities &&
                allActivities.map((activity) => (
                  <option
                    key={activity.name}
                    value={activity.name}
                    label={activity.name}
                  />
                ))}
            </select>
          ) : (
            <select
              defaultValue='dis'
              onChange={(e) => handleFilterActivity(e)}>
              <option
                label='Nothing to see here'
                value='dis'
                disabled
              />
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
