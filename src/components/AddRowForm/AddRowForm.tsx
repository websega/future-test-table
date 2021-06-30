import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import classNames from 'classnames';

import { addUser, toggleAddRow } from '../../redux/actions/users';

import { getVisibleAddRow } from '../../selectors/selectors';

import { getPhoneOfMask, validationSchema } from './helpers';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InputBox from '../InputBox/InputBox';
import Button from '../Button';
import Panel from '../Panel';

import classes from './AddForm.modules.scss';

type NameInputs = 'id' | 'firstName' | 'lastName' | 'email' | 'phone';

type InputsData = {
  name: NameInputs;
  type: string;
  placeholder: string;
};

const inputsData: InputsData[] = [
  {
    name: 'id',
    type: 'text',
    placeholder: 'Добавьте name',
  },
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'Имя',
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Фамилия',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Электронная почта',
  },
  {
    name: 'phone',
    type: 'phone',
    placeholder: '(900)555-8000',
  },
];

export type FormikValuesType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const AddRowForm = (): JSX.Element => {
  const dispatch = useDispatch();

  const [visible, setVisile] = useState(false);

  const visibleAddRow = useSelector(getVisibleAddRow);

  const toggleVisible = () => {
    setVisile(!visible);
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },

    validationSchema,

    onSubmit: (values) => {
      dispatch(addUser(values));
      dispatch(toggleAddRow());
      formik.resetForm();
    },
  });

  return (
    <>
      {visibleAddRow && (
        <Panel>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            {inputsData.map(({ name, type, placeholder }) => {
              return (
                <div className={classes.block} key={name}>
                  <span className={classes.title}>{name}</span>

                  <InputBox
                    id={name}
                    type={type}
                    value={
                      name === 'phone'
                        ? getPhoneOfMask(formik.values[name])
                        : formik.values[name]
                    }
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    hasError={!!formik.errors[name]}
                    size="l"
                  />

                  <ErrorMessage
                    className={classNames({
                      [`${classes.errorVisible}`]: !!formik.errors[name],
                    })}
                  >
                    {formik.errors[name] || 'empty'}
                  </ErrorMessage>
                </div>
              );
            })}

            <Button
              onClick={toggleVisible}
              size="l"
              disabled={!formik.isValid}
              isSubmit
            >
              Добавить в таблицу
            </Button>
          </form>
        </Panel>
      )}
    </>
  );
};

export default AddRowForm;
