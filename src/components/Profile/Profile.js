import Header from '../Header/Header';
import './Profile.css';
import { React, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';
import Preloader from '../Preloader/Preloader';

function Profile(props) {
  // Стейты формы
  const user = useContext(CurrentUserContext);
  const [focus, setFocus] = useState(false);
  const [err, setErr] = useState(null);
  const [info, setInfo] = useState(null);

  //Упарвление useForm
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    delayError: 0,
    criteriaMode: 'all',

    defaultValues: {
      name: user.currentUser.name,
      email: user.currentUser.email
    }
  });

  // Ф-ия сабмита и получения данных из формы
  function onSubmit(data) {
    if (data.name !== user.currentUser.name || data.email !== user.currentUser.email) {
      props.onUpdateUser(data, setInfo, setErr);
    } else {
      setInfo('Данные не изменены');
    }
  }

  return (
    <>
      {props.isLoading ? <Preloader></Preloader> : ''}
      <Header></Header>
      <section id="profile" className="profile">
        <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="profile__title">
            Привет, {user ? user.currentUser.name : 'Незнакомец'} !
          </h2>
          <div className="profile__container">
            <label className="profile__label">Имя</label>
            <input
              onClick={() => {
                setFocus(true);
              }}
              className="profile__input"
              placeholder="Имя"
              defaultValue={user.currentUser.name}
              name="name"
              {...register('name', {
                required: 'Поле не может быть пустым',
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$/,
                  message: 'Неверно указано имя'
                },
                maxLength: {
                  value: 30,
                  message: 'Максимальное количество символов: 30'
                },
                minLength: {
                  value: 2,
                  message: 'Минимальное количество символов: 2'
                }
              })}
            ></input>
          </div>
          {errors.name && <span className="profile__error">{errors.name.message}</span>}
          <div className="profile__container">
            <label className="profile__label">E-mail</label>
            <input
              onClick={() => {
                setFocus(true);
              }}
              className="profile__input"
              placeholder="email@mail.ru"
              defaultValue={user.currentUser.email}
              name="email"
              {...register('email', {
                required: 'Поле не может быть пустым',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: 'Неверный формат email'
                }
              })}
            ></input>
          </div>
          {errors.email && <span className="profile__error">{errors.email.message}</span>}
          {err && <span className="profile__error">{err}</span>}
          {info && (
            <span className={info ? ['profile__info', 'form__info_green'].join(' ') : ['']}>
              {info}
            </span>
          )}
          {props.errors && isDirty && <span className="profile__error">{props.errors}</span>}
          <button
            type="submit"
            disabled={!isValid && isDirty}
            className={isValid & focus ? 'profile__submit-btn' : 'profile__update-btn'}
          >
            {isValid & focus ? 'Сохранить' : 'Редактировать'}
          </button>
          <button onClick={props.onLogout} className="profile__signout-btn">
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
