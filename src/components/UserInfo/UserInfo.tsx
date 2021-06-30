import React from 'react';

import { UserType } from '../../redux/actions/users/types';

import classes from './UserInfo.modules.scss';

type UserPropsType = {
  user: UserType;
};

const UserInfo = ({ user }: UserPropsType): JSX.Element => {
  const { name, location } = user;

  return (
    <div className={classes.userInfo}>
      <span>
        Выбран пользователь: <b>{`${name.first} ${name.last}`}</b>
      </span>

      <span>
        Адрес проживания:{' '}
        <b>{`${location.street.name} ${location.street.number}`}</b>
      </span>

      <span>
        Город: <b>{location.city}</b>
      </span>

      <span>
        Провинция/штат: <b>{location.state}</b>
      </span>

      <span>
        Индекс: <b>{location.postcode}</b>
      </span>
    </div>
  );
};
export default UserInfo;
