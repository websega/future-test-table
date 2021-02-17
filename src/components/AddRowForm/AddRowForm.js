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

const AddRowForm = () => {
  const dispatch = useDispatch();

  const [visible, setsVisile] = useState(false);
  const [phone, setPhone] = useState('');

  const toggleVisible = () => {
    setsVisile(!visible);
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {},
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      dispatch(addUser(values));
    },
  });

  const setPhoneMask = (e) => {
    const phoneMasked = e.target.value
      .split('')
      .filter((w) => !/[(|)-]/.test(w))
      .reduce((acc, currNum) => acc.replace('x', currNum), '(xxx)xxx-xxxx');

    setPhone(phoneMasked);
    formik.handleChange(e);
  };

  return (
    <>
      <button type='button' className='btn btn-primary' onClick={toggleVisible}>
        Добавить
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
                    onChange={setPhoneMask}
                    value={phone}
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
