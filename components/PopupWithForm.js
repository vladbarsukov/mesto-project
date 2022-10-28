import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submitCallback }) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._element.querySelector(".popup__form");
  }

  _getInputValues() {
    const formElements = Array.from(this._form.elements);
    const formInputValues = {};

    formElements.forEach((el) => {
      formInputValues[el.name] = el.value;
    })

    return formInputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

