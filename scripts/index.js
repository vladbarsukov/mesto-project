const popupButtonAddCard = document.querySelector("#popupAddCard");
const popupEditProfile = document.querySelector("#popupEditProfile");
const cardTemplate = document.querySelector("#card-template").content;
const cardSection = document.querySelector(".photo-grid");
const formAddPhoto = document.forms.formAddPhoto;
const formElementEditProfile = document.forms.formProfile;
const nameInput = formElementEditProfile.name;
const jobInput = formElementEditProfile.profession;
const allInputEditProfile =  Array.from(formElementEditProfile.querySelectorAll(".popup__input"));
const addButton = formElementEditProfile.querySelector(".popup__submit");
const errorMessagePlace = formAddPhoto.querySelector(".popup__input_place-error");
const errorMessageLink = formAddPhoto.querySelector(".popup__input_link-error");
const profileName = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__description");
const popupImage = document.querySelector("#popupPhoto");
const img = document.querySelector(".popup__photo");
const imgDescription = document.querySelector(".popup__photo-title");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openButton(popup) {
  popup.classList.add("popup_opened");
}  // функция открытия попапа

function closeButton(popup) {
  popup.classList.remove("popup_opened");
}  //функция закрытия попапа

function addDefaultEditPopupData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  isValid(nameInput, formElementEditProfile)
  isValid(jobInput, formElementEditProfile)

}

document.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup__close-button')) {
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupImage)
    formAddPhoto.reset()
    hideValidationErrorAfterClosePopup()

  }
  if(evt.target.classList.contains('profile__add-button')) {
    openButton(popupButtonAddCard)

  }
  if(evt.target.classList.contains('profile__edit-button')) {
    addDefaultEditPopupData();
    openButton(popupEditProfile);
    toggleButtonState(allInputEditProfile, addButton)
  }
  if(evt.target.classList.contains('photo-grid__like')){
    toggleLike(evt.target)
  }
  if(evt.target.classList.contains('photo-grid__del-button')){
    deleteCard(evt.target)
  }
  if(evt.target.classList.contains('photo-grid__picture')){
   openImg(evt)
  }
  if(evt.target.classList.contains('popup_opened')){
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupImage)
    hideValidationErrorAfterClosePopup()
    formAddPhoto.reset()
  }
})     // один большой слушатель на все
// закрытие попапов кнопкой

document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape') {
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupImage)
    hideValidationErrorAfterClosePopup()
    formAddPhoto.reset()
  }
})   // один большой слушатель на закрытие по esc

function addCard(data) {
  const card = createNewCard(data);
  cardSection.prepend(card);
} //// функция добавления карточки из массива на страницу

initialCards.forEach(addCard); // добавляю карточки из массива на страницу

function toggleLike(evt) {
  evt.classList.toggle("photo-grid__like_active")
}  // переключение лайка карточки

function deleteCard(evt) {
  evt.parentElement.remove();
}  // удаление карточки

function createNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".photo-grid__text").textContent = data.name;
  cardElement.querySelector(".photo-grid__picture").src = data.link;
  cardElement.querySelector(".photo-grid__picture").alt = data.name;
  return cardElement;
}  // создание карточки

formAddPhoto.addEventListener("submit", (element) => {
  element.preventDefault();
  const newCard = {
    name: "",
    link: "",
  };
  newCard.name = formAddPhoto.namePlace.value;
  newCard.link = formAddPhoto.linkPicture.value;
  addCard(newCard);
  closeButton(popupButtonAddCard);
  element.target.reset();
}); // создание карточки из попапа

// попап с фото

function openImg(evt) {
  openButton(popupImage)
  getCardData(evt)
} // открытие попапа с фото

function getCardData(evt) {
  imgDescription.textContent = evt.target.nextElementSibling.textContent;
  img.src = evt.target.src;
  img.alt = imgDescription.textContent;
} // получение данных из попапа для добавления новой карточки

// ВАЛИДАЦИЯ ФОРМЫ

function formEditeProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  closeButton(popupEditProfile);

} //добавление значения по умолчанию в попап с именем
formElementEditProfile.addEventListener("submit", formEditeProfileSubmitHandler); // слушатель для добавления значения по умолчанию в попап с именем

/////////////////////////////////////////////
//VALIDATION
/////////////////////////////////////////////


const showInputError = (inputElement, errorMessage, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.add('popup__input-error_active')
  errorElement.textContent = errorMessage;
}; // показываю текст с ошибкой

const hideInputError = (inputElement, formElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; // скрываю текст с ошибкой


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; // проверяю поле ввода на наличие ошибок

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__submit_disabled');
    button.disabled = true
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('popup__submit_disabled');
  }
}; // отключаю кнопку при наличии ошибки

const isValid = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, formElement);
  } else {
    hideInputError(inputElement, formElement);
  }
};  // показываю и скрываю текст с ошибкой


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(inputElement, formElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

function hideValidationErrorAfterClosePopup() {
  errorMessagePlace.classList.remove('popup__input-error_active');
  errorMessageLink.classList.remove('popup__input-error_active');
}  // скрываю валидацию после закрытия попапа



