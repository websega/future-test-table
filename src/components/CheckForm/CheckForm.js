import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDataCollection } from '../../redux/actions';

const CheckForm = () => {
  const [currentRadioBtn, setCurrentRadioBtn] = useState('bigData');
  const dispatch = useDispatch();

  const changeHandler = ({ target }) => {
    setCurrentRadioBtn(target.id);
    dispatch(toggleDataCollection());
  };

  return (
    <div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          name='bigData'
          id='bigData'
          checked={currentRadioBtn === 'bigData'}
          onChange={changeHandler}
        />
        <label className='form-check-label' htmlFor='bigData'>
          Большой набор данных
        </label>
      </div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          name='smallData'
          id='smallData'
          checked={currentRadioBtn === 'smallData'}
          onChange={changeHandler}
        />
        <label className='form-check-label' htmlFor='smallData'>
          Малый набор данных
        </label>
      </div>
    </div>
  );
};

export default CheckForm;
