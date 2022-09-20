import {formAddPhoto, popupButtonAddCard} from './modal_window.js'
import {pushCard, myId, onResponce, deleteCardFromServer, toggleLikeInServer} from './api.js'
const cardSection = document.querySelector(".photo-grid");
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


const handleLikeChangeStatus = (id, isLike, cardElement) => {
  toggleLikeInServer(id, isLike)
    .then((data) => {
      // console.log(data.likes)
      // console.log(cardElement)
      updateLikeStatus(cardElement, data.likes, myId)
    })

    .catch((err) => {
    console.log(err)
  })
}

function isLike (likeArr, myId) {
 return Boolean(likeArr.find((element) => {
  return element._id === myId
 }
 ))
}// сравниваю id, проверяю есть ли лайк в массиве лайков

function updateLikeStatus (cardElement, likeArr, myId) {
  const likeButton = cardElement.querySelector(".photo-grid__like")
  const likeCounter = cardElement.querySelector(".photo-grid__like-counter")
  // console.log(likeArr)
  // console.log(likeCounter)
  // console.log(likeArr.length)
  likeCounter.textContent = likeArr.length;
  // console.log(likeCounter.textContent)
  // console.log(likeCounter.textContent)

  if(isLike(likeArr, myId)) {
    likeButton.classList.add("photo-grid__like_active")
  } else {
    likeButton.classList.remove("photo-grid__like_active")
  }

}

function addCard(data, myId) {
  // console.log(myId)
  const card = createNewCard(data, myId, handleLikeChangeStatus);
  cardSection.prepend(card);
} //// функция добавления карточки из массива на страницу

// cards.forEach(addCard); // добавляю карточки из массива на страницу

// function toggleLike(evt) {
//   evt.classList.toggle("photo-grid__like_active")
// }  // переключение лайка карточки

function deleteCard(evt) {
  deleteCardFromServer(evt.parentElement.children[1].owner)
    .then(() => {
      evt.parentElement.remove();
      console.dir(evt.parentElement.children[1].owner)
    })
      // evt.parentElement.remove();
}  // удаление карточки

function createNewCard(data, myId, handleLikeChangeStatus) {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".photo-grid__like")

  const card = cardElement.querySelector(".photo-grid__item")
  // console.log(likeButton)
  // console.log(data.owner._id === myId)
  // console.log(data._id)
  // console.dir(delButtonId)
  cardElement.querySelector(".photo-grid__picture").owner = `${data._id}`
  cardElement.querySelector(".photo-grid__text").textContent = data.name;
  cardElement.querySelector(".photo-grid__picture").src = data.link;
  cardElement.querySelector(".photo-grid__picture").alt = data.name;
  // cardElement.querySelector(".photo-grid__like-counter").textContent = data.likes.length;
  updateLikeStatus(cardElement, data.likes, myId)
  if (data.owner._id !== myId) {
    cardElement.querySelector(".photo-grid__del-button").remove()
  }
likeButton.addEventListener("click", () => {
  handleLikeChangeStatus(data._id, likeButton.classList.contains('photo-grid__like_active'), card)
});
  return cardElement;
}  // создание карточки



formAddPhoto.addEventListener("submit", (element) => {
  element.preventDefault();
  addNewCard()
  closeButton(popupButtonAddCard);
  element.target.reset();
}); // создание карточки из попапа

// function addNewCard() {
//   const newCard = {
//     name: "",
//     link: "",
//   };
//   newCard.name = formAddPhoto.namePlace.value;
//   newCard.link = formAddPhoto.linkPicture.value;
//   pushCard(newCard.link, newCard.name)
//     .then(() => {
//        addCard(newCard, myId);
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }



function addNewCard() {
  // const newCard = {
  //   name: "",
  //   link: "",
  // };
  // newCard.name = formAddPhoto.namePlace.value;
  // newCard.link = formAddPhoto.linkPicture.value;
  pushCard(formAddPhoto.linkPicture.value, formAddPhoto.namePlace.value)
    .then((data) => {
      addCard(data, myId);
    })
    .catch((err) => {
      console.log(err)
    })
}


// попап с фото

function openImg(evt) {
  openButton(popupImage)
  getCardData(evt)
} // открытие попапа с фото

function getCardData(evt) {
  imgDescription.textContent = evt.target.alt;
  img.src = evt.target.src;
  img.alt = imgDescription.textContent;
} // получение данных из попапа для добавления новой карточки

document.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains('popup__close-button')) {
    closeButton(popupImage)
  }
  // if(evt.target.classList.contains('photo-grid__like')){
  //   toggleLike(evt.target)
  //   // likeChecker (id, IfLike)
  // }
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


export {addCard};
