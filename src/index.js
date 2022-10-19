import '/pages/index.css';

import Popup from "../components/Popup";

import {
  popupButtonAddCard,
  popupEditAvatar,
  formAddPhoto,
  addDefaultEditPopupData,
  allInputsEditProfile,
  addButton,
  allAvatarInputs,
  avatarAddButton,
  formElementEditProfile,
  HandlerEditProfileSubmit,
  HandlerEditAvatar,
  profileName,
  profession,
  formElementEditAvatar,
} from '../components/Popup'

import Validate from "../components/Validate";

import {
  popupImage,
  addNewCard,
  Card,
  openImg,
} from '../components/card'

import {
  avatarContainer,
  avatarEditShow,
  avatarEditHide,
  avatar,
} from '../components/avatar'

import Section from '../components/Section'

import {
  Api, config} from "../components/api";

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popups = document.querySelectorAll('.popup');

const validationSettings = {
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_error",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputList: ".popup__input",
};

const imageFormValidate = new Validate(validationSettings, formAddPhoto);
imageFormValidate.enableValidation();

const popupAddCard = new Popup('#popupAddCard');
popupAddCard.setEventListeners();

const popupEditProfile = new Popup('#popupEditProfile');
popupEditProfile.setEventListeners();

const popupProfileImage = new Popup('#popupProfileImage');
popupProfileImage.setEventListeners();

let myId = null;

export const api = new Api(config);

api.getAllData()
  .then(([cards, userData]) => {
    profileName.textContent = userData.name;
    profession.textContent = userData.about;
    avatar.src = userData.avatar;
    myId = userData._id;

    const cardList = new Section({
      renderer: (item) => {
        const card = new Card({data: item, myId: myId, openImg: openImg});
        cardList.setItem(card.createNewCard())}
    }, ".photo-grid");

    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  }) // получаю все данные с сервера

avatarContainer.addEventListener('mouseover', avatarEditShow); // слушатель на затемнение аватара при наведении курсора
avatarContainer.addEventListener('mouseout', avatarEditHide); // слушатель на затемнение аватара при наведении курсора

formElementEditProfile.addEventListener("submit", HandlerEditProfileSubmit); // слушатель для добавления значения с сервера в попап с именем
formElementEditAvatar.addEventListener("submit", HandlerEditAvatar); // слушатель для добавления значения с сервера в попап с именем

formAddPhoto.addEventListener("submit", (element) => {
  element.preventDefault();
  addNewCard(myId)
  element.target.reset();
}); // создание карточки из попапа

// enableValidation(validationSettings);
//подключение валидации функция принимает на вход только список форм для обработки остальное
//я вычисляю из списка форм внутри функции

profileAddButton.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  imageFormValidate.clearValidation();
  popupAddCard.open();
  // handleOpenPopup(popupButtonAddCard);
})

profileEditButton.addEventListener('mousedown', function () {
  addDefaultEditPopupData();
  popupEditProfile.open();
  // toggleButtonState(allInputsEditProfile, addButton, validationSettings);
})

avatarContainer.addEventListener('mousedown', () => {
  // validateBeforeOpenPopup(formElementEditAvatar, validationSettings)
  popupProfileImage.open();
  // toggleButtonState(allAvatarInputs, avatarAddButton, validationSettings);
}) // слушатель открытия окна смены аватара

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       handleCloseButton(popup)
//     }
//     if (evt.target.classList.contains('popup__close-button')) {
//       handleCloseButton(popup)
//     }
//   })
// })

export {validationSettings}