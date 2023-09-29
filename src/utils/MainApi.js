import { MOVIES_URL, WEB_URL } from './constants';

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.json());
    }
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${MOVIES_URL}${data.image.url}`,
        thumbnail: data.thumbnail || `${MOVIES_URL}${data.image.formats.thumbnail.url}`,
        trailerLink: data.trailerLink,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  deleteSavedMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',

      body: JSON.stringify({ name, email, password })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  login({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => this._handleServerResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  updateUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email
      })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }
}

const mainApi = new MainApi({
  url: WEB_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default mainApi;
