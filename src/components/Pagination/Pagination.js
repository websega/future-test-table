import React, { useEffect, useState } from 'react';

import './Pagination.scss';
import PaginationItem from './PaginationItem/PaginationItem';

const Pagination = ({ totalPages, onChange, currentPage }) => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const temp = [];

    for (let i = 1; i <= totalPages; i++) {
      temp.push(i);
    }

    setNumbers([...temp]);
  }, [totalPages]);

  return (
    <nav className='nav'>
      <ul className='pagination'>
        <li
          className={`${'page-item'} ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onChange(1)}
        >
          <button className='page-link' href='!#'>
            First
          </button>
        </li>
        <li
          className={`${'page-item'} ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onChange(currentPage - 1)}
        >
          <button className='page-link' href='!#'>
            Previous
          </button>
        </li>
        {numbers.map((number) => {
          if (
            // скрываем номер, который равен +3 от текущего и не последний
            (number === currentPage + 3 && number !== numbers.length) ||
            // скрыть номера, которые находтся на -3 от текущего и при этом текущий номер больше 4
            (currentPage > 4 && number === currentPage - 3)
          ) {
            return (
              <li className='page-item' key={`page-${number}`}>
                ...
              </li>
            );
          } else if (
            // убирем все номера, которые больше текущего на 3
            (number > currentPage + 3 &&
              number !== 1 &&
              number !== numbers.length) ||
            // убрать номера, которые меньше текущего на 3 и при этом не 1 и не последний
            (number < currentPage - 3 &&
              number !== 1 &&
              number !== numbers.length)
          ) {
            return null;
          }

          return (
            <PaginationItem
              key={`page-${number}`}
              active={currentPage === number}
              onChange={() => onChange(number)}
              pageNum={number}
            />
          );
        })}
        
        <li
          className={`${'page-item'} ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
          onClick={() => onChange(currentPage + 1)}
        >
          <button className='page-link' href='#'>
            Next
          </button>
        </li>
        <li
          className={`${'page-item'} ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
          onClick={() => onChange(numbers.length)}
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
