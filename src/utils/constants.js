export const formInfo = document.querySelector('#form-info');
export const formCard = document.querySelector('#form-card');
export const formAvatar = document.querySelector('#form-avatar');
export const cardContainer ='.elements__list';

//Селекторы кнопок как элемент разметки
export const buttons = {
    profile: document.querySelector('.profile__edit-button'),
    card: document.querySelector('.profile__add-button'),
    avatar: document.querySelector('.profile__avatar-button')
}
//Переменные попапов
export const popups = {
    profile: '.popup_profile',
    card: '.popup_card',
    avatar: '.popup_avatar',
    delete: '.popup_delete',
    image: '.popup_image'
}

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

