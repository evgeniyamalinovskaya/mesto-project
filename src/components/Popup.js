import { deletePopup } from "./card";
import { validationConfig } from "./index.js";

const buttonEscKey = 27;

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

// Универсальная функция открытия всех popup
    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscUp);
        this._popup.addEventListener('mousedown', this._handleClickOverlay);
    }

//Функция на overlay
    _handleClickOverlay = (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
            this.closePopup(this._popup);
        }
    };

//Функция на esc
    _handleEscUp = (evt) => {
        if (evt.keyCode === buttonEscKey) {
            this.closePopup(this._popup);
        }
    };

// Универсальная функция закрытия всех popup по нажатию на esc, overlay, крестик
    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscUp);
        this._popup.removeEventListener('mousedown', this._handleClickOverlay);
        if (this._popup.classList.contains('popup_delete')) {
            deletePopup.dataset.IdToDelete = '';
        }
    }
}

// Функция очистки поля в форме карточки
    function clearForm(popup) {
    const form = popup.querySelector('form');
    if (form) {
        const errorTextList = form.querySelectorAll('.popup__error');
        const errorInputList = form.querySelectorAll('.popup__item');

        errorInputList.forEach(errorInputElement => {
            this._hideInputElement(errorInputElement, validationConfig)
            errorInputElement.value = "";

        });

        errorTextList.forEach(errorTextElement => {
            this._hideErrorElement(errorTextElement, validationConfig)
            errorTextElement.value = "";
        });
    }
}
