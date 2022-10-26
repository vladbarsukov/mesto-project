export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(".popup__close-button");
    this._isOpened = false;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      if (this._isOpened) {
        this.close();
      }
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened") && this._isOpened) {
      this.close();
    }
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlayClick);
    this._isOpened = true;
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlayClick);
    this._isOpened = false;
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
  }
}