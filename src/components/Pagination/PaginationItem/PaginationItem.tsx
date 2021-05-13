import React from 'react';

type PaginationItemPropsType = {
  active?: boolean;
  disabled?: boolean;
  onChange: () => void;
  pageNum: string | number;
};

const PaginationItem = ({
  active,
  disabled,
  onChange,
  pageNum,
}: PaginationItemPropsType): JSX.Element => {
  return (
    <li
      className={`${'page-item'} ${active && 'active'} ${
        disabled && 'disabled'
      }`}
    >
      <button className="page-link" onClick={onChange} type="button">
        {pageNum}
      </button>
    </li>
  );
};

export default PaginationItem;
