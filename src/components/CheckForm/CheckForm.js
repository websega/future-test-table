import React from 'react';

const CheckForm = () => {
  const checkHandler = () => {};

  return (
    <div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          name='bigDataRadio'
          id='bigDataRadio'
        />
        <label className='form-check-label' htmlFor='bigDataRadio'>
          Большой набор данных
        </label>
      </div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          name='smallDataRadio'
          id='smallDataRadio'
          checked={true}
        />
        <label className='form-check-label' htmlFor='smallDataRadio'>
          Малый набор данных
        </label>
      </div>
    </div>
  );
};

export default CheckForm;
