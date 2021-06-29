import React from 'react';
import { UserType } from '../../redux/actions/types';

import classes from './UserInfo.modules.scss';

type UserPropsType = {
  user: UserType;
};

const UserInfo = ({ user }: UserPropsType): JSX.Element => {
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
    <div className={classes.userInfo}>
      <span>
        Выбран пользователь: <b>{`${firstName} ${lastName}`}</b>
      </span>

      <span>Описание: {description}</span>

      <span>
        Адрес проживания: <b>{streetAddress}</b>{' '}
      </span>

      <span>
        Город: <b>{city}</b>
      </span>

      <span>
        Провинция/штат: <b>{state}</b>
      </span>

      <span>
        Индекс: <b>{zip}</b>
      </span>
    </div>
  );
};
export default UserInfo;
