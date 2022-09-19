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
   .then(onResponce);
} //получаю данные профиля с сервера

function getCard() {
 return  fetch('https://nomoreparties.co/v1/plus-cohort-15/cards ', {
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'
    }
  })
    .then(onResponce);
} //получаю карточки с сервера

function pushDataProfile(name, prof) {
 return  fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
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


} //отправляю данные профиля на сервер

function pushDataAvatar(link) {
 return  fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link,
    })
  })

} //отправляю данные профиля на сервер

function pushCard(cardLink, cardName) {
 return  fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
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

}

function deleteCardFromServer(id) {
 return  fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',
      'Content-Type': 'application/json'
    },
  })
}

function getAllData() {
  return Promise.all([getCard(), getData()])
}




// deleteCardFromServer("63287e8f56becd005743aefa")

getAllData()
  .then(([cards, data]) => {
    console.log(cards)
    profileName.textContent = data.name
    profession.textContent = data.about
    avatar.src = data.avatar
    myId = data._id
    // cards.reverse().forEach(addCard);
    cards.reverse().forEach((element) =>{
      addCard(element, myId);
    });
  })
export {pushDataProfile, pushDataAvatar, pushCard, myId, deleteCardFromServer, onResponce, avatar};

