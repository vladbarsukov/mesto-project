import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._element.querySelector(".popup__form");
    this.submitButton = this._form.querySelector(".popup__submit");
  }

  _getInputValues() {
    return this._form.elements;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitButton.disabled = true;
      this.submitButton.textContent = "Сохраняю...";
      this._submitCallback(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

