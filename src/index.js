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
  formEditeProfileSubmitHandler,
  formEditeAvatarHandler,
  closeButton,
  profileName,
  profession
} from '../components/modal_window.js'

import {
  hideValidationErrorAfterClosePopup,
  enableValidation,
  toggleButtonState,
  formElementEditAvatar,
} from '../components/validation.js'

import {
  openImg,
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

let myId = null

getAllData()
  .then(([cards, data]) => {
    profileName.textContent = data.name
    profession.textContent = data.about
    avatar.src = data.avatar
    myId = data._id
    cards.reverse().forEach((element) => {
      addCard(element, myId);
    })
  })
  .catch((err) => {
    console.log(err);
  }) // получаю все данные с сервера

avatarContainer.addEventListener('mouseover', avatarEditShow) // слушатель на затемнение аватара при наведении курсора
avatarContainer.addEventListener('mouseout', avatarEditHide) // слушатель на затемнение аватара при наведении курсора

formElementEditProfile.addEventListener("submit", formEditeProfileSubmitHandler); // слушатель для добавления значения с сервера в попап с именем
formElementEditAvatar.addEventListener("submit", formEditeAvatarHandler); // слушатель для добавления значения с сервера в попап с именем

formAddPhoto.addEventListener("submit", (element) => {
  element.preventDefault();
  addNewCard(myId)
  element.target.reset();
}); // создание карточки из попапа

enableValidation(); //подключение валидации

document.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup__close-button')) {
    closeButton(popupImage)
  }

  if(evt.target.classList.contains('photo-grid__picture')){
    openImg(evt)
  }
  if(evt.target.classList.contains('popup_opened')){
    closeButton(popupImage)
  }
})     //  слушатель карточек

document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape') {
    closeButton(popupImage)
  }
})   // слушатель на закрытие по esc

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
    handleOpenPopup(popupButtonAddCard)

  }
  if(evt.target.classList.contains('profile__edit-button')) {
    addDefaultEditPopupData();
    handleOpenPopup(popupEditProfile);
    toggleButtonState(allInputsEditProfile, addButton)
  }
  if(evt.target.classList.contains('popup_opened')){
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupEditAvatar)
    hideValidationErrorAfterClosePopup()
    formAddPhoto.reset()
    formElementEditAvatar.reset()

  }
})     // один большой слушатель модальных окон

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

avatarContainer.addEventListener('mousedown', (evt) => {
  addDefaultEditPopupData();
  handleOpenPopup(popupEditAvatar);
  toggleButtonState(allAvatarInputs, avatarAddButton)
}) // слушатель открытия окна смены аватара