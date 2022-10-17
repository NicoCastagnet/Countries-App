import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination';
import SideBar from '../SideBar/SideBar';
import Loading from '../../Assets/loading.gif';

import './Home.scss';

export const Home = () => {
  const allCountries = useSelector((state) => state.countries); //trae del reducer el estado countries

  /* SideBar */
  const [sideBar, setSideBar] = useState(false);

  const openSideBar = () => {
    setSideBar(!sideBar);
  };

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1); //Starting from page 1.
  let [cPerPage] = useState(10); //Setting how many countries per page.
  if (currentPage === 1) cPerPage = 9; //Condition for render just 9 at the first page
  const indexOfLastCountry = currentPage * cPerPage; // 2 * 10 = 20
  const indexOfFirstCountry = indexOfLastCountry - cPerPage; // 20 - 10 = 10
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
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

  return (
    <div className='home__page'>
      <NavBar
        openSideBar={openSideBar}
        sideBar={sideBar}
        setCurrentPage={setCurrentPage}
      />
      <SideBar
        openSideBar={openSideBar}
        sideBar={sideBar}
        setCurrentPage={setCurrentPage}
        setMinPageNumber={setMinPageNumber}
        setMaxPageNumber={setMaxPageNumber}
      />
      <Pagination
        currentPage={currentPage}
        minPageNumber={minPageNumber}
        maxPageNumber={maxPageNumber}
        cPerPage={cPerPage}
        allCountries={Array.isArray(allCountries) ? allCountries.length : 1}
        pages={pages}
      />
      <div className='home__page-cards'>
        {currentCountries.length ? (
          currentCountries.map((e) => {
            return (
              <div
                key={e.id}
                className='home__page-card'>
                <div className='tooltip'>
                  <span className='tooltiptext'>
                    {e.population?.toLocaleString('es-AR') || ''} inhabitants
                  </span>
                </div>
                <Card
                  flag_img={e.flag_img}
                  name={e.name}
                  continent={e.continent}
                  id={e.id}
                  key={e.id}
                />
              </div>
            );
          })
        ) : (
          <img
            className='home__page-loading'
            src={Loading}
            alt='Loading-gif'
          />
        )}
      </div>
    </div>
  );
};
