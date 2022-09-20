import {pushDataProfile, pushDataAvatar, avatar} from './api.js'
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
    .then((data) => {
      profileName.textContent = data.name
      profession.textContent = data.about
    })
    .catch((err) => {
      console.log(err)
    })
  closeButton(popupEditProfile);
} //добавление значения с сервера в попап с именем

function formEditeAvatarHandler(evt) {
  evt.preventDefault();
  pushDataAvatar(avatarInput.value)
    .then((data) => {
      avatar.src = data.avatar
    })
    .catch((err) => {
      console.log(err)
    })
  closeButton(popupEditAvatar)
  formElementEditAvatar.reset()
} //добавление значения с сервера в попап с аватаром


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

function hideValidationErrorAfterClosePopup() {
  errorMessagePlace.classList.remove('popup__input-error_active');
  errorMessageLink.classList.remove('popup__input-error_active');
  errorMessageAvatar.classList.remove('popup__input-error_active');
}  // скрываю валидацию после закрытия попапа


export {formAddPhoto,
  popupButtonAddCard,
  profileName,
  profession,
  addButton,
  popupEditProfile,
  allInputEditProfile,
  openButton,
  closeButton,
  addDefaultEditPopupData,
  formElementEditAvatar,
  popupEditAvatar,
  allAvatarInput,
  avatarAddButton,
  hideValidationErrorAfterClosePopup,
  toggleButtonState,
  enableValidation,
  formElementEditProfile,
  formEditeProfileSubmitHandler,
  formEditeAvatarHandler

};