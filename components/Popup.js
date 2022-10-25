const formAddCard = document.forms.formAddPhoto;
const formEditAvatar = document.forms.formAvatar;
const popupButtonAddCard = document.querySelector("#popupAddCard");
const popupEditAvatar = document.querySelector("#popupProfileImage");
const formEditProfile = document.forms.formProfile;
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.profession;
const profileName = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__description");
const allInputsEditProfile = Array.from(formEditProfile.querySelectorAll(".popup__input"));
const allAvatarInputs = Array.from(formEditAvatar.querySelectorAll(".popup__input"));
const avatarAddButton = formEditAvatar.querySelector(".popup__submit");
const addButton = formEditProfile.querySelector(".popup__submit");

export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(".popup__close-button");
    this._isOpened = false;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  _handleEscClose(evt) {
    // console.log("esc");
    if (evt.key === "Escape") {
      if (this._isOpened) {
        this.close();
      }
    }
  }

  _handleOverlayClick(evt) {
    // console.log("overlay");
    if (evt.target.classList.contains("popup_opened") && this._isOpened) {
      this.close();
    }
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlayClick);
    this._isOpened = true;
  } // функция открытия попапа

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlayClick);
    this._isOpened = false;
  } //функция закрытия попапа

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
  }
}

// function addDefaultEditPopupData() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profession.textContent;
// } // значение по умолчанию в попапе с данными профиля

function saveMessage(button) {
  button.textContent = "Сохранение...";
} // изменение текста кнопки в модальном окне во время отправки данных


export {
  formAddCard,
  popupButtonAddCard,
  profileName,
  profession,
  addButton,
  allInputsEditProfile,
  // addDefaultEditPopupData,
  popupEditAvatar,
  allAvatarInputs,
  avatarAddButton,
  formEditProfile,
  saveMessage,
  formEditAvatar,
  nameInput,
  jobInput
};