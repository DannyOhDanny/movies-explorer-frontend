import Header from '../Header/Header';
import './Profile.css';
import React from 'react';
import { useForm } from 'react-hook-form';

// import { useNavigate } from 'react-router-dom';

function Profile() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    shouldFocusError: true,
    delayError: 50,
    criteriaMode: 'all',

    defaultValues: {
      name: '',
      email: ''
    }
  });

  function onSubmit(data) {
    console.log(data);
  }
  // const navigate = useNavigate();

  // //Ф-ия удаления токена и обнуления стейтов после выхода
  // function signOut() {
  //   localStorage.removeItem('jwt');
  //   // props.setIsLoggedIn(false);
  //   navigate('/sign-in', { replace: true });
  // }

  return (
    <>
      <Header></Header>
      <section id="profile" className="profile">
        <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="profile__title"> Привет, Виталий!</h2>
          <div className="profile__container">
            <label className="profile__label">Имя</label>
            <input
              className="profile__input"
              placeholder="Имя"
              name="name"
              {...register('name', {
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
          <div className="profile__container">
            <label className="profile__label">E-mail</label>
            <input
              className="profile__input"
              placeholder="email@email.ru"
              name="email"
              {...register('email', {
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: 'Неверный формат email'
                }
              })}
            ></input>
          </div>
          {errors.name && <span className="profile__error">{errors.name.message}</span>}
          {errors.email && <span className="profile__error">{errors.email.message}</span>}
          <button className="profile__update-btn">Редактировать</button>
          <button className="profile__signout-btn">Выйти из аккаунта</button>
        </form>
      </section>
    </>
  );
}

export default Profile;
