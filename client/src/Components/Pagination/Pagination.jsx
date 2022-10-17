import React from 'react';

import './pagination.scss';

export default function PaginationComponent({
  currentPage,
  minPageNumber,
  maxPageNumber,
  allCountries,
  cPerPage,
  pages,
}) {
  const arrPages = [];
  for (let i = 1; i <= Math.ceil(allCountries / cPerPage); i++) {
    arrPages.push(i);
  }

  const handlePrev = () => currentPage - 1 && pages(currentPage - 1);
  const handleNext = () =>
    currentPage !== arrPages.length && pages(currentPage + 1);

  return (
    <div className='home__pagination'>
      <ul className='home__pagination-container'>
        <button
          className='home__pagination-prev'
          disabled={currentPage === 1 ? true : false}
          onClick={handlePrev}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'>
            <path d='M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z' />
          </svg>
        </button>
        {arrPages &&
          arrPages.slice(minPageNumber, maxPageNumber).map((num) => (
            <button
              className={currentPage === num ? 'active' : null}
              key={num}
              onClick={() => pages(num)}>
              {num}
            </button>
          ))}
        <button
          onClick={handleNext}
          disabled={currentPage === arrPages.length ? true : false}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'>
            <path d='M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z' />
          </svg>
        </button>
      </ul>
    </div>
  );
}
