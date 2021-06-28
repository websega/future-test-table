import React from 'react';

import classNames from 'classnames';

import classes from './Panel.modules.scss';

type PanelProps = {
  className?: string;
  children: React.ReactNode;
};

const Panel = ({ className, children }: PanelProps): JSX.Element => {
  return (
    <div
      className={classNames(classes.panel, {
        [`${className}`]: !!className,
      })}
    >
      {children}
    </div>
  );
};

export default Panel;
