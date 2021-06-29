import React from 'react';

import classNames from 'classnames';

import classes from './Icon.modules.scss';

export type IconPositionType = 'left' | 'right';
export type IconSizeType = 's' | 'l';

type IconType = {
  rotateIcon?: boolean;
  icon: JSX.Element;
  position: IconPositionType;
  size?: IconSizeType;
};

const Icon = ({
  rotateIcon,
  icon,
  position,
  size = 'l',
}: IconType): JSX.Element => {
  return (
    <div
      className={classNames(classes.icon, {
        [classes.rotate]: rotateIcon,
        [classes.left]: position === 'left',
        [classes.right]: position === 'right',
        [classes.small]: size === 's',
        [classes.large]: size === 'l',
      })}
    >
      {icon}
    </div>
  );
};

export default Icon;
