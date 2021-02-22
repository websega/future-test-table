import React from 'react';

const PaginationItem = ({ active, onChange, pageNum }) => {
  return (
    <li className={`${'page-item'} ${active && 'active'}`}>
      <button className='page-link' href='!#' onClick={onChange}>
        {pageNum}
      </button>
    </li>
  );
};

export default PaginationItem;
