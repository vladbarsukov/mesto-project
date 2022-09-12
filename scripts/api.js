import {profileName, profession} from './modal_window.js'
// const profileName = document.querySelector(".profile__name");
// const profession = document.querySelector(".profile__description");

function getData() {
  fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me ', {
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'
    }
  })
    .then(res => res.json())

    .then((data) => {
      console.log(data);
      profileName.textContent = data.name
      profession.textContent = data.about
    });
}

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
      console.log(data.name)
      console.log(profileName.textContent)
    });
}

getData()

export {pushDataProfile};
