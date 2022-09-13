import {profileName, profession} from './modal_window.js'
let avatar = document.querySelector('.profile__image')

function getData() {
  fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me ', {
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'
    }
  })
    .then(res => res.json())
    .then((data) => {
      profileName.textContent = data.name
      profession.textContent = data.about
      avatar.src = data.avatar
      console.log(data.avatar)
      console.log(data)
    });
}

function getCard() {
  fetch('https://nomoreparties.co/v1/plus-cohort-15/cards ', {
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    });
}

getCard()

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
}
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
}



getData()


export {pushDataProfile, pushDataAvatar};
