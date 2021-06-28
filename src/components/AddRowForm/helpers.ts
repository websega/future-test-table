import * as Yup from 'yup';

export const validationSchema = Yup.object({
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

export const getPhoneOfMask = (value: string): string => {
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
