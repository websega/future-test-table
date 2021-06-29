import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import classNames from 'classnames';

import { addUser, toggleAddRow } from '../../redux/actions';

import { getVisibleAddRow } from '../../selectors/selectors';

import { getPhoneOfMask, validationSchema } from './helpers';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InputBox from '../InputBox/InputBox';
import Button from '../Button';
import Panel from '../Panel';

import classes from './AddForm.modules.scss';

type IdInputs = 'id' | 'firstName' | 'lastName' | 'email' | 'phone';

type InputsData = {
  id: IdInputs;
  type: string;
  placeholder: string;
};

const inputsData: InputsData[] = [
  {
    id: 'id',
    type: 'text',
    placeholder: 'Добавьте id',
  },
  {
    id: 'firstName',
    type: 'text',
    placeholder: 'Имя',
  },
  {
    id: 'lastName',
    type: 'text',
    placeholder: 'Фамилия',
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Электронная почта',
  },
  {
    id: 'phone',
    type: 'phone',
    placeholder: '(900)555-8000',
  },
];

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
      address: {
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
      },
      description: '',
    },

    validationSchema,

    onSubmit: (values) => {
      dispatch(addUser(values));
      dispatch(toggleAddRow());
    },
  });

  return (
    <>
      {visibleAddRow && (
        <Panel>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            {inputsData.map(({ id, type, placeholder }) => {
              return (
                <div className={classes.block} key={id}>
                  <span className={classes.title}>{id}</span>

                  <InputBox
                    id={id}
                    type={type}
                    value={
                      type === 'phone'
                        ? getPhoneOfMask(formik.values[id])
                        : formik.values[id]
                    }
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    hasError={!!formik.errors[id]}
                    size="l"
                  />

                  <ErrorMessage
                    className={classNames({
                      [`${classes.errorVisible}`]: !!formik.errors[id],
                    })}
                  >
                    {formik.errors[id] || 'empty'}
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
