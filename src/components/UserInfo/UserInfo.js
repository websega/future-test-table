import React from 'react';

import './UserInfo.scss';

const UserInfo = ({ user }) => {
  const {
    firstName,
    lastName,
    description,
    address: { streetAddress, city, state, zip },
  } = user;
  return (
    <div className='user-info'>
      <span>Выбран пользователь</span> <b>{`${firstName} ${lastName}`}</b>
      <span>Описание:</span>
      <textarea>{description}</textarea>
      <span>Адрес проживания:</span> <b>{streetAddress}</b>
      <span>Город:</span> <b>{city}</b>
      <span>Провинция/штат:</span> <b>{state}</b>
      <span>Индекс:</span> <b>{zip}</b>
    </div>
  );
};
export default UserInfo;
