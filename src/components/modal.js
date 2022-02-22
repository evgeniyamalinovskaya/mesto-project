import {closePopup} from './utils.js';
import {cardContainer, createCard} from './card.js';
import {hideInputElement, hideErrorElement, validationConfig} from './validate.js';

// Кнопки редактирование профиля
const editProfilePopup = document.querySelector('.popup_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');
// Получаем имя и профессию редактирование профиля
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
// Форму в DOM редактирования профиля
const formElement = document.querySelector('form[name="form-info"]');
// Находим поля формы в DOM редактирования профиля
const nameInput = formElement.querySelector('input[name="username"]');
const jobInput = formElement.querySelector('input[name="about"]');

// Кнопки добавление карточек
const addCardPopup = document.querySelector('.popup_card');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');
// Форма в DOM добавления карточки
const formCard = document.querySelector('form[name="form-card"]');
// 2. Находим поля формы в DOM
const placeInput = formCard.querySelector('input[name="name"]');
const linkInput = formCard.querySelector('input[name="link"]');
const errorTextList = formCard.querySelectorAll('.popup__error');
const errorInputList = formCard.querySelectorAll('.popup__item');

function saveProfileForm(evt) {
    evt.preventDefault();

    // Вставляем новые значения
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    // Сохранение данных
    closePopup(editProfilePopup);
}

// Функция сохранения карточки
function saveCardForm(evt) {
    evt.preventDefault();

    // Сохранение данных
    cardContainer.prepend(createCard(placeInput.value, linkInput.value));

    // закрытие карточки
    closePopup(addCardPopup);

    // Очищаем форму карточки
    clearCardForm();
}

// Функция очистки поля в форме карточки
function clearCardForm() {
    placeInput.value = "";
    linkInput.value = "";

    errorInputList.forEach(errorInputElement => {
        hideInputElement(errorInputElement, validationConfig)
    });

    errorTextList.forEach(errorTextElement => {
        hideErrorElement(errorTextElement, validationConfig)
    });
}

export {
    clearCardForm,
    editProfilePopup,
    profileEditButton,
    profileCloseButton,
    profileTitle,
    profileJob,
    formElement,
    nameInput,
    jobInput,
    addCardPopup,
    showAddCardPopup,
    cardCloseButton,
    formCard,
    placeInput,
    linkInput,
    saveCardForm,
    saveProfileForm
}