import "/pages/index.css";

import {
  apiConfig,
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
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";

const api = new Api(apiConfig);
const userInfo = new UserInfo(userDataSelectors);
const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidator = new FormValidator(validationSettings, formAddCard);
const formEditAvatarValidator = new FormValidator(validationSettings, formEditAvatar);

const popupAddCard = new PopupWithForm("#popupAddCard", ({ namePlace, linkPicture }) => {
  formAddCardValidator.disableSubmitButton();
  formAddCardValidator.setSubmitButtonText("Сохраняю...");

  api.pushCard(linkPicture, namePlace)
    .then((data) => {
      cardList.renderItem(data);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
      formAddCardValidator.enableSubmitButton();
    })
    .finally(() => {
      formAddCardValidator.setSubmitButtonText("Создать");
    });
});

const popupEditProfile = new PopupWithForm("#popupEditProfile", ({ name, profession }) => {
  formEditProfileValidator.disableSubmitButton();
  formEditProfileValidator.setSubmitButtonText("Сохраняю...");

  userInfo.setUserInfo(name, profession, api.pushDataProfile.bind(api))
    .then(() => {
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
      formEditProfileValidator.enableSubmitButton();
    })
    .finally(() => {
      formEditProfileValidator.setSubmitButtonText("Сохранить");
    });
});

const popupProfileImage = new PopupWithForm("#popupProfileImage", ({ linkAvatar }) => {
  formEditAvatarValidator.disableSubmitButton();
  formEditAvatarValidator.setSubmitButtonText("Сохраняю...")

  userInfo.setAvatar(linkAvatar, api.pushDataAvatar.bind(api))
    .then(() => {
      popupProfileImage.close();
    })
    .catch((err) => {
      console.log(err);
      formEditAvatarValidator.enableSubmitButton();
    })
    .finally(() => {
      formEditAvatarValidator.setSubmitButtonText("Сохранить");
    });
});

const popupPhoto = new PopupWithImage("#popupPhoto");

let cardList;

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupProfileImage.setEventListeners();
popupPhoto.setEventListeners();

profileAddButton.addEventListener("mousedown", (evt) => {
  evt.preventDefault();
  formAddCardValidator.clearValidation();
  popupAddCard.open();
})

profileEditButton.addEventListener("mousedown", (evt) => {
  evt.preventDefault();
  formEditProfileValidator.clearValidation();
  let user = userInfo.getUserInfo();
  nameInput.value = user.name;
  jobInput.value = user.about;
  popupEditProfile.open();
})

avatarContainer.addEventListener("mousedown", () => {
  formEditAvatarValidator.clearValidation();
  popupProfileImage.open();
}) // слушатель открытия окна смены аватара

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formEditAvatarValidator.enableValidation();

api.getAllData()
  .then(([cards, userData]) => {
    userInfo.fillUserInfo(userData);
    userInfo.updateAvatar(userData);

    cardList = new Section({
      renderer: (item) => {
        const card = new Card({
          data: item,
          myId: userData._id,
          handleCardClick: () => {
            popupPhoto.open({
              img: item.link,
              title: item.name,
            });
          }
        });
        cardList.setItem(card.createNewCard(api.toggleLikeInServer.bind(api), api.deleteCardFromServer.bind(api)));
      }
    }, ".photo-grid");

    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  }) // получаю все данные с сервера
