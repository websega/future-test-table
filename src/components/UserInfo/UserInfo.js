import React from 'react';

import './UserInfo.scss';

const UserInfo = ({ user }) => {
  const {
    firstName,
    lastName,
    description = 'не задан',
    address: {
      streetAddress = 'не задан',
      city = 'не задан',
      state = 'не задан',
      zip = 'не задан',
    },
  } = user;
  
  return (
    <div className='user-info'>
      <span>Выбран пользователь</span> <b>{`${firstName} ${lastName}`}</b>
      <span>Описание:</span>
      <textarea defaultValue={description} />
      <span>Адрес проживания:</span> <b>{streetAddress}</b>
      <span>Город:</span> <b>{city}</b>
      <span>Провинция/штат:</span> <b>{state}</b>
      <span>Индекс:</span> <b>{zip}</b>
    </div>
  );
};
export default UserInfo;
