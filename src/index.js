import "/pages/index.css";

import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

import {
  formAddCard,
  formEditAvatar,
  formEditProfile,
  nameInput,
  jobInput,
} from "../components/Popup"

import FormValidator from "../components/FormValidator";
import Card from "../components/card"

import {
  avatarContainer,
  avatarEditShow,
  avatarEditHide,
  avatar,
} from "../components/avatar"

import Section from "../components/Section"

import {
  Api, config} from "../components/Api";
import UserInfo from "../components/UserInfo";

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const validationSettings = {
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_error",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputList: ".popup__input",
};

const userDataSelectors = {
  nameSelector: ".profile__name",
  professionSelector: ".profile__description",
  avatar: ".profile__image",
  addButton: ".popup__submit",
}

let cardList;

const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationSettings, formAddCard);
formAddCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(validationSettings, formEditAvatar);
formEditAvatarValidator.enableValidation();

export const api = new Api(config);

export const userInfo = new UserInfo(userDataSelectors)

const popupAddCard = new PopupWithForm("#popupAddCard", ([ link, name ]) => {
  api.pushCard(name, link)
    .then((data) => {
      console.log(name)
      cardList.renderItem(data);
    })
    .then(() => {
      popupAddCard.close();
    })
    .finally(() => {
      popupAddCard.submitButton.textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    });
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm("#popupEditProfile", ([ name, about ]) => {
  userInfo.setUserInfo(name, about, api.pushDataProfile.bind(api))
      .then(() => {
        popupEditProfile.close();
      })
      .finally(() => {
        popupEditProfile.submitButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });

});
popupEditProfile.setEventListeners();

const popupProfileImage = new PopupWithForm("#popupProfileImage", (imgSrc) => {
  userInfo.setAvatar(imgSrc[0], api.pushDataAvatar.bind(api))
    .then(() => {
      popupProfileImage.close();
    })
    .finally(() => {
      popupProfileImage.submitButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
});
popupProfileImage.setEventListeners();

const popupPhoto = new PopupWithImage("#popupPhoto");
popupPhoto.setEventListeners();

api.getAllData()
  .then(([cards, userData]) => {
    userInfo.fillUserInfo(userData)
    userInfo.updateAvatar(userData)
    cardList = new Section({
      renderer: (item) => {
        const card = new Card({
          data: item, 
          myId: userData._id,
          openImg: () => {
            popupPhoto.open({
              img: item.link,
              title: item.name,
            });
          }
        });
        cardList.setItem(card.createNewCard())}
    }, ".photo-grid");
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  }) // получаю все данные с сервера

avatarContainer.addEventListener("mouseover", avatarEditShow); // слушатель на затемнение аватара при наведении курсора
avatarContainer.addEventListener("mouseout", avatarEditHide); // слушатель на затемнение аватара при наведении курсора

//подключение валидации функция принимает на вход только список форм для обработки остальное
//я вычисляю из списка форм внутри функции

profileAddButton.addEventListener("mousedown", function (evt) {
  evt.preventDefault();
  formAddCardValidator.clearValidation();
  popupAddCard.open();
})

profileEditButton.addEventListener("mousedown", function () {
  formEditProfileValidator.clearValidation()
  userInfo.getUserInfo(api.getData.bind(api))
    .then((userData) => {
      nameInput.value = userData.name;
      jobInput.value = userData.about;
    })
  popupEditProfile.open();
})

avatarContainer.addEventListener("mousedown", () => {
  formEditAvatarValidator.clearValidation()
  popupProfileImage.open();
}) // слушатель открытия окна смены аватара

export {validationSettings}