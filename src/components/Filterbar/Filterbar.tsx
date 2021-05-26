import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterUsers,
  toggleAddRow,
  toggleDataCollection,
} from '../../redux/actions';
import { getVisibleAddRow } from '../../selectors/selectors';

import ClearIcon from '../../assets/images/icons/clear.svg';

import Button from '../Button';
import InputBox from '../InputBox';
import Select from '../Select';

import classes from './Filterbar.modules.scss';

const namesDataSet = ['Большой набор данных', 'Малый набор данных'];

const Filterbar = (): JSX.Element => {
  const dispatch = useDispatch();

  const visibleAddRow = useSelector(getVisibleAddRow);

  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(filterUsers(inputValue));
    setInputValue('');
  };

  const clickHandler = () => {
    setInputValue('');
    dispatch(filterUsers(inputValue));
  };

  const toggleVisible = () => {
    dispatch(toggleAddRow());
  };

  const selectHandler = () => {
    dispatch(toggleDataCollection());
  };

  return (
    <div className={classes.filters}>
      <div className={classes.right}>
        <form onSubmit={submitHandler}>
          <InputBox
            id="search"
            type="input"
            placeholder="Найти"
            onChange={handleChangeFilter}
            value={inputValue}
            size="l"
          />
        </form>

        <Button onClick={clickHandler} size="l" icon={<ClearIcon />}>
          Очистить
        </Button>
      </div>

      <Select items={namesDataSet} onClickItem={selectHandler} />

      <Button onClick={toggleVisible} size="l" isFilled>
        {!visibleAddRow ? 'Добавить' : 'Скрыть'}
      </Button>
    </div>
  );
};

export default Filterbar;
