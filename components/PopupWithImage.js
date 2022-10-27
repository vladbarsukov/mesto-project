import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._photo = this._element.querySelector(".popup__photo");
    this._photoTitle = this._element.querySelector(".popup__photo-title");
  }

  open({ img, title }) {
    this._photo.src = img;
    this._photoTitle.textContent = title;
    super.open();
  }
}
