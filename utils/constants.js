export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
    'Content-Type': 'application/json',
  },
};

export const validationSettings = {
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_error",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputList: ".popup__input",
};

export const userDataSelectors = {
  nameSelector: ".profile__name",
  professionSelector: ".profile__description",
  avatar: ".profile__image",
  addButton: ".popup__submit",
}

export const formAddCard = document.querySelector("form[name='formAddPhoto']");
export const formEditAvatar = document.querySelector("form[name='formAvatar']");
export const formEditProfile = document.querySelector("form[name='formProfile']");
export const nameInput = formEditProfile.name;
export const jobInput = formEditProfile.profession;
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const avatarContainer = document.querySelector(".profile__image-container");
