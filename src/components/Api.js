export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  /**
   * checking on errors: if a fetch is ok, returns json, if not shows an error
   */
  _checkErrors(res) {
    if (res.ok) {
      console.log(res, `Everything is good: ${res.status} ${res.statusText}`);
      return res.json();
    } else {
      return Promise.reject(`Something is wrong: 4 8 15 16 23 42 && ${res.status} ${res.statusText}`);
    }
  }
  /**
   * getting profile info from the server
   */
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkErrors);
  }
  /**
   * getting cards from the server
   */
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkErrors);
  }
  /**
   * editing user profile info on the server
   */
  editProfile(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: info[`profile-name`],
        about: info[`profile-job`]
      })
    })
      .then(this._checkErrors);
  }
  /**
   * updating profile avatar on the server
   */
  updateAvatar(avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(this._checkErrors);
  }
  /**
   * adding a new card to the server
   */
  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkErrors);
  }
  /**
   * removing a card from the server
   */
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkErrors);
  }
  /**
   * adding like to the server
   */
  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkErrors);
  }
  /**
   * removing like from the server
   */
  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkErrors);
  }
}