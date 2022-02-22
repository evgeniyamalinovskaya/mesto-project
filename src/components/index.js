import '../pages/index.css'; // добавьте импорт главного файла стилей

import { closePopup, openPopup } from './utils.js'; //функции открытия и закрытия popup
import { enableValidation, validationConfig} from './validate.js';
import { createCard, cardContainer, imageCloseButton, imagePopup} from './card.js';
import { editProfilePopup, profileEditButton, profileCloseButton, profileTitle, profileJob, formElement, nameInput, jobInput, addCardPopup, showAddCardPopup, cardCloseButton, formCard, saveCardForm, saveProfileForm} from './modal.js';

//Стандартные карточки
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Добавить стандартные карточки
const standardCards = initialCards.map(function (card) {
    return createCard(card.name, card.link);
});
cardContainer.prepend(...standardCards);


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

// Функция закрытия popup профиля
profileCloseButton.addEventListener('click', () => closePopup(editProfilePopup));


// Добавление карточки
showAddCardPopup.addEventListener('click', function () {
    openPopup(addCardPopup);
});

formCard.addEventListener('submit', saveCardForm);


// Функция закрытия popup отображения картинок
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));

// Функция закрытия popup добавления карточек
cardCloseButton.addEventListener('click', () => closePopup(addCardPopup));


enableValidation(validationConfig) // Вызываем функцию



