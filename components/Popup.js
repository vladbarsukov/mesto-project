import { avatar } from "./avatar.js";
import { api } from "../src/index";

const formAddPhoto = document.forms.formAddPhoto;
const formElementEditAvatar = document.forms.formAvatar;
const popupButtonAddCard = document.querySelector("#popupAddCard");
// const popupEditProfile = document.querySelector("#popupEditProfile");
const popupEditAvatar = document.querySelector("#popupProfileImage");
const formElementEditProfile = document.forms.formProfile;
const nameInput = formElementEditProfile.name;
const jobInput = formElementEditProfile.profession;
const avatarInput = formElementEditAvatar.linkAvatar;
const profileName = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__description");
const allInputsEditProfile = Array.from(formElementEditProfile.querySelectorAll(".popup__input"));
const allAvatarInputs = Array.from(formElementEditAvatar.querySelectorAll(".popup__input"));
const avatarAddButton = formElementEditAvatar.querySelector(".popup__submit");
const addButton = formElementEditProfile.querySelector(".popup__submit");

export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(".popup__close-button");
    this._isOpened = false;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      if (this._isOpened) {
        this.close();
      }
    }
  }

  open() {
    this._element.classList.add("popup_opened");
    this._isOpened = true;
    document.addEventListener('keydown', this._handleEscClose.bind(this));

  } // функция открытия попапа

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
    this._isOpened = false;
  } //функция закрытия попапа

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));

    document.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}

function addDefaultEditPopupData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
} // значение по умолчанию в попапе с данными профиля

function saveMessage(button) {
  button.textContent = "Сохранение...";
} // изменение текста кнопки в модальном окне во время отправки данных

function HandlerEditProfileSubmit(evt) {
  evt.preventDefault();
  saveMessage(addButton);
  api.pushDataProfile(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profession.textContent = data.about;
    })
    .then(() => {
      handleCloseButton(popupEditProfile);
    })
    .finally(() => {
      addButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
} //добавление значения с сервера в попап с именем

function HandlerEditAvatar(evt) {
  evt.preventDefault();
  saveMessage(avatarAddButton);
  api.pushDataAvatar(avatarInput.value)
    .then((data) => {
      formElementEditAvatar.reset();
      avatar.src = data.avatar;
    })
    .then(() => {
      handleCloseButton(popupEditAvatar);
    })
    .finally(() => {
      avatarAddButton.textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    });
} //добавление значения с сервера в попап с аватаром

export {
  formAddPhoto,
  popupButtonAddCard,
  profileName,
  profession,
  addButton,
  // popupEditProfile,
  allInputsEditProfile,
  addDefaultEditPopupData,
  popupEditAvatar,
  allAvatarInputs,
  avatarAddButton,
  formElementEditProfile,
  HandlerEditProfileSubmit,
  HandlerEditAvatar,
  saveMessage,
  formElementEditAvatar,
};