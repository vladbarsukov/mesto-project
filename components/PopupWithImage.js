import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open({ img, title }) {
    const photo = this._element.querySelector(".popup__photo");
    const photoTitle = this._element.querySelector(".popup__photo-title");
    
    if (!photo || !photoTitle) {
      return;
    }

    photo.src = img;
    photoTitle.textContent = title;
    super.open();
  }
}