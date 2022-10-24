const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
    'Content-Type': 'application/json',
  },
};

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  onResponce(res) {
    return res.ok ? res.json() : Promise.reject(res);
  };

  getData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.onResponce);
  } //получаю данные профиля с сервера

  getCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.onResponce);
  } //получаю карточки с сервера

  pushDataProfile(name, prof) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: prof,
      }),
    }).then(this.onResponce);
  } //отправляю данные профиля на сервер

  pushDataAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this.onResponce);
  } //отправляю данные профиля на сервер

  pushCard(cardLink, cardName) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: cardLink,
        name: cardName,
      }),
    }).then(this.onResponce);
  } // отправка карточки на сервер

  deleteCardFromServer(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.onResponce);
  } // удаление карточки с сервера

  toggleLikeInServer(id, isThereLike) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: isThereLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this.onResponce);
  } //запрос на сервер удаление или нажатие лайка

  getAllData() {
    return Promise.all([this.getCard(), this.getData()]);
  } // получение данных с сервера одновременно

}

export {
  // pushDataProfile, pushDataAvatar, pushCard, deleteCardFromServer, toggleLikeInServer, getAllData, getData,
  Api, config };