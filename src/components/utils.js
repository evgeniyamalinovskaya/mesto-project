import {clearCardForm} from './modal.js';

let activePopup = document.querySelector('.popup_opened');
const buttonEscKey = 27;

// Универсальная функция открытия всех popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscUp);
    popup.addEventListener('click', handleClickOverlay);
    // Очищаем форму карточки
    clearCardForm();
}

//Функция на overlay
const handleClickOverlay = (evt) => {
    activePopup = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        evt.preventDefault();
        closePopup(activePopup);
    }
};

//Функция на esc
const handleEscUp = (evt) => {
    activePopup = document.querySelector('.popup_opened');
    if (evt.keyCode === buttonEscKey) {
        evt.preventDefault();
        closePopup(activePopup);
    }
};

// Универсальная функция закрытия всех popup по нажатию на esc, overlay, крестик
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscUp);
    popup.removeEventListener('click',handleClickOverlay);
    clearCardForm();
}

export {openPopup, closePopup};