import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { addUser } from '../../redux/actions';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InputBox from '../InputBox/InputBox';

const validationSchema = Yup.object({
  id: Yup.string()
    .matches(/^[0-9]+$/, 'Только цифры')
    .required('Id обязательно!'),
  firstName: Yup.string()
    .min(4, 'Имя должно быть больше 4 символов!')
    .max(15, 'Имя должно быть меньше 15 символов!')
    .matches(
      /^[A-Za-zА-Яа-я'\-,.][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/,
      'Нельзя использовать никакие символы, кроме букв!'
    )
    .required('Имя обязательно!'),
  lastName: Yup.string()
    .min(4, 'Фамилия должно быть больше 4 символов!')
    .max(15, 'Фамилия должно быть меньше 15 символов!')
    .matches(
      /^[A-Za-zА-Яа-я'\-,.][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/,
      'Нельзя использовать никакие символы, кроме букв!'
    )
    .required('Фамилия обязательна!'),
  email: Yup.string()
    .email('Не подходящий формат email!')
    .required('Email обязателен!'),
  phone: Yup.string()
    .matches(
      /\([0-9]{3}\)([0-9]{3})-([0-9]{4})/,
      'Не верный формат номера телефона!'
    )
    .required('Номер телефона обязателен!'),
});

const getPhoneOfMask = (value: string) => {
  const matrix = '(___)___-____';
  let i = 0;

  const val = value.replace(/\D/g, '');

  return matrix.replace(/./g, (a) => {
    if (/[_\d]/.test(a) && i < val.length) {
      return val[i++];
    }

    if (i >= val.length) {
      return '';
    }

    return a;
  });
};

const AddRowForm = (): JSX.Element => {
  const dispatch = useDispatch();

  const [visible, setVisile] = useState(false);

  const toggleVisible = () => {
    setVisile(!visible);
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {},
      description: '',
    },

    validationSchema,

    onSubmit: (values) => {
      dispatch(addUser(values));
      setVisile(false);
    },
  });

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={toggleVisible}>
        {!visible ? 'Добавить' : 'Скрыть'}
      </button>
      {visible && (
        <form onSubmit={formik.handleSubmit}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid}
          >
            Добавить в таблицу
          </button>
          <table className="table table-hover table-bordered">
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
                  <InputBox
                    id="id"
                    type="text"
                    value={formik.values.id}
                    placeholder="Добавьте id"
                    onChange={formik.handleChange}
                    hasError={!!formik.errors.id}
                  />

                  {formik.errors.id && <ErrorMessage msg={formik.errors.id} />}
                </td>
                <td>
                  <InputBox
                    id="firstName"
                    type="text"
                    value={formik.values.firstName}
                    placeholder="Имя"
                    onChange={formik.handleChange}
                    hasError={!!formik.errors.firstName}
                  />

                  {formik.errors.firstName && (
                    <ErrorMessage msg={formik.errors.firstName} />
                  )}
                </td>
                <td>
                  <InputBox
                    id="lastName"
                    type="text"
                    value={formik.values.lastName}
                    placeholder="Фамилия"
                    onChange={formik.handleChange}
                    hasError={!!formik.errors.lastName}
                  />

                  {formik.errors.lastName && (
                    <ErrorMessage msg={formik.errors.lastName} />
                  )}
                </td>
                <td>
                  <InputBox
                    id="email"
                    type="email"
                    value={formik.values.email}
                    placeholder="Электронная почта"
                    onChange={formik.handleChange}
                    hasError={!!formik.errors.email}
                  />

                  {formik.errors.email && (
                    <ErrorMessage msg={formik.errors.email} />
                  )}
                </td>
                <td>
                  <InputBox
                    id="phone"
                    type="phone"
                    value={getPhoneOfMask(formik.values.phone)}
                    placeholder="(900)555-8000"
                    onChange={formik.handleChange}
                    hasError={!!formik.errors.phone}
                  />

                  {formik.errors.phone && (
                    <ErrorMessage msg={formik.errors.phone} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}
    </>
  );
};

export default AddRowForm;