import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterUsers } from '../../redux/actions';

import './Navbar.scss';

const Navbar = (): JSX.Element => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const chageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setInputValue(target.value);
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

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="!#">
          Test Table
        </a>
        <div className="navbar__right">
          <form className="d-flex" onSubmit={submitHandler}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Найти"
              onChange={chageHandler}
              value={inputValue}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={inputValue.trim() === ''}
            >
              Найти
            </button>
          </form>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={clickHandler}
          >
            Показать все
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
