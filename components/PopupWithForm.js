import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._element.querySelector(".popup__form");
    this.submitButton = this._form.querySelector(".popup__submit");
  }

  _getInputValues() {
    const inputList = Array.from(this._element.querySelectorAll(".popup__input"));
    return inputList.map((input) => input.value);
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
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
