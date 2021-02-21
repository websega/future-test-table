import React from 'react';

const InputBox = ({ id, type, value, placeholder, onChange, hasError }) => {
  return (
    <>
      <label htmlFor={id} className='form-label'></label>
      <input
        className={`${'form-control'} ${hasError ? 'is-invalid' : ''}`}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default InputBox;
