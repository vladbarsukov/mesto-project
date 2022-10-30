import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submitCallback }) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._element.querySelector(".popup__form");
    this._formElements = Array.from(this._form.elements);
    this._formInputValues = {};
  }

  _getInputValues() {
    this._formElements.forEach((el) => {
      this._formInputValues[el.name] = el.value;
    })

    return this._formInputValues;
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

