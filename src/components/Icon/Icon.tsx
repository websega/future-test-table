import React from 'react';

import classNames from 'classnames';

import classes from './Icon.modules.scss';

export type IconPositionType = 'left' | 'right';

type IconType = {
  rotateIcon?: boolean;
  icon: JSX.Element;
  position: IconPositionType;
};

const Icon = ({ rotateIcon, icon, position }: IconType): JSX.Element => {
  return (
    <div
      className={classNames(classes.icon, {
        [classes.rotate]: rotateIcon,
        [classes.left]: position === 'left',
        [classes.right]: position === 'right',
      })}
    >
      {icon}
    </div>
  );
};

export default Icon;
