import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleAddRow, toggleDataCollection } from '../../redux/actions/users';

import { clearFilters, setFilters } from '../../redux/actions/filters';

import { FilterFieldType } from '../../redux/reducers/filters';
import {
  getFilters,
  getIsBigCollection,
  getNationalities,
  getVisibleAddRow,
} from '../../selectors/selectors';

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
  const isBigCollection = useSelector(getIsBigCollection);
  const { gender, nationality, search } = useSelector(getFilters);

  const changeSearchFilterHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    dispatch(setFilters('search', value.trim()));
  };

  const submitSearchHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setFilters('search', search));
  };

  const clickClearAllHandler = () => {
    dispatch(clearFilters());
  };

  const toggleVisible = () => {
    dispatch(toggleAddRow());
  };

  const dataSelectHandler = () => {
    dispatch(toggleDataCollection());
  };

  const filtersSelectHandler = (field: FilterFieldType, value: string) => {
    dispatch(setFilters(field, value));
  };

  return (
    <Panel className={classes.filters}>
      <div className={classes.right}>
        <form onSubmit={submitSearchHandler}>
          <InputBox
            id="search"
            type="input"
            placeholder="Найти"
            onChange={changeSearchFilterHandler}
            value={search}
            size="l"
          />
        </form>

        <Select
          items={namesDataSet}
          onClickItem={dataSelectHandler}
          value={isBigCollection ? namesDataSet[1] : namesDataSet[0]}
        />

        <Select
          items={genderDataSet}
          onClickItem={(value) => {
            filtersSelectHandler('gender', value);
          }}
          placeholder="Гендер"
          value={gender}
        />

        <Select
          items={nationalities}
          onClickItem={(value) => {
            filtersSelectHandler('nationality', value);
          }}
          placeholder="Национальность"
          value={nationality}
        />
      </div>

      <div className={classes.left}>
        <Button onClick={clickClearAllHandler} size="l" icon={<ClearIcon />}>
          Сбросить фильтры
        </Button>

        <Button onClick={toggleVisible} size="l" isFilled>
          {!visibleAddRow ? 'Добавить' : 'Скрыть'}
        </Button>
      </div>
    </Panel>
  );
};

export default Filterbar;
