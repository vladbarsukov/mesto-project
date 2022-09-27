import { pushDataProfile, pushDataAvatar } from "./api.js";
import { avatar } from "./avatar.js";
import { isValid } from "./validate.js";

const formAddPhoto = document.forms.formAddPhoto;
const formElementEditAvatar = document.forms.formAvatar;
const popupButtonAddCard = document.querySelector("#popupAddCard");
const popupEditProfile = document.querySelector("#popupEditProfile");
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
const formsList = Array.from(document.querySelectorAll(".popup__form"));

let handleClosePopupKeydownEscape; // функция для добавления и удаления слушателя на закрытие модального окна по кнопке esc

function handleOpenPopup(popup) {

  handleClosePopupKeydownEscape = function (evt)  {
    const CloseButton = function ()  {
      handleCloseButton(popup)
    }
    if(evt.key === 'Escape') {
      return  CloseButton()
    }
  }
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleClosePopupKeydownEscape)

} // функция открытия попапа

function handleCloseButton (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleClosePopupKeydownEscape)
} //функция закрытия попапа

function addDefaultEditPopupData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  isValid(nameInput, formElementEditProfile);
  isValid(jobInput, formElementEditProfile);
} // значение по умолчанию в попапе с данными профиля

function saveMessage(button) {
  button.textContent = "Сохранение...";
} // изменение текста кнопки в модальном окне во время отправки данных

function HandlerEditeProfileSubmit(evt) {
  evt.preventDefault();
  saveMessage(addButton);
  pushDataProfile(nameInput.value, jobInput.value)
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

function HandlerEditeAvatar(evt) {
  evt.preventDefault();
  saveMessage(avatarAddButton);
  pushDataAvatar(avatarInput.value)
    .then((data) => {
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
  formElementEditAvatar.reset();
} //добавление значения с сервера в попап с аватаром

export {
  formAddPhoto,
  popupButtonAddCard,
  profileName,
  profession,
  addButton,
  popupEditProfile,
  allInputsEditProfile,
  handleOpenPopup,
  handleCloseButton,
  addDefaultEditPopupData,
  popupEditAvatar,
  allAvatarInputs,
  avatarAddButton,
  formElementEditProfile,
  HandlerEditeProfileSubmit,
  HandlerEditeAvatar,
  saveMessage,
  formElementEditAvatar,
  formsList
};