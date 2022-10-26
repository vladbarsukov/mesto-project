import "/pages/index.css";

import {
  config,
  validationSettings,
  userDataSelectors,
  formAddCard,
  formEditAvatar,
  formEditProfile,
  profileAddButton,
  profileEditButton,
  nameInput,
  jobInput,
  avatarContainer,
} from "../utils/constants";

import Api from "../components/Api";
import Card from "../components/card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";

import {
  avatarEditShow,
  avatarEditHide,
} from "../components/avatar"


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

const popupPhoto = new PopupWithImage("#popupPhoto");

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupProfileImage.setEventListeners();
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