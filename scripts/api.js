import {profileName, profession, formAddPhoto} from './modal_window.js'
import {addCard} from './card.js'
let avatar = document.querySelector('.profile__image');
let myId = null;

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
};

function getData() {
return  fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me ', {
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'
    }
  })
    // .then(res => res.json())
    // .then((data) => {
    //   profileName.textContent = data.name
    //   profession.textContent = data.about
    //   avatar.src = data.avatar
    //   myId = data._id
    //   // console.log(myId)
    // })
   .then(onResponce);
} //получаю данные профиля с сервера

function getCard() {
 return  fetch('https://nomoreparties.co/v1/plus-cohort-15/cards ', {
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'
    }
  })
    // .then(res => res.json())
    // .then((data) => {
    //   console.log(myId)
    //   data.reverse().forEach(addCard);
    // })
    .then(onResponce);
} //получаю карточки с сервера

function pushDataProfile(name, prof) {
  fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: prof,
    })
  })
    .then(res => res.json())

    .then((data) => {
      profileName.textContent = data.name
      profession.textContent = data.about
    });
} //отправляю данные профиля на сервер

function pushDataAvatar(link) {
  fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link,
    })
  })
    .then(res => res.json())

    .then((data) => {
      avatar.src = data.avatar
    });
} //отправляю данные профиля на сервер

function pushCard(cardLink, cardName) {
  fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
    method: 'POST',
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      link: cardLink,
      name: cardName,
    })
 })
    .then(res => res.json())

    .then((data) => {
      console.log(data)
    });
}

function deleteCard(link) {
  fetch('https://nomoreparties.co/v1/plus-cohort-15/cards/632753d556becd00574228fb', {
    method: 'DELETE',
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
      'Content-Type': 'application/json'
    },

  })
    .then(res => res.json())

    .then((data) => {
      console.log(data)
    });
}

function getAllData() {
  return Promise.all([getCard(), getData()])
}
// deleteCard()
// pushCard()
// getData()
// getCard()
getAllData()
  .then(([cards, data]) => {
    profileName.textContent = data.name
    profession.textContent = data.about
    avatar.src = data.avatar
    myId = data._id
    // cards.reverse().forEach(addCard);
    cards.reverse().forEach((element) =>{
      addCard(element, myId);
    });
  })
export {pushDataProfile, pushDataAvatar, pushCard, myId, };

