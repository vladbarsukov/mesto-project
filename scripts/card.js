import {formAddPhoto, popupButtonAddCard} from './modal_window.js'

const cardSection = document.querySelector(".photo-grid");
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
const cardTemplate = document.querySelector("#card-template").content;
const popupImage = document.querySelector("#popupPhoto");
const imgDescription = document.querySelector(".popup__photo-title");


const img = document.querySelector(".popup__photo");
function openButton(popup) {
  popup.classList.add("popup_opened");
}
function closeButton(popup) {
  popup.classList.remove("popup_opened");
}
/////////////////////
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

document.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup__close-button')) {
    closeButton(popupImage)
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
    closeButton(popupImage)
  }
})     //  слушатель на все

document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape') {
    closeButton(popupImage)
  }
})   // слушатель на закрытие по esc