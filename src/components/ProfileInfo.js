import {jobInput, nameInput, profileJob, profileTitle} from "./modal";
import API from './api.js';

export default class Profile {
    constructor({nameInput, jobInput}) {
        this._nameInput = nameInput;
        this._jobInput = jobInput;
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
