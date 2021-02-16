import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterUsers } from '../../redux/actions';

const Navbar = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const chageHandler = ({ target }) => {
    setInputValue(target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(filterUsers(inputValue));
    setInputValue('');
  };

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='!#'>
          Test Table
        </a>
        <form className='d-flex' onSubmit={submitHandler}>
          <input
            className='form-control me-2'
            type='search'
            placeholder='Найти'
            onChange={chageHandler}
            value={inputValue}
          />
          <button className='btn btn-outline-success' type='submit'>
            Найти
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
