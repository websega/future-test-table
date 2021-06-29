import React from 'react';

import classes from './Loading.modules.scss';

const Loading = (): JSX.Element => {
  return (
    <div className={classes['lds-grid']}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
