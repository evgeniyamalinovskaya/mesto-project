import { deletePopup } from "./card";
import { validationConfig } from "./index.js";

const buttonEscKey = 27;

// Универсальная функция открытия всех popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscUp);
    popup.addEventListener('mousedown', handleClickOverlay);
}

//Функция на overlay
const handleClickOverlay = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup();
    }
};

//Функция на esc
const handleEscUp = (evt) => {
    if (evt.keyCode === buttonEscKey) {
        closePopup();
    }
};

// Универсальная функция закрытия всех popup по нажатию на esc, overlay, крестик
function closePopup() {
    const popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscUp);
    popupOpened.removeEventListener('mousedown', handleClickOverlay);
    if (popupOpened.classList.contains('popup_delete')) {
        deletePopup.dataset.IdToDelete ='';
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

export {openPopup, closePopup, clearForm};