// Отвечает за управление информацией о пользователе на странице
export default class UserInfo {
    constructor(nameInput, jobInput, imageAvatar) {
        this.nameInput = nameInput;
        this.jobInput = jobInput;
        this.avatar = imageAvatar;
    }

//Метод возвращает объект с данными пользователя
    getUserInfo() {
        return {
           name: this.nameInput.textContent,
           about:this.jobInput.textContent,
           avatar: this.avatar
       }
    }

//Метод принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    setUserInfo() {
        // Подставляем значения из профиля
        this.nameInput.textContent = this.nameInput;
        this.jobInput.textContent = this.jobInput;
        this._id = _id;
    }

    setUserAvatar = () => {
        this.avatar.src = this.avatar;
    };
}

// Открытие формы, изменение данных профиля
// profileEditButton.addEventListener('click', () => {
//     this.editProfileInfo()
// });