export default class Card {
  constructor({ data, myId, handleCardClick, handleLikeClick, deleteCard }) {
    this.data = data;
    this.myId = myId;
    this.handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._deleteCard = deleteCard;
    this._element = document.querySelector("#card-template").content.querySelector('.photo-grid__item').cloneNode(true);
    this._likeButton = this._element.querySelector(".photo-grid__like");
    this._likeCounter = this._element.querySelector(".photo-grid__like-counter");
    this._deleteButton = this._element.querySelector(".photo-grid__del-button");
    this._image = this._element.querySelector(".photo-grid__picture");
    this._cardDescription = this._element.querySelector(".photo-grid__text")
  }

  _getElement() {
    return document.querySelector("#card-template").content.querySelector('.photo-grid__item').cloneNode(true);
  }

  _findInnerElements() {
    this._likeButton = this._element.querySelector(".photo-grid__like");
    this._deleteButton = this._element.querySelector(".photo-grid__del-button");
    this._image = this._element.querySelector(".photo-grid__picture");
    this._cardDescription = this._element.querySelector(".photo-grid__text")
  }

  _isThereLike() {
    return !!this.data.likes.find((element) => element._id === this.myId);
  } // сравниваю Id, проверяю есть ли лайк в массиве лайков

  showLikeStatus() {
    this._likeCounter.textContent = this.data.likes.length;

    if (this._isThereLike()) {
      this._likeButton.classList.add("photo-grid__like_active");
    } else {
      this._likeButton.classList.remove("photo-grid__like_active");
    }
  } // обновляю статус лайка на странице

  _setEventListeners(apiToggleLike, apiDeleteCard) {
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard(this.data._id);
    });

    this._image.addEventListener("click", () => {
      this.handleCardClick(this._image)
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this.data._id, this._isThereLike());
    });
  }

  _delButtonNotOwnerRemover() {
    if (this.data.owner._id !== this.myId) {
      this._deleteButton.remove();
    }
  }

  deleteCard() {
    this._element.remove()
  }

  toggleDeleteButton() {
    this._deleteButton.disabled = this._deleteButton.disabled !== true;
  }

  createNewCard() {
    this._getElement();
    this._findInnerElements();
    this._cardDescription.textContent = this.data.name;
    this._image.src = this.data.link;
    this._image.alt = this.data.name;
    this.showLikeStatus(this._element, this.data.likes, this.myId);
    this._delButtonNotOwnerRemover()
    this._setEventListeners();
    return this._element;
  } // создание карточки
}
