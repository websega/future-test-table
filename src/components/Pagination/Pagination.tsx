import React, { useEffect, useState } from 'react';

import PaginationItem from './PaginationItem/PaginationItem';

import classes from './Pagination.modules.scss';

type PaginationPropsType = {
  totalPages: number;
  onChange: (pageNum: number) => void;
  currentPage: number;
};

const hidingThreshold = 3;
const lowerBoundForHiding = 4;

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
            (number === currentPage + hidingThreshold &&
              number !== numbers.length) ||
            (number === currentPage - hidingThreshold &&
              currentPage > lowerBoundForHiding)
          ) {
            return (
              <li key={`page-${number}`} className={classes.ellipsis}>
                . . .
              </li>
            );
          }

          if (
            (number > currentPage + hidingThreshold &&
              number !== 1 &&
              number !== numbers.length) ||
            (number < currentPage - hidingThreshold &&
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
