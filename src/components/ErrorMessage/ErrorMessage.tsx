import React from 'react';

type ErrorMessagePropsType = {
  msg: string;
};

const ErrorMessage = ({ msg }: ErrorMessagePropsType): JSX.Element => {
  return <div className="invalid-feedback">{msg}</div>;
};

export default ErrorMessage;
