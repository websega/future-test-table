import React from 'react';

const ErrorMessage = ({ msg }) => {
  return <div className='invalid-feedback'>{msg}</div>;
};

export default ErrorMessage;
