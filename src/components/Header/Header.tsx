import React from 'react';

import classes from './Header.modules.scss';

const Header = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <span className={classes.logo}>Data Table</span>
    </header>
  );
};

export default Header;
