import React from 'react';

import classNames from 'classnames';

import Icon from '../Icon';
import { IconPositionType } from '../Icon/Icon';

import classes from './Button.modules.scss';

type ButtonPropsType = {
  children: React.ReactNode;
  onClick?: () => void;
  size: 'l' | 'm' | 's';
  isFilled?: boolean;
  icon?: JSX.Element;
  isSubmit?: boolean;
  disabled?: boolean;
  rotateIcon?: boolean;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconPosition?: IconPositionType;
  className?: string;
};

const Button = ({
  children,
  onClick,
  size,
  isFilled,
  icon,
  isSubmit = false,
  disabled = false,
  rotateIcon = false,
  onMouseDown,
  iconPosition = 'left',
  className,
}: ButtonPropsType): JSX.Element => {
  return (
    <button
      className={classNames(classes.button, {
        [classes.large]: size === 'l',
        [classes.medium]: size === 'm',
        [classes.small]: size === 's',
        [classes.unfilled]: !isFilled,
        [classes.filled]: isFilled,
        [classes.iconPaddingL]: icon && iconPosition === 'left',
        [classes.iconPaddingR]: icon && iconPosition === 'right',
        [`${className}`]: !!className,
      })}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={onMouseDown}
    >
      {icon && (
        <Icon icon={icon} rotateIcon={rotateIcon} position={iconPosition} />
      )}

      {children}
    </button>
  );
};

export default Button;
