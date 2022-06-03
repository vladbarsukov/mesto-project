//Открытие двух попапов
const openButtonEditProfile = document.querySelector(".profile__edit-button");
const closeButtonEditProfile = document.querySelector(".popup__close-button");
const popupEditProfile = document.querySelector("#popupEditProfile");
const openButtonAddCard = document.querySelector(".profile__add-button");
const closeButtonAddCard = document.querySelector("#closeButtonAddCard");
const popupButtonAddCard = document.querySelector("#popupAddCard");

function openButton(popup) {
  popup.classList.add("popup_opened");
}

function addDefaultEditPopupData(popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
}

function closeButton(popup) {
  popup.classList.remove("popup_opened");
}

openButtonEditProfile.addEventListener("click", function () {
  addDefaultEditPopupData(popupEditProfile);
  openButton(popupEditProfile);
});

closeButtonEditProfile.addEventListener("click", () => closeButton(popupEditProfile));

openButtonAddCard.addEventListener("click", () => openButton(popupButtonAddCard));

closeButtonAddCard.addEventListener("click", () => closeButton(popupButtonAddCard));

//Редактирование Профиля

const formElementEditProfile = document.querySelector("#form");
const nameInput = formElementEditProfile.name;
const jobInput = formElementEditProfile.profession;
const profileName = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__description");

function formEditeProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  closeButton(popupEditProfile);
}

formElementEditProfile.addEventListener("submit", formEditeProfileSubmitHandler);

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

const cardTemplate = document.querySelector("#card-template").content;
const cardSection = document.querySelector(".photo-grid");
const imageItem = document.querySelector(".photo-grid");

function deleteCard(e) {
  e.target.closest(".photo-grid__item").remove();
}

initialCards.forEach(addCard);

function addCard(data) {
  const card = createNewCard(data);
  cardSection.prepend(card);
}

function createNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  let cardImg = cardElement.querySelector(".photo-grid__picture");
  cardImg.addEventListener("click", openImg);
  const delButton = cardElement.querySelector(".photo-grid__del-button");
  cardElement.querySelector(".photo-grid__text").textContent = data.name;
  cardElement.querySelector(".photo-grid__picture").src = data.link;
  cardElement.querySelector(".photo-grid__picture").alt = data.name;
  toggleLike(cardElement);
  delButton.addEventListener("click", deleteCard);
  return cardElement;
}

const formAddPhoto = document.querySelector("#formAddPhoto");

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

const popupImage = document.querySelector("#popupPhoto");
const img = document.querySelector(".popup__photo");
const imgDescription = document.querySelector(".popup__photo-title");

function openImg() {
  openButton(popupImage)
  imageItem.addEventListener("click", function (evt) {
    const imgSrc = evt.target.src;
    img.src = imgSrc;
    imgDescription.textContent = evt.target.nextElementSibling.textContent;
    img.alt = imgDescription.textContent;
  });
}

const cardImg = document.querySelector(".photo-grid__picture");

cardImg.addEventListener("click", () => openImg);

const closeImg = document.querySelector("#closeButtonPhotoCard");

closeImg.addEventListener("click", () => closeButton(popupImage));
// функция лайка
function toggleLike(e) {
  e.querySelector(".photo-grid__like").addEventListener("click", function (e) {
    e.target.classList.toggle("photo-grid__like_active");
  });
}