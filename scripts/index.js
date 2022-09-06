//Открытие двух попапов
// const openButtonEditProfile = document.querySelector(".profile__edit-button");
// const closeButtonEditProfile = document.querySelector(".popup__close-button");
// const openButtonAddCard = document.querySelector(".profile__add-button");
// const closeButtonAddCard = document.querySelector("#closeButtonAddCard");
const popupButtonAddCard = document.querySelector("#popupAddCard");
const popupEditProfile = document.querySelector("#popupEditProfile");
const cardTemplate = document.querySelector("#card-template").content;
const cardSection = document.querySelector(".photo-grid");
const formAddPhoto = document.forms.formAddPhoto;
const formElementEditProfile = document.forms.formProfile;
const nameInput = formElementEditProfile.name;
const jobInput = formElementEditProfile.profession;
const allInputEditProfile =  Array.from(formElementEditProfile.querySelectorAll(".popup__input"));
const formAddPhotoAllInputs = Array.from(formAddPhoto.querySelectorAll(".popup__input"))
const allInputs = Array.from(document.querySelectorAll(".popup__input"));
const cardNameInput = formAddPhoto.namePlace;
const cardLinkInput = formAddPhoto.linkPicture;
const addButton = formElementEditProfile.querySelector(".popup__submit");
const addButtonPhoto = formAddPhoto.querySelector(".popup__submit");
const errorMessage = formElementEditProfile.querySelector(".popup__input-error_name");
const errorMessageProf = formElementEditProfile.querySelector(".popup__input-error_job");
const errorMessagePlace = formAddPhoto.querySelector(".popup__input-error_place");
const errorMessageLink = formAddPhoto.querySelector(".popup__input-error_link");
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
}

function closeButton(popup) {
  popup.classList.remove("popup_opened");
}

function addDefaultEditPopupData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  isValid(nameInput, errorMessage)
  isValid(jobInput, errorMessageProf)
}

// openButtonEditProfile.addEventListener("click", function () {
//   addDefaultEditPopupData();
//   openButton(popupEditProfile);
// });

// closeButtonEditProfile.addEventListener("click", () => closeButton(popupEditProfile));

// openButtonAddCard.addEventListener("click", () => openButton(popupButtonAddCard));

// closeButtonAddCard.addEventListener("click", () => closeButton(popupButtonAddCard));

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
    toggleButtonState(formAddPhotoAllInputs, addButtonPhoto)
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
})
// закрытие попапов кнопкой

document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape') {
    console.log(1)
    closeButton(popupEditProfile)
    closeButton(popupButtonAddCard)
    closeButton(popupImage)
    hideValidationErrorAfterClosePopup()
    formAddPhoto.reset()
  }
})

//Редактирование Профиля

// const formElementEditProfile = document.querySelector("#form");





// Делаю карточки темплейтом
// массив с начальными карточками из задания





initialCards.forEach(addCard);

function addCard(data) {
  const card = createNewCard(data);
  cardSection.prepend(card);
}

// функция лайка(всплытие) и удаление карточки(всплытие)
function toggleLike(evt) {
  evt.classList.toggle("photo-grid__like_active")
}

function deleteCard(evt) {
  evt.parentElement.remove();
  console.dir(evt)
}

// cardSection.addEventListener('click', function (evt) {
//   if(evt.target.classList.contains('photo-grid__like')){
//     toggleLike(evt.target)
//   }
//   if(evt.target.classList.contains('photo-grid__del-button')){
//     deleteCard(evt.target)
//   }
//   if(evt.target.classList.contains('photo-grid__picture')){
//    openImg(evt)
//   }
// })

function createNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".photo-grid__text").textContent = data.name;
  cardElement.querySelector(".photo-grid__picture").src = data.link;
  cardElement.querySelector(".photo-grid__picture").alt = data.name;
  return cardElement;
}



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
});

// попап с фото


// const cardImg = document.querySelector(".photo-grid__picture");
// const closeImg = document.querySelector("#closeButtonPhotoCard");

function openImg(evt) {
  openButton(popupImage)
  getCardData(evt)
}

function getCardData(evt) {
  imgDescription.textContent = evt.target.nextElementSibling.textContent;
  img.src = evt.target.src;
  img.alt = imgDescription.textContent;
}

// closeImg.addEventListener("click", () => closeButton(popupImage));


// закрытие попапа по клику мимо
// const popupPhotoContainer = document.querySelector(".popup__photo-content");
// const popupEditContainer = document.querySelector("#popupEditProfileContainer");
// const popupAddCardContainer = document.querySelector("#popupAddCardContainer");
//
// function closePopup(evt, container, isClassActive) {
//   const target = evt.target;
//   const its_popup = target === container || container.contains(target);
//   const popup_is_active = isClassActive.classList.contains("popup_opened");
//
//   if (!its_popup && popup_is_active) {
//     closeButton(isClassActive);
//   }
// }

// popupImage.addEventListener("click", (evt) => closePopup(evt, popupPhotoContainer, popupImage));
// popupEditProfile.addEventListener("click", (evt) => closePopup(evt, popupEditContainer, popupEditProfile));
// popupButtonAddCard.addEventListener("click", (evt) => closePopup(evt, popupAddCardContainer, popupButtonAddCard));



// ВАЛИДАЦИЯ ФОРМЫ


function formEditeProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  closeButton(popupEditProfile);

}


//VALIDATION
/////////////////////////////////////////////


 console.dir(cardNameInput)
const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input-error_active')
  element.textContent = errorMessage;
};

const hideInputError = (element) => {
  element.classList.remove('popup__input-error_active');
  element.textContent = '';
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__submit_disabled');
    button.disabled = true
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('popup__submit_disabled');
  }
};

const isValid = (input, element) => {
  if (!input.validity.valid) {
    showInputError(element, input.validationMessage);
    console.log(input.validationMessage)
  } else {
    hideInputError(element);
  }
};

// allInputs.forEach(element =>{
//   console.log(element)
//   element.addEventListener('input', function () {
//     isValid(cardLinkInput, errorMessageLink)
//     isValid(cardNameInput, errorMessagePlace)
//     isValid(jobInput, errorMessageProf)
//     isValid(nameInput, errorMessage)
//     toggleButtonState(formAddPhotoAllInputs, addButtonPhoto)
//     toggleButtonState(allInputEditProfile, addButton)
// });
//
// })


jobInput.addEventListener('input', function (evt) {
  isValid(jobInput, errorMessageProf)
  toggleButtonState(allInputEditProfile, addButton)
});

nameInput.addEventListener('input', function (evt) {
  isValid(nameInput, errorMessage)
  toggleButtonState(allInputEditProfile, addButton)
});


cardNameInput.addEventListener('input', function (evt) {
  isValid(cardNameInput, errorMessagePlace)
  toggleButtonState(formAddPhotoAllInputs, addButtonPhoto)
});

cardLinkInput.addEventListener('input', function (evt) {
  isValid(cardLinkInput, errorMessageLink)
  toggleButtonState(formAddPhotoAllInputs, addButtonPhoto)
});

function hideValidationErrorAfterClosePopup() {
  errorMessagePlace.classList.remove('popup__input-error_active');
  errorMessageLink.classList.remove('popup__input-error_active');
}

formElementEditProfile.addEventListener("submit", formEditeProfileSubmitHandler);

