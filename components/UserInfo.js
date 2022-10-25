
import {addButton, avatarAddButton,} from "./Popup";




export default class UserInfo {
  constructor (userDataSelectors) {
    this.name = document.querySelector(`${userDataSelectors.nameSelector}`);
    this.profession = document.querySelector(`${userDataSelectors.professionSelector}`);
    this.avatar = document.querySelector(`${userDataSelectors.avatar}`);
  }

  getUserInfo(api) {
    return api()
    //   .then((userData) => {
    //     this.user.name = userData.name;
    //     this.user.about = userData.about;
    //     // this.name.textContent = userData.name;
    //     // this.profession.textContent = userData.about;
    //
    //     return this.user
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // // return this.user
  }
  setUserInfo(name, about, api) {
    api(name, about)
      .then((userData) => {
        this.name.textContent = userData.name;
        this.profession.textContent = userData.about;
      })
      .finally(() => {
        addButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  setAvatar(avatarInput, api) {
    api(avatarInput)
      .then((data) => {
        this.avatar.src = data.avatar;
      })
      .finally(() => {
        avatarAddButton.textContent = "Создать";
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
