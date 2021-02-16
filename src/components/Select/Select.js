import React from 'react';

import './Select.scss'

const Select = ({ onChange }) => (
  <div className='select'>
    <span className='select__content'>Строк на странице:</span>

    <select
      className='form-select form-select-sm'
      aria-label='.form-select-sm example'
      onChange={onChange}
    >
      <option value='10'>10</option>
      <option value='25'>25</option>
      <option value='50'>50</option>
    </select>
  </div>
);

export default Select;
