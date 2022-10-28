export default class Card {
  constructor({data, myId, handleCardClick}) {
    this.data = data;
    this.myId = myId;
    this.handleCardClick = handleCardClick;
  }

  _getElement() {
    return document.querySelector("#card-template").content.querySelector('.photo-grid__item').cloneNode(true);
  }

  _findInnerElements() {
    this.likeButton = this._cardElement.querySelector(".photo-grid__like");
    this.deleteButton = this._cardElement.querySelector(".photo-grid__del-button");
    this.image = this._cardElement.querySelector(".photo-grid__picture");
    this.cardDescription = this._cardElement.querySelector(".photo-grid__text")
  }

  _isThereLike(likeArr, myId) {
    return !!likeArr.find((element) => element._id === myId);
  } // сравниваю Id, проверяю есть ли лайк в массиве лайков

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

  _handleLikeShowStatus(id, isThereLike, cardElement, myId, apiToggleLike) {
   return apiToggleLike(id, isThereLike)
      .then((data) => {
        this._showLikeStatus(cardElement, data.likes, myId);
      })
      .catch((err) => {
        console.log(err);
      });
  }; // обновляю статус лайка на сервере

  _deleteCard(cardEl, cardId, apiDeleteCard) {
    this.deleteButton.disabled = true;
    return apiDeleteCard(cardId)
      .then(() => {
        cardEl.remove();
      })
      .catch((err) => {
        console.log(err);
        this.deleteButton.disabled = false;
      })
  } // удаление карточки

  _setEventListeners(apiToggleLike, apiDeleteCard) {
    this.deleteButton.addEventListener("click", () => {
      this._deleteCard(this._cardElement, this.data._id, apiDeleteCard);
    });

    this.image.addEventListener("click", () => {
      this.handleCardClick(this.image)
    });

    this.likeButton.addEventListener("click", () => {
      this._handleLikeShowStatus(this.data._id, this.likeButton.classList.contains("photo-grid__like_active"), this._cardElement, this.myId, apiToggleLike);
    });
  }

  _delButtonNotOwnerRemover() {
    if (this.data.owner._id !== this.myId) {
      this.deleteButton.remove();
    }
  }

  createNewCard(apiToggleLike, apiDeleteCard) {
    this._cardElement = this._getElement();
    this._findInnerElements();
    this.image.owner = `${this.data._id}`;
    this.cardDescription.textContent = this.data.name;
    this.image.src = this.data.link;
    this.image.alt = this.data.name;
    this._showLikeStatus(this._cardElement, this.data.likes, this.myId);
    this._delButtonNotOwnerRemover()
    this._setEventListeners(apiToggleLike, apiDeleteCard);
    return this._cardElement;
  } // создание карточки
}
