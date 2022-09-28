import '/pages/index.css';

import {
  popupEditProfile,
  popupButtonAddCard,
  popupEditAvatar,
  formAddPhoto,
  handleOpenPopup,
  addDefaultEditPopupData,
  allInputsEditProfile,
  addButton,
  allAvatarInputs,
  avatarAddButton,
  formElementEditProfile,
  HandlerEditeProfileSubmit,
  HandlerEditeAvatar,
  handleCloseButton,
  profileName,
  profession,
  formElementEditAvatar,
} from '../components/modal.js'

import {
  enableValidation,
  toggleButtonState,
  validateBeforeOpenPopup
} from '../components/validate.js'

import {
  popupImage,
  addNewCard,
  addCard,
} from '../components/card.js'

import {
  avatarContainer,
  avatarEditShow,
  avatarEditHide,
  avatar,
} from '../components/avatar.js'

import {getAllData,} from "../components/api.js";

const profileAddButton = document.querySelector(".profile__add-button")
const profileEditButton = document.querySelector(".profile__edit-button")
const validationSettings = {
  formSelector: ".popup__form",
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_error",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputList: ".popup__input",
}

let myId = null

getAllData()
  .then(([cards, data]) => {
    profileName.textContent = data.name
    profession.textContent = data.about
    avatar.src = data.avatar
    myId = data._id
    console.log(data._id)
    cards.reverse().forEach((element) => {
      addCard(element, myId);
    })
  })
  .catch((err) => {
    console.log(err);
  }) // получаю все данные с сервера

avatarContainer.addEventListener('mouseover', avatarEditShow) // слушатель на затемнение аватара при наведении курсора
avatarContainer.addEventListener('mouseout', avatarEditHide) // слушатель на затемнение аватара при наведении курсора

formElementEditProfile.addEventListener("submit", HandlerEditeProfileSubmit); // слушатель для добавления значения с сервера в попап с именем
formElementEditAvatar.addEventListener("submit", HandlerEditeAvatar); // слушатель для добавления значения с сервера в попап с именем

formAddPhoto.addEventListener("submit", (element) => {
  element.preventDefault();
  addNewCard(myId)
  element.target.reset();
}); // создание карточки из попапа

enableValidation(validationSettings); //подключение валидации функция принимает на вход только список форм для обработки остальное
//я вычисляю из списка форм внутри функции

popupImage.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup__close-button')) {
    handleCloseButton(popupImage)
  }

  if(evt.target.classList.contains('popup_opened')){
    handleCloseButton(popupImage)
  }
})     //  слушатель карточек


profileAddButton.addEventListener('mousedown', function () {
  validateBeforeOpenPopup(formAddPhoto, validationSettings, validationSettings)
  handleOpenPopup(popupButtonAddCard)

})

profileEditButton.addEventListener('mousedown', function () {
  addDefaultEditPopupData();
  handleOpenPopup(popupEditProfile);
  toggleButtonState(allInputsEditProfile, addButton, validationSettings)
})

avatarContainer.addEventListener('mousedown', () => {
  validateBeforeOpenPopup(formElementEditAvatar, validationSettings)
  handleOpenPopup(popupEditAvatar);
  toggleButtonState(allAvatarInputs, avatarAddButton, validationSettings)
}) // слушатель открытия окна смены аватара

popupEditProfile.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup_opened')){
    handleCloseButton(popupEditProfile)
  }
  if(evt.target.classList.contains('popup__close-button')) {
    handleCloseButton(popupEditProfile)
  }
})

popupButtonAddCard.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup_opened')){
    handleCloseButton(popupButtonAddCard)
  }
  if(evt.target.classList.contains('popup__close-button')) {
    handleCloseButton(popupButtonAddCard)
  }
})

popupEditAvatar.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup_opened')){
    handleCloseButton(popupEditAvatar)
  }
  if(evt.target.classList.contains('popup__close-button')) {
    handleCloseButton(popupEditAvatar)
  }
})
export {validationSettings}