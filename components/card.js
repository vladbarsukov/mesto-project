import { formAddPhoto, popupButtonAddCard, saveMessage, handleCloseButton, handleOpenPopup } from "./modal.js";

// import { pushCard, deleteCardFromServer, toggleLikeInServer, Api, config } from "./api.js";
import { api } from "./../src/index.js";

const cardSection = document.querySelector(".photo-grid");
const cardTemplate = document.querySelector("#card-template").content;
const popupImage = document.querySelector("#popupPhoto");
const imgDescription = document.querySelector(".popup__photo-title");
const cardAddButton = formAddPhoto.querySelector(".popup__submit");
const img = document.querySelector(".popup__photo");

const handleLikeShowStatus = (id, isThereLike, cardElement, myId) => {
  api.toggleLikeInServer(id, isThereLike)
    .then((data) => {
      showLikeStatus(cardElement, data.likes, myId);
    })
    .catch((err) => {
      console.log(err);
    });
}; // обновляю статус лайка на сервере

function isThereLike(likeArr, myId) {
  return Boolean(
    likeArr.find((element) => {
      return element._id === myId;
    })
  );
} // сравниваю id, проверяю есть ли лайк в массиве лайков

function showLikeStatus(cardElement, likeArr, myId) {
  const likeButton = cardElement.querySelector(".photo-grid__like");
  const likeCounter = cardElement.querySelector(".photo-grid__like-counter");
  likeCounter.textContent = likeArr.length;

  if (isThereLike(likeArr, myId)) {
    likeButton.classList.add("photo-grid__like_active");
  } else {
    likeButton.classList.remove("photo-grid__like_active");
  }
} // обновляю статус лайка на странице

function addCard(data, myId) {
  // const card = createNewCard(data, myId, handleLikeShowStatus, deleteCard);
  // cardSection.prepend(card);
  const card = new Card({
    data,
    myId,
    handleLikeShowStatus,
    deleteCard,
    openImg,
  })
  cardSection.prepend(card.createNewCard());

} //// функция добавления карточки из массива на страницу

function deleteCard(card, cardId) {
  api.deleteCardFromServer(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
} // удаление карточки

//////////////// card OOP
///////////////////////




export class CardList {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  renderItem(cardData) {
    this._renderer(cardData)
  }
  renderItems(cards) {
    cards.forEach( cardData => this.renderItem(cardData))
  }
  addCard(cardNode) {
    this._container.append(cardNode)
  }
}

export class Card {
  static _template = document.querySelector("#card-template").content
  constructor({data, myId, handleLikeShowStatus, deleteCard, openImg}) {
    this.data = data;
    this.myId = myId;
    this.handleLikeShowStatus = handleLikeShowStatus;
    this.deleteCard = deleteCard;
    this.openImg = openImg;
  }
 createNewCard() {
    const cardElement = Card._template.cloneNode(true);
    const likeButton = cardElement.querySelector(".photo-grid__like");
    const card = cardElement.querySelector(".photo-grid__item");
    const deleteButton = cardElement.querySelector(".photo-grid__del-button");
    const image = cardElement.querySelector(".photo-grid__picture");
    const cardDescription = cardElement.querySelector(".photo-grid__text")

    image.owner = `${this.data._id}`;
    cardDescription.textContent = this.data.name;
    image.src = this.data.link;
    image.alt = this.data.name;
    showLikeStatus(cardElement, this.data.likes, this.myId);
    if (this.data.owner._id !== this.myId) {
      deleteButton.remove();
    }

    deleteButton.addEventListener("click", () => {
      this.deleteCard(card, this.data._id);
    });

    image.addEventListener("click", () => {
      this.openImg(image)
    });

    likeButton.addEventListener("click", () => {
      this.handleLikeShowStatus(this.data._id, likeButton.classList.contains("photo-grid__like_active"), card, this.myId);
    });
    return cardElement;
  } // создание карточки
}


///////////////////data, myId, handleLikeShowStatus, deleteCard



// function createNewCard(data, myId, handleLikeShowStatus, deleteCard) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const likeButton = cardElement.querySelector(".photo-grid__like");
//   const card = cardElement.querySelector(".photo-grid__item");
//   const deleteButton = cardElement.querySelector(".photo-grid__del-button");
//   const image = cardElement.querySelector(".photo-grid__picture");
//   const cardDescription = cardElement.querySelector(".photo-grid__text")
//
//   image.owner = `${data._id}`;
//   cardDescription.textContent = data.name;
//   image.src = data.link;
//   image.alt = data.name;
//   showLikeStatus(cardElement, data.likes, myId);
//   if (data.owner._id !== myId) {
//     deleteButton.remove();
//   }
//
//   deleteButton.addEventListener("click", () => {
//     deleteCard(card, data._id);
//   });
//
//   image.addEventListener("click", () => {
//     openImg(image)
//   });
//
//   likeButton.addEventListener("click", () => {
//     handleLikeShowStatus(data._id, likeButton.classList.contains("photo-grid__like_active"), card, myId);
//   });
//   return cardElement;
// } // создание карточки

function addNewCard(myId) {
  saveMessage(cardAddButton);
  api.pushCard(formAddPhoto.linkPicture.value, formAddPhoto.namePlace.value)
    .then((data) => {
      addCard(data, myId);
    })
    .then(() => {
      handleCloseButton(popupButtonAddCard);
    })
    .finally(() => {
      cardAddButton.textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    });
}  // отправляю новую карту на сервер

// попап с фото

function openImg(cardElement) {
  handleOpenPopup(popupImage);
  getCardData(cardElement);
} // открытие попапа с фото

function getCardData(image) {
  imgDescription.textContent = image.alt;
  img.src = image.src;
  img.alt = image.textContent;
} // получение данных из попапа для добавления новой карточки

export { addCard, handleCloseButton, popupImage, addNewCard,};
