import React from 'react';

import classNames from 'classnames';

import classes from './ErrorMessage.modules.scss';

type ErrorMessagePropsType = {
  children: React.ReactNode;
  className: string;
};

const ErrorMessage = ({
  children,
  className,
}: ErrorMessagePropsType): JSX.Element => {
  return (
    <span
      className={classNames(classes.errorText, {
        [`${className}`]: !!className,
      })}
    >
      {children}
    </span>
  );
};

export default ErrorMessage;
