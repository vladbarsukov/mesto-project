const avatarContainer = document.querySelector(".profile__image-container");
const avatarEditIcon = document.querySelector(".profile__edit-icon");
const avatar = document.querySelector(".profile__image");

function avatarEditShow() {
  avatar.classList.add("profile__image_opacity");
  avatarEditIcon.classList.add("profile__edit-icon_active");
} // затемнение аватара

function avatarEditHide() {
  avatar.classList.remove("profile__image_opacity");
  avatarEditIcon.classList.remove("profile__edit-icon_active");
} // затемнение аватара

export { avatarContainer, avatarEditShow, avatarEditHide, avatar };
