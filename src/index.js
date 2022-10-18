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
  Card,
  openImg,
} from '../components/card.js'

import {
  avatarContainer,
  avatarEditShow,
  avatarEditHide,
  avatar,
} from '../components/avatar.js'

import Section from '../components/Section'

import {
  Api, config} from "../components/api.js";

const profileAddButton = document.querySelector(".profile__add-button")
const profileEditButton = document.querySelector(".profile__edit-button")
const popups = document.querySelectorAll('.popup')
const validationSettings = {
  formSelector: ".popup__form",
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_error",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputList: ".popup__input",
}



let myId = null

export const api = new Api(config)
console.log(api.getData())
//////////////


api.getAllData()
  .then(([cards, data]) => {
    profileName.textContent = data.name;
    profession.textContent = data.about;
    avatar.src = data.avatar;
    myId = data._id;
    const cardList = new Section({
      renderer: (item) => {
        const card = new Card({data: item, myId: myId, openImg: openImg});
        cardList.setItem(card.createNewCard())}
    }, ".photo-grid");
    cardList.renderItems(cards)
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

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      handleCloseButton(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      handleCloseButton(popup)
    }
  })
})

export {validationSettings}