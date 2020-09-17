export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkErrors(res) {
    if (res.ok) {
      console.log(res, `Everything is good: ${res.status} ${res.statusText}`);
      return res.json();
    } else {
      return Promise.reject(`Something is wrong: 4 8 15 16 23 42 && ${res.status} ${res.statusText}`);
    }
  }
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkErrors);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkErrors);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkErrors);
  }

  editProfile(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info)
    })
      .then(this._checkErrors);
  }

  // removeCard(id) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //     body: JSON.stringify(data)
  //   })
  //   .then(this._checkErrors);
  // }
}