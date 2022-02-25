import {hideErrorElement, hideInputElement, validationConfig} from "./validate";

const buttonEscKey = 27;

// Универсальная функция открытия всех popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscUp);
    popup.addEventListener('click', handleClickOverlay);
}

//Функция на overlay
const handleClickOverlay = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
        clearForm(activePopup)
    }
};

//Функция на esc
const handleEscUp = (evt) => {
    if (evt.keyCode === buttonEscKey) {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
        clearForm(activePopup)
    }
};

// Универсальная функция закрытия всех popup по нажатию на esc, overlay, крестик
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscUp);
    console.log(handleEscUp)
    popup.removeEventListener('click', handleClickOverlay);
}

// Функция очистки поля в форме карточки
function clearForm(popup) {
    const form = popup.querySelector('form');
      if (form) {
        const errorTextList = form.querySelectorAll('.popup__error');
        const errorInputList = form.querySelectorAll('.popup__item');

        errorInputList.forEach(errorInputElement => {
            hideInputElement(errorInputElement, validationConfig)
            errorInputElement.value = "";

        });

        errorTextList.forEach(errorTextElement => {
            hideErrorElement(errorTextElement, validationConfig)
            errorTextElement.value = "";
        });
    }
}

export {openPopup, closePopup, clearForm};