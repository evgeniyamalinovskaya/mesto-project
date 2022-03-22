import {closePopup, clearForm} from './utils.js';
import {cardContainer, deleteCardRemove, deletePopup} from './card.js';
import { validationConfig,} from "./index.js";
import API from './api.js';



//Кнопка редактирования аватарки
const avatarButton = document.querySelector('.profile__avatar-button');
const avatarChangeProfile = document.querySelector('.popup_avatar');
// Форма изменения аватарки
const formAvatar = document.querySelector('form[name="form-avatar"]');
const avatarInput = formAvatar.querySelector('#link-avatar');
const avatarSubmit = document.querySelector('#avatar-submit');
const imageAvatar = document.querySelector('.profile__avatar-image');
// Кнопки редактирование профиля
const editProfilePopup = document.querySelector('.popup_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
// Получаем имя и профессию редактирование профиля
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
// Форму в DOM редактирования профиля
const formElement = document.querySelector('form[name="form-info"]');
const nameInput = formElement.querySelector('input[name="username"]');
const jobInput = formElement.querySelector('input[name="about"]');
// Кнопки добавление карточек
const addCardPopup = document.querySelector('.popup_card');
const showAddCardPopup = document.querySelector('.profile__add-button');
// Форма в DOM добавления карточки
const formCard = document.querySelector('form[name="form-card"]');
const placeInput = formCard.querySelector('input[name="name"]');
const linkInput = formCard.querySelector('input[name="link"]');
const addCardSubmit= document.querySelector('#add-card-submit');
// Кнопки замены текста submit
const buttonSaveProfile = document.querySelector('.popup__submit_save_profile');
const formDelete = document.querySelector('form[name="form-delete"]');

//Функция на изменения редактирования профиля
function saveProfileForm(evt) {
    evt.preventDefault();
    // Вызов функции изменения текста
    buttonSaveProfile.textContent = 'Сохранение...';
    //Вызываем функцию api
    API.createTaskProfile(nameInput.value, jobInput.value)
        .then (data => {
                profileTitle.textContent = data.name;
                profileJob.textContent = data.about;
                // Закрытие профиля
                closePopup();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSaveProfile.textContent = 'Сохранить';
        })
}

//Функция сохранения новой аватарки профиля
function saveAvatarForm(evt) {
    evt.preventDefault();
    // Вызов функции изменения текста
    avatarSubmit.textContent = 'Сохранение...';
    //Вызываем функцию api
    API.createImageAvatar(avatarInput.value)
        .then ((data) => {
                imageAvatar.src = data.avatar;
                // Кнопка не активна без заполнения полей формы
                disableButton(avatarSubmit, validationConfig);
                // закрытие аватарки
                closePopup();
                // Очищаем форму аватарки
                clearForm(avatarChangeProfile);
    })
        .catch((err) => {
        console.log(err);
    })
        .finally(() => {
            avatarSubmit.textContent = 'Сохранить';
        })
}

// Функция сохранения карточки
function saveCardForm(evt) {
    evt.preventDefault();
    // Вызов функции изменения текста
    addCardSubmit.textContent = 'Сохранение...';
    //Вызываем функцию api
    API.createTaskCard(placeInput.value, linkInput.value)
        .then ((res) => {
                // Сохранение данных
                cardContainer.prepend(createCard(res.name, res.link, res._id, res.likes, res.owner._id, res.owner));
                // Кнопка не активна без заполнения полей формы
                disableButton(addCardSubmit, validationConfig);
                // закрытие карточки
                closePopup();
                // Очищаем форму карточки
                clearForm(addCardPopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            addCardSubmit.textContent = 'Сохранить';
        })
}

//Функция удаления карточки навсегда
function acceptCardDelete(evt) {
    evt.preventDefault();
    const IdToDelete = deletePopup.dataset.IdToDelete;
    deleteCardRemove(IdToDelete);
     // закрытие попапа удаления карточки
     closePopup();
}


export {
    imageAvatar,
    avatarButton,
    avatarChangeProfile,
    saveAvatarForm,
    formAvatar,
    avatarInput,
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
    placeInput,
    linkInput,
    saveCardForm,
    saveProfileForm,
    acceptCardDelete, 
    formDelete
}