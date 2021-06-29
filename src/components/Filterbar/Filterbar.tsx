import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterUsers,
  filterUsersByFeature,
  toggleAddRow,
  toggleDataCollection,
} from '../../redux/actions';
import { FeatureFilterType } from '../../redux/reducer';
import { getNationalities, getVisibleAddRow } from '../../selectors/selectors';

import ClearIcon from '../../assets/images/icons/clear.svg';

import Button from '../Button';
import InputBox from '../InputBox';
import Select from '../Select';
import Panel from '../Panel';

import classes from './Filterbar.modules.scss';

const namesDataSet = ['Малый набор данных', 'Большой набор данных'];
const genderDataSet = ['male', 'female'];

const Filterbar = (): JSX.Element => {
  const dispatch = useDispatch();

  const visibleAddRow = useSelector(getVisibleAddRow);
  const nationalities = useSelector(getNationalities);

  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    dispatch(filterUsers(e.target.value));
  };

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(filterUsers(inputValue));
    setInputValue('');
  };

  const clickHandler = () => {
    setInputValue('');
    dispatch(filterUsers(''));
  };

  const toggleVisible = () => {
    dispatch(toggleAddRow());
  };

  const selectDataHandler = () => {
    dispatch(toggleDataCollection());
  };

  const selectHandler = (feature: FeatureFilterType, value: string) => {
    console.log('### ~ value', value);

    dispatch(filterUsersByFeature(feature, value));
  };

  return (
    <Panel className={classes.filters}>
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

      <div className={classes.left}>
        <Select items={namesDataSet} onClickItem={selectDataHandler} />

        <Select
          items={genderDataSet}
          onClickItem={(value) => selectHandler('gender', value)}
          placeholder="Гендер"
        />

        <Select
          items={nationalities}
          onClickItem={(value) => selectHandler('nat', value)}
          placeholder="Национальность"
        />

        <Button onClick={toggleVisible} size="l" isFilled>
          {!visibleAddRow ? 'Добавить' : 'Скрыть'}
        </Button>
      </div>
    </Panel>
  );
};

export default Filterbar;
