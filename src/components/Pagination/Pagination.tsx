import React, { useEffect, useState } from 'react';

import PaginationItem from './PaginationItem/PaginationItem';

import classes from './Pagination.modules.scss';

type PaginationPropsType = {
  totalPages: number;
  onChange: (pageNum: number) => void;
  currentPage: number;
};

const Pagination = ({
  totalPages,
  onChange,
  currentPage,
}: PaginationPropsType): JSX.Element => {
  const [numbers, setNumbers] = useState<Array<number>>([]);

  useEffect(() => {
    const temp = [];

    for (let i = 1; i <= totalPages; i++) {
      temp.push(i);
    }

    setNumbers(temp);
  }, [totalPages]);

  return (
    <nav>
      <ul className={classes.pagination}>
        <PaginationItem
          disabled={currentPage === 1}
          onChange={() => onChange(1)}
          pageNum="First"
        />
        <PaginationItem
          disabled={currentPage === 1}
          onChange={() => onChange(currentPage - 1)}
          pageNum="Previous"
        />

        {numbers.map((number) => {
          if (
            // скрываем номер, который равен +3 от текущего и не последний
            (number === currentPage + 3 && number !== numbers.length) ||
            // скрыть номера, которые находятся на -3 от текущего и при этом текущий номер больше 4
            (currentPage > 4 && number === currentPage - 3)
          ) {
            return (
              <li key={`page-${number}`} className={classes.ellipsis}>
                . . .
              </li>
            );
          }

          if (
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

        <PaginationItem
          disabled={currentPage === totalPages}
          onChange={() => onChange(currentPage + 1)}
          pageNum="Next"
        />
        <PaginationItem
          disabled={currentPage === totalPages}
          onChange={() => onChange(numbers.length)}
          pageNum="Last"
        />
      </ul>
    </nav>
  );
};

export default Pagination;
