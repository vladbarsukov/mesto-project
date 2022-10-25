
export default class UserInfo {
  constructor(userDataSelectors) {
    this.name = document.querySelector(`${userDataSelectors.nameSelector}`);
    this.profession = document.querySelector(`${userDataSelectors.professionSelector}`);
    this.avatar = document.querySelector(`${userDataSelectors.avatar}`);
  }

  getUserInfo(api) {
    return api();
  }

  setUserInfo(name, about, api, popup) {
    api(name, about)
      .then((userData) => {
        this.name.textContent = userData.name;
        this.profession.textContent = userData.about;
      })
      // .finally(() => {
      //   addButton.textContent = "Сохранить";
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      .then(() => {
        popup.close();
      })
      .finally(() => {
        popup.submitButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  setAvatar(imgSrc, api, popup) {
    api(imgSrc)
      .then((data) => {
        this.avatar.src = data.avatar;
      })
      .then(() => {
        popup.close();
      })
      .finally(() => {
        popup.submitButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
