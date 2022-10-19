import { formAddPhoto, popupButtonAddCard, saveMessage } from "./Popup";
import { api } from "../src/index";
import Section from "./Section";

const popupImage = document.querySelector("#popupPhoto");
const imgDescription = document.querySelector(".popup__photo-title");
const cardAddButton = formAddPhoto.querySelector(".popup__submit");
const img = document.querySelector(".popup__photo");

export class Card {
  constructor({data, myId, openImg}) {
    this.data = data;
    this.myId = myId;
    this.openImg = openImg;
  }

  _getElement() {
    return  document.querySelector("#card-template").content.querySelector('.photo-grid__item').cloneNode(true);
  }

  _findInnerElements() {
    this.likeButton = this._cardElement.querySelector(".photo-grid__like");
    this.deleteButton = this._cardElement.querySelector(".photo-grid__del-button");
    this.image = this._cardElement.querySelector(".photo-grid__picture");
    this.cardDescription = this._cardElement.querySelector(".photo-grid__text")
  }

  _isThereLike(likeArr, myId) {
    return Boolean(
      likeArr.find((element) => {
        return element._id === myId;
      })
    );
  } // сравниваю id, проверяю есть ли лайк в массиве лайков

  _showLikeStatus(cardElement, likeArr, myId) {
    const likeButton = cardElement.querySelector(".photo-grid__like");
    const likeCounter = cardElement.querySelector(".photo-grid__like-counter");
    likeCounter.textContent = likeArr.length;

    if (this._isThereLike(likeArr, myId)) {
      likeButton.classList.add("photo-grid__like_active");
    } else {
      likeButton.classList.remove("photo-grid__like_active");
    }
  } // обновляю статус лайка на странице

  _handleLikeShowStatus(id, isThereLike, cardElement, myId) {
    api.toggleLikeInServer(id, isThereLike)
      .then((data) => {
        this._showLikeStatus(cardElement, data.likes, myId);
      })
      .catch((err) => {
        console.log(err);
      });
  }; // обновляю статус лайка на сервере

  _deleteCard(cardEl, cardId) {
    api.deleteCardFromServer(cardId)
      .then(() => {
        cardEl.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  } // удаление карточки

  _setEventListeners() {
    this.deleteButton.addEventListener("click", () => {
      this._deleteCard(this._cardElement, this.data._id);
    });

    this.image.addEventListener("click", () => {
      this.openImg(this.image)
    });

    this.likeButton.addEventListener("click", () => {
      this._handleLikeShowStatus(this.data._id, this.likeButton.classList.contains("photo-grid__like_active"), this._cardElement, this.myId);
    });
  }

  _delButtonNotOwnerRemover() {
    if (this.data.owner._id !== this.myId) {
      this.deleteButton.remove();
    }
  }

  createNewCard() {
    this._cardElement = this._getElement();
    this._findInnerElements();

    this.image.owner = `${this.data._id}`;
    this.cardDescription.textContent = this.data.name;
    this.image.src = this.data.link;
    this.image.alt = this.data.name;

    this._showLikeStatus(this._cardElement, this.data.likes, this.myId);
    this._delButtonNotOwnerRemover()
    this._setEventListeners();
    return this._cardElement;
  } // создание карточки
}

function addNewCard(myId) {
  saveMessage(cardAddButton);

  api.pushCard(formAddPhoto.linkPicture.value, formAddPhoto.namePlace.value)
    .then((data) => {
      const cardList = new Section({
        renderer: (item) => {
          const card = new Card({data: item, myId: myId, openImg: openImg});
          cardList.setItem(card.createNewCard())}
      }, ".photo-grid");
      cardList.renderItem(data);
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

export { popupImage, addNewCard, openImg};
