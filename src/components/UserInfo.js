// Отвечает за управление информацией о пользователе на странице
export default class UserInfo {
    constructor({profileTitle, profileJob, profileAvatar}, {name, about, avatar}) {
        this._profileTitle = document.querySelector(profileTitle);
        this._profileJob = document.querySelector(profileJob);
        this._profileAvatar = document.querySelector(profileAvatar);
        this._name = name;
        this._about = about;
        this._avatar = avatar
    }

//Метод возвращает объект с данными пользователя
    getUserInfo() {
        return {
            // Возвращает значения из разметки(профиля)
            name: this._profileTitle.textContent,
            about: this._profileJob.textContent,
            avatar: this._profileAvatar.src
        }
    }

//Метод принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    setUserInfo = () => {
        //Принимает новые значения
        this._profileTitle.textContent = this._name;
        this._profileJob.textContent = this._about;   
    }

    setUserAvatar = () => {
        this._profileAvatar.src = this._avatar;
    };
}

// Открытие формы, изменение данных профиля
// profileEditButton.addEventListener('click', () => {
//     this.editProfileInfo()
// });