export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkErrors(res) {
    if (res.ok) {
      console.log(res, `Something is good: ${res.status} ${res.statusText}`);
      return res.json();
    } else {
      return Promise.reject(`Something is wrong: ${res.status} ${res.statusText}`);
    }
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkErrors);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkErrors);
  }
}