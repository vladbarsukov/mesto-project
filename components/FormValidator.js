import {validationSettings} from "../utils/constants";

export default class FormValidator {
  constructor(validationSettings, formEl) {
    this._settings = validationSettings;
    this._formElement = formEl;
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; // проверяю поле ввода на наличие ошибок

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._settings.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.disabled = false;
      button.classList.remove(this._settings.inactiveButtonClass);
    }
  }; // отключаю кнопку при наличии ошибки

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, this._formElement, validationSettings);
    } else {
      this._hideInputError(inputElement, this._formElement, validationSettings);
    }
  }; // показываю и скрываю текст с ошибкой

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputList));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement, this._formElement, this._settings);
        this._toggleButtonState(inputList, buttonElement, this._settings);
      });
    });
  }; // вешаю слушатели всем инпутам

  enableValidation() {
    this._setEventListeners(this._formElement, this._settings);
  }; // включение валидации

  clearValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(validationSettings.inputList));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.value = "";
      this._hideInputError(inputElement, this._formElement);
    });
    this._toggleButtonState(inputList, buttonElement)
  } // валидация и очистка поля при открытии модального окна
}