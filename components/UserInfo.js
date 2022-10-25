export default class UserInfo {
  constructor(userDataSelectors) {
    this.name = document.querySelector(`${userDataSelectors.nameSelector}`);
    this.profession = document.querySelector(`${userDataSelectors.professionSelector}`);
    this.avatar = document.querySelector(`${userDataSelectors.avatar}`);
  }

  getUserInfo(api) {
    return api();
  }

  setUserInfo(name, about, api) {
   return  api(name, about)
      .then((userData) => {
        this.fillUserInfo(userData)
      })
  }
  setAvatar(imgSrc, api) {
   return  api(imgSrc)
      .then((data) => {
        this.avatar.src = data.avatar;
      })
  }

  fillUserInfo(userData) {
    this.name.textContent = userData.name;
    this.profession.textContent = userData.about;
  }
  updateAvatar(userData) {
    this.avatar.src = userData.avatar
  }
}
