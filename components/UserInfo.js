export default class UserInfo {
  constructor(userDataSelectors) {
    this.name = document.querySelector(`${userDataSelectors.nameSelector}`);
    this.profession = document.querySelector(`${userDataSelectors.professionSelector}`);
    this.avatar = document.querySelector(`${userDataSelectors.avatar}`);
    this.userData = {name: this.name.textContent, about: this.profession.textContent}
  }

  getUserInfo() {
    return this.userData;
  }

  setUserInfo(name, about, api) {
   return api(name, about)
    .then((userData) => {
      this.fillUserInfo(userData);
    })
  }

  setAvatar(imgSrc, api) {
   return api(imgSrc)
    .then((data) => {
      this.avatar.src = data.avatar;
    })
  }

  fillUserInfo(userData) {
    this.name.textContent = userData.name;
    this.profession.textContent = userData.about;
    this.userData.name = userData.name;
    this.userData.about = userData.about;
  }

  updateAvatar(userData) {
    this.avatar.src = userData.avatar;
  }
}
