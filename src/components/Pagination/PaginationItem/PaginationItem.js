import React from 'react';

const PaginationItem = ({ active, disabled, onChange, pageNum }) => {
  return (
    <li
      className={`${'page-item'} ${active && 'active'} ${
        disabled && 'disabled'
      }`}
    >
      <button className='page-link' href='!#' onClick={onChange}>
        {pageNum}
      </button>
    </li>
  );
};

export default PaginationItem;
