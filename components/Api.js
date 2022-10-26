export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  onResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  };

  getData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.onResponse);
  } //получаю данные профиля с сервера

  getCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.onResponse);
  } //получаю карточки с сервера

  pushDataProfile(name, prof) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: prof,
      }),
    }).then(this.onResponse);
  } //отправляю данные профиля на сервер

  pushDataAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this.onResponse);
  } //отправляю данные профиля на сервер

  pushCard(cardLink, cardName) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: cardLink,
        name: cardName,
      }),
    }).then(this.onResponse);
  } // отправка карточки на сервер

  deleteCardFromServer(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.onResponse);
  } // удаление карточки с сервера

  toggleLikeInServer(id, isThereLike) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: isThereLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this.onResponse);
  } //запрос на сервер удаление или нажатие лайка

  getAllData() {
    return Promise.all([this.getCard(), this.getData()]);
  } // получение данных с сервера одновременно
}