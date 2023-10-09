import './Register.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Form from '../Form/Form';

// Правила валидации импутов
const validators = {
  name: {
    required: value => {
      return value === '';
    },
    minLength: value => {
      return value.length < 2;
    },
    maxLength: value => {
      return value.length > 30;
    },
    isName: value => {
      return !/^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$/.test(value);
    }
  },
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

function Register(props) {
  //Стейты сообщений
  const [errorMessage, setErrorMessage] = useState(null);
  const [info, setInfo] = useState(null);
  //Стейты импутов
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  //Отслеживание ошибок валидации
  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
      maxLength: true,
      isName: true
    },
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
      const { name, email, password } = formValue;
      // Находим прогоняем значение импута по ключам объекта validators
      const nameValidationResult = Object.keys(validators.name)
        .map(errorKey => {
          const errorResult = validators.name[errorKey](name);
          return { [errorKey]: errorResult };
        })
        .reduce((acc, element) => ({ ...acc, ...element }), {});
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
        name: nameValidationResult,
        email: emailValidationResult,
        password: passwordValidationResult
      });
    },
    //зависимости
    [formValue, setErrors]
  );
  const isNameValid = Object.values(errors.name).some(Boolean);
  const isEmailValid = Object.values(errors.email).some(Boolean);
  const isPasswordValid = Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isPasswordValid || isEmailValid || isNameValid || props.isLoading;
  //Сохранение значений импутов по event в объект
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  //Обработка сабмита + вызов колбека из App
  const handleSubmit = e => {
    e.preventDefault();
    props.onRegister(formValue, setErrorMessage, setInfo, setFormValue);
    setFormValue({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <Form
      greetingTxt={`Добро пожаловать${info ? `, ${formValue.name}` : ''}!`}
      btnName={'Зарегистрироваться'}
      actionTxt={'Уже зарегистрированы?'}
      btnName2={'Войти'}
      onSubmit={handleSubmit}
      isDisabled={isSubmitDisabled}
      path={'/signin'}
    >
      <div className="form__box">
        <div className="form__container">
          <label className="form__label">Имя</label>
          <input
            id="name-input"
            name="name"
            type="text"
            placeholder="Имя"
            className={isNameValid ? ['form__area', 'form__area_active'].join(' ') : 'form__area'}
            onChange={handleChange}
            value={formValue.name}
            disabled={props.isLoading ? true : false}
          ></input>
          {errors.name.minLength && (
            <span
              className={
                isNameValid ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
              }
            >
              Минимальная длина имени: 2 символа
            </span>
          )}
          {errors.name.maxLength && (
            <span
              className={
                isNameValid ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
              }
            >
              {isNameValid && errors.name.maxLength ? 'Минимальная длина имени: 30 символов' : ''}
            </span>
          )}

          {errors.name.isName && (
            <span
              className={
                isNameValid ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
              }
            >
              Поле должно содержать символы кириллицы или латиницы
            </span>
          )}
          {errors.name.required && (
            <span
              className={
                errors.email.required || errors.name.required || errors.password.required
                  ? ['form__error', 'form__error_active'].join(' ')
                  : ['form__error']
              }
            >
              Обязательное поле
            </span>
          )}
        </div>

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
          {errors.email.required && (
            <span
              className={
                errors.email.required || errors.name.required || errors.password.required
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
            placeholder="Пароль"
            className={
              isPasswordValid ? ['form__area', 'form__area_active'].join(' ') : 'form__area'
            }
            onChange={handleChange}
            value={formValue.password}
            disabled={props.isLoading ? true : false}
          ></input>

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
          {errors.password.required && (
            <span
              className={
                errors.email.required || errors.name.required || errors.password.required
                  ? ['form__error', 'form__error_active'].join(' ')
                  : ['form__error']
              }
            >
              Обязательное поле
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
              props.errors ? ['form__error', 'form__error_active'].join(' ') : ['form__error']
            }
          >
            {props.errors}
          </span>
          <span
            className={
              info ? ['form__error', 'form__error_active_green'].join(' ') : ['form__error']
            }
          >
            {info}
          </span>
        </div>
      </div>
    </Form>
  );
}

export default Register;
