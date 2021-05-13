import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDataCollection } from '../../redux/actions';

const CheckForm = (): JSX.Element => {
  const [currentRadioBtn, setCurrentRadioBtn] = useState('bigData');
  const dispatch = useDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setCurrentRadioBtn(target.id);
    dispatch(toggleDataCollection());
  };

  return (
    <div>
      <div className="form-check">
        <label className="form-check-label" htmlFor="bigData">
          <input
            className="form-check-input"
            type="radio"
            name="bigData"
            id="bigData"
            checked={currentRadioBtn === 'bigData'}
            onChange={changeHandler}
          />
          Большой набор данных
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label" htmlFor="smallData">
          <input
            className="form-check-input"
            type="radio"
            name="smallData"
            id="smallData"
            checked={currentRadioBtn === 'smallData'}
            onChange={changeHandler}
          />
          Малый набор данных
        </label>
      </div>
    </div>
  );
};

export default CheckForm;
