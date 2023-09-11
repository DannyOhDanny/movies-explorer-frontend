import './SearchForm.css';
import React from 'react';
import { useForm } from 'react-hook-form';

function SearchForm(props) {
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
      search_form: ''
    }
  });

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="search-form">
      <form
        className="search-form__container search-form__container_cf"
        onSubmit={handleSubmit(onSubmit)}
        id="search-form"
      >
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="search"
          name="search_form"
          {...register('search_form', {
            required: { value: true, message: 'Обязательное поле' },
            minLength: {
              value: 2,
              message: 'Минимальное количество символов: 2'
            }
          })}
        ></input>

        <button className="search-form__button" type="submit"></button>
      </form>
      {errors.search_form && (
        <span className="search-form__error">{errors.search_form.message}</span>
      )}
    </div>
  );
}

export default SearchForm;
