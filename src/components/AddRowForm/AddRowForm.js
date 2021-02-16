import React, { useState } from 'react';

const AddRowForm = () => {
  const [visible, setsVisile] = useState(false);

  const toggleVisible = () => {
    setsVisile(!visible);
  };
  
  return (
    <div>
      <button type='button' className='btn btn-primary' onClick={toggleVisible}>
        Добавить
      </button>

      {visible && (
        <table className='table table-hover table-bordered'>
          <thead>
            <tr>
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Задайте id'
                ></input>
              </td>
              <td>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Имя'
                ></input>
              </td>
              <td>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Фамилия'
                ></input>
              </td>
              <td>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Электронная почта'
                ></input>
              </td>
              <td>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Номер телефона'
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddRowForm;
