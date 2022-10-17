import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Activities/Card';
import NavBarAll from '../NavBar/NavBar-AllAct';
import Pagination from '../Pagination/Pagination';
import Loading from '../../Assets/loading.gif';
import Image from '../../Assets/not-found.gif';

import './Activities.scss';
import { getActivities } from '../../Redux/Actions';

export const Activities = () => {
  const allActivities = useSelector((state) => state.activities); //trae del reducer el estado countries
  const dispatch = useDispatch();

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1); //Starting from page 1.
  let [aPerPage] = useState(10); //Setting how many countries per page.
  const indexOfLastActivity = currentPage * aPerPage; // 2 * 10 = 20
  const indexOfFirstActivity = indexOfLastActivity - aPerPage; // 20 - 10 = 10
  const currentActivities = allActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  ); //Cutting the array of countries
  const [minPageNumber, setMinPageNumber] = useState(0); //Max & min pages per page.
  const [maxPageNumber, setMaxPageNumber] = useState(5);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber >= maxPageNumber) {
      setMinPageNumber(minPageNumber + 4);
      setMaxPageNumber(maxPageNumber + 4);
    } else if (pageNumber <= minPageNumber + 1 && pageNumber !== 1) {
      setMinPageNumber(minPageNumber - 4);
      setMaxPageNumber(maxPageNumber - 4);
    }
  };

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className='activities__home'>
      <NavBarAll setCurrentPage={setCurrentPage} />
      {allActivities.length ? (
        <Pagination
          currentPage={currentPage}
          minPageNumber={minPageNumber}
          maxPageNumber={maxPageNumber}
          cPerPage={aPerPage}
          allCountries={Array.isArray(allActivities) ? allActivities.length : 1}
          pages={pages}
        />
      ) : (
        ''
      )}
      <div className='activities__home-cards'>
        {currentActivities.length ? (
          currentActivities.map((e) => {
            return (
              <div
                key={e.id}
                className='activities__home-card'>
                <Card
                  url={e.url ? e.url : Image}
                  name={e.name}
                  duration={e.duration}
                  difficulty={e.difficulty}
                  season={e.season}
                  countries={e.countries}
                  key={e.id}
                  id={e.id}
                />
              </div>
            );
          })
        ) : (
          <div className='activities__error'>
            <h1>Whoops!</h1>
            <h2>There's no activity to be shown.</h2>
            <img
              src={Loading}
              alt='Loading'
            />
          </div>
        )}
      </div>
    </div>
  );
};
