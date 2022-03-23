import {jobInput, nameInput, profileJob, profileTitle} from "./modal";
import API from './api.js';

export default class Profile {
    constructor() {
        this._nameInput = document.querySelector('input[name="username"]');
        this._jobInput = document.querySelector('input[name="about"]');
    }

    getProfile() {
        // Открытие формы, изменение данных профиля
        profileEditButton.addEventListener('click', () => {
            this.editProfileInfo()
        });
    }


    editProfileInfo() {
        // Открываем popup
        super.openPopup();

        // Подставляем значения из профиля
        profileTitle.textContent = this._nameInput;
        profileJob.textContent = this._jobInput;
    }
}
