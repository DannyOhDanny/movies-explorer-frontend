import '../Register/Register.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import { isDisabled } from '@testing-library/user-event/dist/utils';

// Правила валидации импутов
const validators = {
  email: {
    required: value => {
      return value === '';
    },
    isEmail: value => {
      return !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }
  },
  password: {
    required: value => {
      return value === '';
    },
    minLength: value => {
      return value.length < 8;
    },
    containNumbers: value => {
      return !/[0-9]/.test(value);
    }
  }
};
function Login(props) {
  // Стейты формы
  const [errorMessage, setErrorMessage] = useState(null);
  const [info, setInfo] = useState(null);

  //Стейты импутов
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });
  //Отслеживание ошибок валидации
  const [errors, setErrors] = useState({
    email: {
      required: true,
      isEmail: true
    },
    password: {
      required: true,
      minLength: true,
      containNumbers: true
    }
  });

  useEffect(
    function validateInputs() {
      const { email, password } = formValue;
      // Находим прогоняем значение импута по ключам объекта validators

      const emailValidationResult = Object.keys(validators.email)
        .map(errorKey => {
          const errorResult = validators.email[errorKey](email);
          return { [errorKey]: errorResult };
        })
        .reduce((acc, element) => ({ ...acc, ...element }), {});
      const passwordValidationResult = Object.keys(validators.password)
        .map(errorKey => {
          const errorResult = validators.password[errorKey](password);
          return { [errorKey]: errorResult };
        })

        //собираем новые значения в новый объект
        .reduce((acc, element) => ({ ...acc, ...element }), {});
      //Соединяем { } cо значениями ошибок и объект с валидацией импутов
      setErrors({
        email: emailValidationResult,
        password: passwordValidationResult
      });
    },
    //зависимости
    [formValue, setErrors]
  );

  const isEmailValid = Object.values(errors.email).some(Boolean);
  const isPasswordValid = Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isPasswordValid || isEmailValid;

  //Сохранение значений импутов по event в объект
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  //Обработка сабмита + вызов колбека из App
  const handleSubmit = e => {
    e.preventDefault();
    props.handleLogin(formValue, setErrorMessage, setInfo);
  };
  return (
    <Form
      greetingTxt={'Рады видеть!'}
      btnName={'Войти'}
      actionTxt={'Еще не зарегистрированы?'}
      btnName2={'Регистрация'}
      onSubmit={handleSubmit}
      isDisabled={isSubmitDisabled}
      path={'/signup'}
    >
      <div className="form__box">
        <div className="form__container">
          <label className="form__label">E-mail</label>
          <input
            id="email-input"
            name="email"
            type="email"
            placeholder="email@email.ru"
            className={isEmailValid ? ['form__area', 'form__area_active'].join(' ') : 'form__area'}
            onChange={handleChange}
            value={formValue.email}
            disabled={props.isLoading ? true : false}
          ></input>
          {(errors.email.required || errors.password.required) && (
            <span
              className={
                errors.email.required || errors.password.required
                  ? ['form__error', 'form__error_active'].join(' ')
                  : ['form__error']
              }
            >
              Обязательное поле
            </span>
          )}
          {errors.email.isEmail && (
            <span
              className={
                isEmailValid ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
              }
            >
              Укажите электронный адрес в правильном формате
            </span>
          )}
        </div>
        <div className="form__container">
          <label className="form__label">Пароль</label>
          <input
            id="password-input"
            name="password"
            type="password"
            placeholder="пароль"
            className={
              isPasswordValid ? ['form__area', 'form__area_active'].join(' ') : 'form__area'
            }
            onChange={handleChange}
            value={formValue.password}
            disabled={props.isLoading ? true : false}
          ></input>
          {errors.password.required && (
            <span
              className={
                errors.email.required || errors.password.required
                  ? ['form__error', 'form__error_active'].join(' ')
                  : ['form__error']
              }
            >
              Обязательное поле
            </span>
          )}
          {errors.password.minLength && (
            <span
              className={
                isPasswordValid ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
              }
            >
              Минимальная длина пароля: 8 символов
            </span>
          )}
          {errors.password.containNumbers && (
            <span
              className={
                isPasswordValid ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
              }
            >
              Пароль должен состоять из цифр
            </span>
          )}
          <span
            className={
              errorMessage ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
            }
          >
            {errorMessage}
          </span>
          <span
            className={
              info ? ['form__error', 'form__error_active_green'].join(' ') : ['form__error']
            }
          >
            {info}
          </span>
          <span
            className={
              props.infoMessage
                ? ['form__error', 'form__error_active_green'].join(' ')
                : ['form__error']
            }
          >
            {props.infoMessage}
          </span>
        </div>
      </div>
    </Form>
  );
}

export default Login;
