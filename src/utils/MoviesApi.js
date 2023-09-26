class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Ошибка ответа сервера! Код ошибки:${res.status} - ${res.statusText} 
        }`
      );
    }
  }

  getMovieCardsFromServer() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: 'GET',
      //   credentials: 'include',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }
}

const moviesApi = new Api({
  url: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
