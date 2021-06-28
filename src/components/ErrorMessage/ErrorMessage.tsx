import React from 'react';

import classes from './ErrorMessage.modules.scss';

type ErrorMessagePropsType = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessagePropsType): JSX.Element => {
  return <span className={classes.errorText}>{children}</span>;
};

export default ErrorMessage;
