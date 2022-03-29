import {formAvatar} from "../components/modal";

export const forms = Array.from(document.querySelectorAll('.form'));
export const cardContainer ='.elements__list';
export const deletePopup = document.querySelector('.popup_delete');
export const popupWithImage = '.popup_image';

// Переменные popup редактирования профиля
const formElement = document.querySelector('form[name="form-info"]');
export const nameInput = formElement.querySelector('input[name="username"]');
export const jobInput = formElement.querySelector('input[name="about"]');

//Селекторы разметки на странице
export const selectors = {
    profileTitle: '.profile__title',
    profileJob: '.profile__subtitle',
    profileAvatar: '.profile__avatar-image'    
}

export const ways = {
    profile: '/users/me',
    cards: '/cards',
    cardsDelete: '/cards/',
    cardsLikes: '/cards/likes/',
    avatar: '/users/me/avatar'
}

//Информация (ссылка, токен, группа, тип данных)
export const apiConfig = {
    url: 'https://nomoreparties.co/v1/plus-cohort7', //ссылка
    headers: {
        authorization: '41dbe325-3fa7-4285-bba8-932cc50cf0e5', // токен
        'Content-Type': 'application/json' //тип данных для создания
    }
}
// Объекты валидации
export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__item',
    inputErrorClass: 'popup__item_invalid',
    errorClass: 'popup__error_visible',
    buttonSelector: '.popup__submit',
    buttonDisabledClass: 'popup__submit_disabled',
}

