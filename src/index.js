// import '/pages/index.css';

import {
  profileName,
  profession,
  popupEditProfile,
  popupButtonAddCard,
  popupEditAvatar,
  formAddPhoto,
  formElementEditAvatar,
  hideValidationErrorAfterClosePopup,
  openButton,
  addDefaultEditPopupData,
  toggleButtonState,
  allInputEditProfile,
  addButton,
  allAvatarInput,
  avatarAddButton,
  enableValidation,
  formElementEditProfile, formEditeProfileSubmitHandler, formEditeAvatarHandler, closeButton, saveMessage
} from '../components/modal_window.js'
import {
  addCard,
  // closeButton,
  // deleteCard,
  openImg,
  popupImage,
  addNewCard,
} from '../components/card.js'
// import {avatar, myId, getAllData} from "./components/api.js";
// import {avatar, getAllData} from "./components/api.js";

// let myId = null
//
// getAllData()
//   .then(([cards, data]) => {
//     profileName.textContent = data.name
//     profession.textContent = data.about
//     avatar.src = data.avatar
//     myId = data._id
//     cards.reverse().forEach((element) => {
//       addCard(element, myId);
//     })
//   })
//   .catch((err) => {
//     console.log(err);
//   })

formElementEditProfile.addEventListener("submit", formEditeProfileSubmitHandler); // слушатель для добавления значения с сервера в попап с именем
formElementEditAvatar.addEventListener("submit", formEditeAvatarHandler); // слушатель для добавления значения с сервера в попап с именем

formAddPhoto.addEventListener("submit", (element) => {
  element.preventDefault();
  addNewCard()
  // closeButton(popupButtonAddCard);
  element.target.reset();
}); // создание карточки из попапа

enableValidation(); //подключение валидации

document.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup__close-button')) {
    closeButton(popupImage)
  }

  // if(evt.target.classList.contains('photo-grid__del-button')){
  //   deleteCard(evt.target)
  // }
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

// export {myId};