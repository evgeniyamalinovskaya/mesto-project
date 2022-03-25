import '../pages/index.css'; // добавьте импорт главного файла стилей

import { clearForm, openPopup} from './utils.js'; //функции открытия и закрытия popup
import Validator from './Validator.js';
import { Card } from './Cards.js';
import {
    imageAvatar,
    avatarButton,
    avatarChangeProfile,
    formAvatar,
    saveAvatarForm,
    editProfilePopup,
    profileEditButton,
    profileTitle,
    profileJob,
    formElement,
    nameInput,
    jobInput,
    addCardPopup,
    showAddCardPopup,
    formCard,
    saveCardForm,
    saveProfileForm,
    acceptCardDelete,
    formDelete
} from './modal.js';
import Api from './Api.js';
import Section from './Section';
const cardContainer ='.elements__list';
const apiConfig = {
    url: 'https://nomoreparties.co/v1/plus-cohort7', //ссылка
    headers: {
        authorization: '41dbe325-3fa7-4285-bba8-932cc50cf0e5', // токен
        'Content-Type': 'application/json' //тип данных для создания
    }
}
const ways = {
    profile: '/users/me',
    cards: '/cards',
    cardsDelete: '/cards/',
    cardsLikes: '/cards/likes/',
    avatar: '/users/me/avatar'
}

const getInfo = new Api(apiConfig);

// Всё с сервера
Promise.all([getInfo.methodWithoutBody(ways.profile, 'GET'), getInfo.methodWithoutBody(ways.cards, 'GET', '')]) //Функции получения данных Профиля и карточки (возвращает результат выполнения функции fetch)
    .then(([user, cards]) => { // данные
        profileTitle.textContent = user.name;
        profileJob.textContent = user.about;
        imageAvatar.src = user.avatar;
        const standardCards = new Section({            //Отображает все карточки
            items: cards,
            renderer: (item) => {
                const cardToCreate = new Card(item, {                   //константа создаваемой карточки с данными 
                    handleCardClick: () => {console.log('Hi')}  //Функция на клик по карточке
                }, user._id);
                const cardToReturn = cardToCreate.createCard();         //Готовая карточка места
                standardCards.addItem(cardToReturn);    // Добавить созданную карточку в контейнер
            }
        }, cardContainer);
        standardCards.renderItems(); //рендерим все карточки на страницу
    })
    .catch(err => {
        console.log(err);
    });

//Открытие формы, изменения аватарки профиля
avatarButton.addEventListener('click', avatarProfile);

formAvatar.addEventListener('submit', saveAvatarForm);

function avatarProfile() {
    // Очищаем форму
    clearForm(avatarChangeProfile);
    // Открываем popup
    openPopup(avatarChangeProfile);
}

// Открытие формы, изменение данных профиля
profileEditButton.addEventListener('click', editProfile);

formElement.addEventListener('submit', saveProfileForm);

function editProfile() {
    // Открываем popup
    openPopup(editProfilePopup);

    // Подставляем значения из профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

// Добавление карточки
showAddCardPopup.addEventListener('click', function() {
    // Очищаем форму
    clearForm(addCardPopup);
    // Открываем popup
    openPopup(addCardPopup);
});

formCard.addEventListener('submit', saveCardForm);

//Удаление карточки
formDelete.addEventListener('submit', acceptCardDelete);

// Объекты валидации
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__item',
    inputErrorClass: 'popup__item_invalid',
    errorClass: 'popup__error_visible',
    buttonSelector: '.popup__submit',
    buttonDisabledClass: 'popup__submit_disabled',
}
// Вызываем функцию из валидации
const forms = Array.from(document.querySelectorAll('.form'));
forms.forEach((form) => {
    new Validator(validationConfig, form).enableValidation();
})

export {validationConfig}


