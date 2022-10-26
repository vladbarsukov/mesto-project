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

const popupAddCard = new PopupWithForm("#popupAddCard", ([ namePlace, linkPicture ]) => {
  api.pushCard(linkPicture.value, namePlace.value)
    .then((data) => {
      cardList.renderItem(data);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
      popupAddCard.submitButton.disabled = false;
    })
    .finally(() => {
      popupAddCard.submitButton.textContent = "Создать";
    });
});

const popupEditProfile = new PopupWithForm("#popupEditProfile", ([ name, profession ]) => {
  userInfo.setUserInfo(name.value, profession.value, api.pushDataProfile.bind(api))
    .then(() => {
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
      popupEditProfile.submitButton.disabled = false;
    })
    .finally(() => {
      popupEditProfile.submitButton.textContent = "Сохранить";
    });
});

const popupProfileImage = new PopupWithForm("#popupProfileImage", ([ linkAvatar ]) => {
  userInfo.setAvatar(linkAvatar.value, api.pushDataAvatar.bind(api))
    .then(() => {
      popupProfileImage.close();
    })
    .catch((err) => {
      console.log(err);
      popupProfileImage.submitButton.disabled = false;
    })
    .finally(() => {
      popupProfileImage.submitButton.textContent = "Сохранить";
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

  userInfo.getUserInfo(api.getData.bind(api))
    .then((userData) => {
      nameInput.value = userData.name;
      jobInput.value = userData.about;
    })

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

export {api};
