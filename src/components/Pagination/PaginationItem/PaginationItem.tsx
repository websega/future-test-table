import React from 'react';

import Button from '../../Button';

import classes from './PaginationItem.modules.scss';

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
    <li>
      <Button
        className={classes.btn}
        size="s"
        isFilled={active}
        disabled={disabled}
        onClick={onChange}
      >
        {pageNum}
      </Button>
    </li>
  );
};

export default PaginationItem;
