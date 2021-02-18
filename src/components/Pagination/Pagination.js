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
          onClick={() => onChangePage(1)}
        >
          <button className='page-link' href='!#'>
            First
          </button>
        </li>
        <li
          className={`${'page-item'} ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <button className='page-link' href='!#'>
            Previous
          </button>
        </li>
        {numbers.map((number) => {
          return (
            <li
              className={`${'page-item'} ${
                currentPage === number ? 'active' : ''
              }`}
              key={`page-${number}`}
            >
              <button
                className='page-link'
                href='!#'
                onClick={() => onChangePage(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
        <li
          className={`${'page-item'} ${
            currentPage === pageNumbers ? 'disabled' : ''
          }`}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <button className='page-link' href='#'>
            Next
          </button>
        </li>
        <li
          className={`${'page-item'} ${
            currentPage === pageNumbers ? 'disabled' : ''
          }`}
          onClick={() => onChangePage(numbers.length)}
        >
          <button className='page-link' href='#'>
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
