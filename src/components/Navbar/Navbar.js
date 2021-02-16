import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='!#'>
          Test Table
        </a>
        <form className='d-flex'>
          <input
            className='form-control me-2'
            type='search'
            placeholder='Найти'
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
