
const showInputError = (inputElement, errorMessage, formElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(validationSettings.errorClass);
  inputElement.classList.add(validationSettings.inputErrorClass);
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.pattern;
  } else {
    errorElement.textContent = errorMessage;
  }
}; // показываю текст с ошибкой

const hideInputError = (inputElement, formElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(validationSettings.errorClass);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.textContent = "";
}; // скрываю текст с ошибкой

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; // проверяю поле ввода на наличие ошибок

const toggleButtonState = (inputList, button, validationSettings) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(validationSettings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.disabled = false;
    button.classList.remove(validationSettings.inactiveButtonClass);
  }
}; // отключаю кнопку при наличии ошибки

const isValid = (inputElement, formElement, validationSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, formElement, validationSettings);
  } else {
    hideInputError(inputElement, formElement, validationSettings);
  }
}; // показываю и скрываю текст с ошибкой

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputList));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, formElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
}; // вешаю слушатели всем инпутам

const enableValidation = (validationSettings) => {
  const formsList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formsList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
}; // включение валидации

function validateBeforeOpenPopup (formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputList));
  inputList.forEach((inputElement) => {
    inputElement.value = ""
    hideInputError(inputElement, formElement, validationSettings);
  });
} // валидация и очистка поля при открытии модального окна

export { isValid, enableValidation, toggleButtonState, validateBeforeOpenPopup };