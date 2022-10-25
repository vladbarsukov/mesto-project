import {
  avatar,
  avatarEditIcon,
} from "../utils/constants"

function avatarEditShow() {
  avatar.classList.add("profile__image_opacity");
  avatarEditIcon.classList.add("profile__edit-icon_active");
} // затемнение аватара

function avatarEditHide() {
  avatar.classList.remove("profile__image_opacity");
  avatarEditIcon.classList.remove("profile__edit-icon_active");
} // затемнение аватара

export {avatarEditShow, avatarEditHide};
