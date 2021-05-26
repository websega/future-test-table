import React from 'react';

import classNames from 'classnames';

import Icon from '../Icon';

import classes from './InputBox.modules.scss';

type InputBoxType = {
  id: string;
  type: string;
  value: string | number;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  size: 'l' | 'm' | 's' | 'b';
  icon?: JSX.Element;
  rotateIcon?: boolean;
};

const InputBox = ({
  id,
  type,
  value,
  placeholder,
  onChange,
  hasError,
  size,
  icon,
  rotateIcon,
}: InputBoxType): JSX.Element => {
  return (
    <label htmlFor={id} className={classes.label}>
      <input
        className={classNames(classes.input, {
          [classes.error]: hasError,
          [classes.large]: size === 'l',
          [classes.medium]: size === 'm',
          [classes.small]: size === 's',
          [classes.button]: size === 'b',
        })}
        id={id}
        name={id}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />

      {icon && <Icon icon={icon} rotateIcon={rotateIcon} position="right" />}
    </label>
  );
};

export default InputBox;
