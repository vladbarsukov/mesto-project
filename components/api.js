import { profileName, profession } from "./modal_window.js";
import { addCard } from "./card.js";
import { avatar } from "./avatar.js";
let myId = null;

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

function getData() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-15/users/me ", {
    headers: {
      authorization: "e807f0be-4a7f-40ad-a75f-bff7cd3e53ea",
    },
  }).then(onResponce);
} //получаю данные профиля с сервера

function getCard() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-15/cards ", {
    headers: {
      authorization: "e807f0be-4a7f-40ad-a75f-bff7cd3e53ea",
    },
  }).then(onResponce);
} //получаю карточки с сервера

function pushDataProfile(name, prof) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-15/users/me", {
    method: "PATCH",
    headers: {
      authorization: "e807f0be-4a7f-40ad-a75f-bff7cd3e53ea",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: prof,
    }),
  }).then(onResponce);
} //отправляю данные профиля на сервер

function pushDataAvatar(link) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-15/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "e807f0be-4a7f-40ad-a75f-bff7cd3e53ea",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(onResponce);
} //отправляю данные профиля на сервер

function pushCard(cardLink, cardName) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-15/cards", {
    method: "POST",
    headers: {
      authorization: "e807f0be-4a7f-40ad-a75f-bff7cd3e53ea",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: cardLink,
      name: cardName,
    }),
  }).then(onResponce);
}

function deleteCardFromServer(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "e807f0be-4a7f-40ad-a75f-bff7cd3e53ea",
      "Content-Type": "application/json",
    },
  }).then(onResponce);
}

function toggleLikeInServer(id, isLike) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/likes/${id}`, {
    method: isLike ? "DELETE" : "PUT",
    headers: {
      authorization: "e807f0be-4a7f-40ad-a75f-bff7cd3e53ea",
      "Content-Type": "application/json",
    },
  }).then(onResponce);
} //запрос на сервер удаление или нажатие лайка

function getAllData() {
  return Promise.all([getCard(), getData()]);
}

getAllData().then(([cards, data]) => {
  profileName.textContent = data.name;
  profession.textContent = data.about;
  avatar.src = data.avatar;
  myId = data._id;
  cards.reverse().forEach((element) => {
    addCard(element, myId);
  });
});

export { pushDataProfile, pushDataAvatar, pushCard, myId, deleteCardFromServer, toggleLikeInServer, getAllData };
