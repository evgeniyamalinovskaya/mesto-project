import '../pages/index.css'; // добавьте импорт главного файла стилей

import { clearForm, openPopup} from './utils.js'; //функции открытия и закрытия popup
import Validation from './validate.js';
import { Card, cardContainer} from './card.js';
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
import API from './api.js';

// Всё с сервера
Promise.all([API.getProfile(), API.getCard()]) //Функции получения данных Профиля и карточки (возвращает результат выполнения функции fetch)
    .then(([user, card]) => { // данные
        profileTitle.textContent = user.name;
        profileJob.textContent = user.about;
        imageAvatar.src = user.avatar;
        const standardCards = card.map(function (card) {
            const cardToCreate = new Card(card, user._id)
            return cardToCreate.createCard()
        });
        cardContainer.prepend(...standardCards);
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
new Validation(forms, validationConfig).enableValidation();

export {validationConfig}


