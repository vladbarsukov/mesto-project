import {pushDataProfile, pushDataAvatar} from './api.js'
// import {isValid} from './validation.js'
const popupButtonAddCard = document.querySelector("#popupAddCard");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupEditAvatar = document.querySelector("#popupProfileImage");
const formAddPhoto = document.forms.formAddPhoto;
const formElementEditProfile = document.forms.formProfile;
const formElementEditAvatar = document.forms.formAvatar;
const nameInput = formElementEditProfile.name;
const jobInput = formElementEditProfile.profession;
const avatarInput = formElementEditAvatar.linkAvatar
const profileName = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__description");
const allInputEditProfile =  Array.from(formElementEditProfile.querySelectorAll(".popup__input"));
const allAvatarInput = Array.from(formElementEditAvatar.querySelectorAll(".popup__input"))
const avatarAddButton = formElementEditAvatar.querySelector(".popup__submit");
const addButton = formElementEditProfile.querySelector(".popup__submit");
const errorMessagePlace = formAddPhoto.querySelector(".popup__input_place-error");
const errorMessageLink = formAddPhoto.querySelector(".popup__input_link-error");
const errorMessageAvatar = formElementEditAvatar.querySelector(".popup__input_avatar-error");

function openButton(popup) {
  popup.classList.add("popup_opened");
}  // функция открытия попапа

function closeButton(popup) {
  popup.classList.remove("popup_opened");
}  //функция закрытия попапа

function addDefaultEditPopupData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  isValid(nameInput, formElementEditProfile)
  isValid(jobInput, formElementEditProfile)
}



function formEditeProfileSubmitHandler(evt) {
  evt.preventDefault();
  pushDataProfile(nameInput.value, jobInput.value)
  closeButton(popupEditProfile);
} //добавление значения с сервера в попап с именем

function formEditeAvatarHandler(evt) {
  evt.preventDefault();
  pushDataAvatar(avatarInput.value)
  closeButton(popupEditAvatar)
  formElementEditAvatar.reset()
} //добавление значения с сервера в попап с аватаром


formElementEditProfile.addEventListener("submit", formEditeProfileSubmitHandler); // слушатель для добавления значения с сервера в попап с именем
formElementEditAvatar.addEventListener("submit", formEditeAvatarHandler); // слушатель для добавления значения с сервера в попап с именем



/////////////////////////////////////////////
//VALIDATION
/////////////////////////////////////////////


const showInputError = (inputElement, errorMessage, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.add('popup__input-error_active')
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.pattern;
  } else {
    errorElement.textContent = errorMessage;
  }


}; // показываю текст с ошибкой

const hideInputError = (inputElement, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; // скрываю текст с ошибкой


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; // проверяю поле ввода на наличие ошибок

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__submit_disabled');
    button.disabled = true
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('popup__submit_disabled');
  }
}; // отключаю кнопку при наличии ошибки

const isValid = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, formElement);

  } else {
    hideInputError(inputElement, formElement);
  }
};  // показываю и скрываю текст с ошибкой


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(inputElement, formElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

function hideValidationErrorAfterClosePopup() {
  errorMessagePlace.classList.remove('popup__input-error_active');
  errorMessageLink.classList.remove('popup__input-error_active');
  errorMessageAvatar.classList.remove('popup__input-error_active');
}  // скрываю валидацию после закрытия попапа

document.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup__close-button')) {
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupEditAvatar)
    formAddPhoto.reset()
    formElementEditAvatar.reset()
    hideValidationErrorAfterClosePopup()
  }
  if(evt.target.classList.contains('profile__add-button')) {
    openButton(popupButtonAddCard)

  }
  if(evt.target.classList.contains('profile__edit-button')) {
    addDefaultEditPopupData();
    openButton(popupEditProfile);
    toggleButtonState(allInputEditProfile, addButton)
  }
  if(evt.target.classList.contains('profile__image')) {
    addDefaultEditPopupData();
    openButton(popupEditAvatar);
    toggleButtonState(allAvatarInput, avatarAddButton)

  }
  if(evt.target.classList.contains('popup_opened')){
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupEditAvatar)
    hideValidationErrorAfterClosePopup()
    formAddPhoto.reset()
    formElementEditAvatar.reset()

  }
})     // один большой слушатель на все

document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape') {
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupEditAvatar)
    hideValidationErrorAfterClosePopup()
    formAddPhoto.reset()
    formElementEditAvatar.reset()
  }
})   // один большой слушатель на закрытие по esc


export {formAddPhoto, popupButtonAddCard, profileName, profession, addButton, popupEditProfile, allInputEditProfile, openButton, closeButton, addDefaultEditPopupData};