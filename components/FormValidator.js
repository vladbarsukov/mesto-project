export default class FormValidator {
  constructor(validationSettings, formEl) {
    this._settings = validationSettings;
    this._formElement = formEl;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputList));
    this._submitBtn = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);

    if (inputElement.validity.patternMismatch) {
      errorElement.textContent = inputElement.dataset.pattern;
    } else {
      errorElement.textContent = errorMessage;
    }
  }; // показываю текст с ошибкой

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
  }; // скрываю текст с ошибкой

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; // проверяю поле ввода на наличие ошибок

  _toggleButtonState() {
    this._hasInvalidInput() ? this.disableSubmitButton() : this.enableSubmitButton();
  }; // отключаю кнопку при наличии ошибки

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; // показываю и скрываю текст с ошибкой

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }; // вешаю слушатели всем инпутам

  enableValidation() {
    this._setEventListeners();
  }; // включение валидации

  disableSubmitButton() {
    this._submitBtn.disabled = true;
  }

  enableSubmitButton() {
    this._submitBtn.disabled = false;
  }

  setSubmitButtonText(text) {
    this._submitBtn.textContent = text;
  }

  clearValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.value = "";
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  } // валидация и очистка поля при открытии модального окна
}
