import React from 'react';

type InputBoxType = {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: () => void;
  hasError: boolean;
};

const InputBox = ({
  id,
  type,
  value,
  placeholder,
  onChange,
  hasError,
}: InputBoxType): JSX.Element => {
  return (
    <label htmlFor={id} className="form-label">
      <input
        className={`${'form-control'} ${hasError ? 'is-invalid' : ''}`}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

export default InputBox;
