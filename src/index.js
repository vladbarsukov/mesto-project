import "/pages/index.css";

import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

import {
  formAddCard,
  formEditAvatar,
  // addDefaultEditPopupData,
  formEditProfile,
  profileName,
  profession,
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
let myId = null;

const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationSettings, formAddCard);
formAddCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(validationSettings, formEditAvatar);
formEditAvatarValidator.enableValidation();

export const api = new Api(config);

export const userInfo = new UserInfo(userDataSelectors)

const popupAddCard = new PopupWithForm("#popupAddCard", ([ link, name ]) => {
  // в линк попадает нейм
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
  userInfo.setUserInfo(name, about, api.pushDataProfile.bind(api), popupEditProfile)
  // api.pushDataProfile(name, about)
  //   .then((data) => {
  //     profileName.textContent = data.name;
  //     profession.textContent = data.about;
  //   })
  //   .then(() => {
  //     popupEditProfile.close();
  //   })
  //   .finally(() => {
  //     popupEditProfile.submitButton.textContent = "Сохранить";
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
popupEditProfile.setEventListeners();

const popupProfileImage = new PopupWithForm("#popupProfileImage", (imgSrc) => {
  userInfo.setAvatar(imgSrc[0], api.pushDataAvatar.bind(api), popupProfileImage)
  // api.pushDataAvatar(imgSrc[0])
  //   .then((data) => {
  //
  //     avatar.src = data.avatar;
  //   })
  //   .then(() => {
  //     popupProfileImage.close();
  //   })
  //   .finally(() => {
  //     popupProfileImage.submitButton.textContent = "Сохранить";
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
popupProfileImage.setEventListeners();

const popupPhoto = new PopupWithImage("#popupPhoto");
popupPhoto.setEventListeners();

api.getAllData()
  .then(([cards, userData]) => {
    profileName.textContent = userData.name;
    profession.textContent = userData.about;
    avatar.src = userData.avatar;
    myId = userData._id;

    cardList = new Section({
      renderer: (item) => {
        const card = new Card({
          data: item, 
          myId: myId, 
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
  userInfo.getUserInfo(api.getData.bind(api))
    .then((userData) => {
      nameInput.value = userData.name;
      jobInput.value = userData.about;
    })
  // addDefaultEditPopupData();
  popupEditProfile.open();
  // toggleButtonState(allInputsEditProfile, addButton, validationSettings);
})

avatarContainer.addEventListener("mousedown", () => {
  // validateBeforeOpenPopup(formElementEditAvatar, validationSettings)
  formEditAvatarValidator.clearValidation()
  popupProfileImage.open();
  // toggleButtonState(allAvatarInputs, avatarAddButton, validationSettings);
}) // слушатель открытия окна смены аватара

export {validationSettings}