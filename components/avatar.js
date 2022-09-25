import {avatar} from './api.js'

const avatarContainer = document.querySelector('.profile__image-container');
const avatarEditIcon = document.querySelector('.profile__edit-icon');


function avatarEditShow () {
  avatar.style.opacity = "0.2"
  avatarEditIcon.classList.add('profile__edit-icon_active')
}

function avatarEditHide () {
  avatar.style.opacity = "1"
  avatarEditIcon.classList.remove('profile__edit-icon_active')
}



export {avatarContainer, avatarEditIcon, avatarEditShow, avatarEditHide};