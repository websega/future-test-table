import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { addUser } from '../../redux/actions';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

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

const getPhoneOfMask = (value) => {
  const matrix = '(___)___-____';
  let i = 0;

  const val = value.replace(/\D/g, '');

  const res = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length
      ? val[i++]
      : i >= val.length
      ? ''
      : a;
  });

  return res;
};

const AddRowForm = () => {
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

    validationSchema: validationSchema,

    onSubmit: (values) => {
      dispatch(addUser(values));
      setVisile(false);
    },
  });

  return (
    <>
      <button type='button' className='btn btn-primary' onClick={toggleVisible}>
        {!visible ? 'Добавить' : 'Скрыть'}
      </button>
      {visible && (
        <form onSubmit={formik.handleSubmit}>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={!formik.isValid}
          >
            Добавить в таблицу
          </button>
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
                  <label htmlFor='id' className='form-label'></label>
                  <input
                    className={`${'form-control'} ${
                      formik.errors.id ? 'is-invalid' : ''
                    }`}
                    id='id'
                    name='id'
                    type='text'
                    placeholder='Добавьте id'
                    onChange={formik.handleChange}
                    value={formik.values.id}
                  />
                  {formik.errors.id && <ErrorMessage msg={formik.errors.id} />}
                </td>
                <td>
                  <label htmlFor='firstName' className='form-label'></label>
                  <input
                    className={`${'form-control'} ${
                      formik.errors.firstName ? 'is-invalid' : ''
                    }`}
                    id='firstName'
                    name='firstName'
                    type='text'
                    placeholder='Имя'
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  {formik.errors.firstName && (
                    <ErrorMessage msg={formik.errors.firstName} />
                  )}
                </td>
                <td>
                  <label htmlFor='lastName' className='form-label'></label>
                  <input
                    className={`${'form-control'} ${
                      formik.errors.lastName ? 'is-invalid' : ''
                    }`}
                    id='lastName'
                    name='lastName'
                    type='text'
                    placeholder='Фамилия'
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  {formik.errors.lastName && (
                    <ErrorMessage msg={formik.errors.lastName} />
                  )}
                </td>
                <td>
                  <label htmlFor='email' className='form-label'></label>
                  <input
                    className={`${'form-control'} ${
                      formik.errors.email ? 'is-invalid' : ''
                    }`}
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Электронная почта'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && (
                    <ErrorMessage msg={formik.errors.email} />
                  )}
                </td>
                <td>
                  <label htmlFor='phone' className='form-label'></label>
                  <input
                    className={`${'form-control'} ${
                      formik.errors.phone ? 'is-invalid' : ''
                    }`}
                    id='phone'
                    name='phone'
                    type='phone'
                    placeholder='(900)555-8000'
                    onChange={formik.handleChange}
                    value={getPhoneOfMask(formik.values.phone)}
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
