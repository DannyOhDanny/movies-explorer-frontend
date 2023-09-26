import './SearchForm.css';
import { React } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
  //Хук useLocation
  const location = useLocation();
  //Управление формой и стейты
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    shouldFocusError: true,
    delayError: 0,
    criteriaMode: 'all',

    defaultValues: {
      search_query: ''
    }
  });

  function onSubmit(data) {
    if (location.pathname === '/saved-movies') {
      props.handleSaveSearch(data.search_query);
    } else {
      props.onSearchQuery(
        {
          query: data.search_query
        },
        props.isChecked
      );
    }
  }

  return (
    <div className="search-form">
      <form
        className="search-form__container search-form__container_cf"
        onSubmit={handleSubmit(onSubmit)}
        id="search-form"
      >
        <input
          value={location.pathname === '/movies' ? props.movieQuery || null : null}
          className="search-form__input"
          placeholder="Фильм"
          type="search"
          name="search_query"
          {...register('search_query', {
            required: { value: true, message: 'Введите ключевое слово' },
            minLength: {
              value: 2,
              message: 'Минимальное количество символов: 2'
            }
          })}
        ></input>
        <button className="search-form__button" type="submit"></button>
      </form>
      {errors.search_query && (
        <span className="search-form__error">{errors.search_query.message}</span>
      )}
      {props.errors && <span className="search-form__error">{props.errors}</span>}
      {props.infoMessage && <span className="search-form__info">{props.infoMessage}</span>}
    </div>
  );
}

export default SearchForm;
