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

let userId = null;

const api = new Api(apiConfig);
const userInfo = new UserInfo(userDataSelectors);
const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidator = new FormValidator(validationSettings, formAddCard);
const formEditAvatarValidator = new FormValidator(validationSettings, formEditAvatar);

const cardList = new Section({
  renderer: (cardData) => {
    const card = new Card({
      data: cardData,
      myId: userId,

      handleCardClick: () => {
        popupPhoto.open({
          img: cardData.link,
          title: cardData.name,
        });
      },

      handleLikeClick: (cardId, isThereLike) => {
        api.toggleLikeInServer(cardId, isThereLike)
          .then((data) => {
            card.data.likes = data.likes;
            card.showLikeStatus();
          })
          .catch((err) => {
            console.log(err);
          });
      },

      deleteCard: (cardId) => {
        card.toggleDeleteButton()
        return api.deleteCardFromServer(cardId)
          .then(() => {
            card.deleteCard();
          })
          .catch((err) => {
            console.log(err);
            card.toggleDeleteButton()
          })
      }
    });

    return card.createNewCard();
  }
}, ".photo-grid");

const popupAddCard = new PopupWithForm("#popupAddCard", {
  submitCallback: ({ namePlace, linkPicture }) => {
    formAddCardValidator.disableSubmitButton();
    formAddCardValidator.setSubmitButtonText("Сохраняю...");

    api.pushCard(linkPicture, namePlace)
      .then((data) => {
        cardList.renderItem(data, data.owner._id);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
        formAddCardValidator.enableSubmitButton();
      })
      .finally(() => {
        formAddCardValidator.setSubmitButtonText("Создать");
      });
  }
});

const popupEditProfile = new PopupWithForm("#popupEditProfile", {
  submitCallback: ({ name, profession }) => {
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
  }
});

const popupProfileImage = new PopupWithForm("#popupProfileImage", {
  submitCallback: ({ linkAvatar }) => {
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
  }
});

const popupPhoto = new PopupWithImage("#popupPhoto");

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
  const user = userInfo.getUserInfo();
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
    userId = userData._id;
    userInfo.fillUserInfo(userData);
    userInfo.updateAvatar(userData);
    cardList.renderItems(cards, userData._id);
  })
  .catch((err) => {
    console.log(err);
  }) // получаю все данные с сервера
