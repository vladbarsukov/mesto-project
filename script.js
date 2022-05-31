//Открытие двух попапов
let openButtonEditProfile = document.querySelector(".profile__edit-button");
let closeButtonEditProfile = document.querySelector(".popup__close-button");
let popupEditProfile = document.querySelector("#popupEditProfile");
let openButtonAddCard = document.querySelector(".profile__add-button");
let closeButtonAddCard = document.querySelector("#closeButtonAddCard");
let popupButtonAddCard = document.querySelector("#popupAddCard");

openButtonEditProfile.addEventListener("click", function () {
  popupEditProfile.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
});

closeButtonEditProfile.addEventListener("click", function () {
  popupEditProfile.classList.remove("popup_opened");
});

openButtonAddCard.addEventListener("click", function () {
  popupButtonAddCard.classList.add("popup_opened");
});

closeButtonAddCard.addEventListener("click", function () {
  popupButtonAddCard.classList.remove("popup_opened");
});

//Редактирование Профиля

let formElement = document.querySelector("#form");
let nameInput = formElement.name;
let jobInput = formElement.profession;
let profileName = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__description");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  popupEditProfile.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);

// Делаю карточки темплейтом
// массив с начальными карточками из задания
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

let cardTemplate = document.querySelector("#card-template").content;
let cardSection = document.querySelector(".photo-grid");
let delButton = document.querySelector(".photo-grid__del-button");
let imageItem = document.querySelector(".photo-grid");
let deleteCard = function deleteCard(e) {
  e.target.closest(".photo-grid__item").remove();
};
initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);
  const delButton = cardElement.querySelector(".photo-grid__del-button");
  cardElement.querySelector(".photo-grid__text").textContent = element.name;
  cardElement.querySelector(".photo-grid__picture").src = element.link;
  like(cardElement);
  delButton.addEventListener("click", deleteCard);
  cardSection.append(cardElement);
});

// добавление карточек через попап

let formAddPhoto = document.querySelector("#formAddPhoto");
formAddPhoto.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let name = formAddPhoto.namePlace.value;
  let photo = formAddPhoto.linkPicture.value;
  const newCard = cardTemplate.cloneNode(true);
  const delButton = newCard.querySelector(".photo-grid__del-button");
  like(newCard);
  newCard.querySelector(".photo-grid__text").textContent = name;
  newCard.querySelector(".photo-grid__picture").src = photo;
  cardSection.prepend(newCard);
  delButton.addEventListener("click", deleteCard);
  popupButtonAddCard.classList.remove("popup_opened");
  evt.target.reset();
});

// попап с фото

let popupImage = document.querySelector("#popupPhoto");
let img = document.querySelector(".popup__photo");
let imgDescription = document.querySelector(".popup__photo-title");

function openImg() {
  popupImage.classList.add("popup_opened");
  imageItem.addEventListener("click", function (evt) {
    const imgSrc = evt.target.src;
    img.src = imgSrc;
    imgDescription.textContent = evt.target.nextElementSibling.textContent;
  });
}

let closeImg = document.querySelector("#closeButtonPhotoCard");
closeImg.addEventListener("click", function () {
  popupImage.classList.remove("popup_opened");
});
// функция лайка
function like(e) {
  e.querySelector(".photo-grid__like").addEventListener("click", function (e) {
    e.target.classList.toggle("photo-grid__like_active");
  });
}