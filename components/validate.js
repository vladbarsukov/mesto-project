const formElementEditAvatar = document.forms.formAvatar;
const formAddPhoto = document.forms.formAddPhoto;
const errorMessagePlace = formAddPhoto.querySelector(".popup__input-place-error");
const errorMessageLink = formAddPhoto.querySelector(".popup__input-link-error");
const errorMessageLinkAvatar = formElementEditAvatar.querySelector(".popup__input-avatar-error")
const formsList = Array.from(document.querySelectorAll(".popup__form"));




const showInputError = (inputElement, errorMessage, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add("popup__input-error_active");
  inputElement.classList.add("popup__input_error");
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.pattern;
  } else {
    errorElement.textContent = errorMessage;
  }
}; // показываю текст с ошибкой

const hideInputError = (inputElement, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove("popup__input-error_active");
  inputElement.classList.remove("popup__input_error");
  errorElement.textContent = "";
}; // скрываю текст с ошибкой

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; // проверяю поле ввода на наличие ошибок

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add("popup__submit_disabled");
    button.disabled = true;
  } else {
    button.removeAttribute("disabled");
    button.classList.remove("popup__submit_disabled");
  }
}; // отключаю кнопку при наличии ошибки

const isValid = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, formElement);
  } else {
    hideInputError(inputElement, formElement);
  }
}; // показываю и скрываю текст с ошибкой

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; // вешаю слушатели всем инпутам

const enableValidation = (formsList) => {
  formsList.forEach((formElement) => {
    // formElement.addEventListener("submit", (evt) => {
    //   evt.preventDefault();
    // });
    setEventListeners(formElement);
  });
}; // включение валидации

function hideValidationErrorAfterClosePopup() {
  errorMessagePlace.classList.remove("popup__input-error_active");
  errorMessageLink.classList.remove("popup__input-error_active");
  errorMessageLinkAvatar.classList.remove("popup__input-error_active");
  // errorMessagePlace.classList.remove("popup__input_error");
  // errorMessageLink.classList.remove("popup__input_error_active");
  // errorMessageLinkAvatar.classList.remove("popup__input_error_active");
} // скрываю валидацию после закрытия попапа



export { isValid, enableValidation, hideValidationErrorAfterClosePopup, toggleButtonState, formAddPhoto, formElementEditAvatar, formsList};
