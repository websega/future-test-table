import React from 'react';

import './Pagination.scss';

const Pagination = ({ pageNumbers, onChangePage, currentPage }) => {
  const numbers = [];

  for (let i = 1; i <= pageNumbers; i++) {
    numbers.push(i);
  }

  return (
    <nav className='nav'>
      <ul className='pagination'>
        <li
          className={`${'page-item'} ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <a className='page-link' href='!#'>
            Previous
          </a>
        </li>
        {numbers.map((number) => {
          return (
            <li
              className={`${'page-item'} ${
                currentPage === number ? 'active' : ''
              }`}
              key={`page-${number}`}
            >
              <a
                className='page-link'
                href='!#'
                onClick={() => onChangePage(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li
          className={`${'page-item'} ${
            currentPage === pageNumbers ? 'disabled' : ''
          }`}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <a className='page-link' href='!#'>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
