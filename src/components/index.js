import '../pages/index.css'; // добавьте импорт главного файла стилей

import { clearForm, openPopup} from './utils.js'; //функции открытия и закрытия popup
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

import Validator from './Validator.js';
import Api from './Apis.js';
import Section from './Section';
import Card from './Card.js';
import PopupZoomImage from './PopupZoomImage';

import * as constant from './../utils/constants.js'




const getApi = new Api(constant.apiConfig);

// Всё с сервера
Promise.all([getApi.getData(constant.ways.profile, 'GET'), getApi.getData(constant.ways.cards, 'GET')]) //Функции получения данных Профиля и карточки (возвращает результат выполнения функции fetch)
    .then(([user, cards]) => { // данные
        profileTitle.textContent = user.name;
        profileJob.textContent = user.about;
        imageAvatar.src = user.avatar;
        const standardCards = new Section({            //Отображает все карточки
            items: cards,
            renderer: (item) => {
                const cardToCreate = new Card(item, {                   //константа создаваемой карточки с данными 
                    handleCardClick: (name, link) => {         //Функция на клик по карточке
                        const popupWithImage = new PopupZoomImage(constant.popupWithImage, name, link);
                        popupWithImage.open();
                    },  
                }, {
                    handleLikeClick: (card, id) => {
                        if (card.dataset.isLiked === 'true') {
                            getApi.getData(constant.ways.cardsLikes, 'DELETE', id)
                                .then((res) => {
                                    cardToCreate.deleteLike(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        } else {
                            getApi.getData(constant.ways.cardsLikes, 'PUT', id)
                                .then((res) => {
                                    cardToCreate.addLike(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    }
                    }, user._id);
                const cardToReturn = cardToCreate.createCard();         //Готовая карточка места
                standardCards.addItem(cardToReturn);    // Добавить созданную карточку в контейнер
            }
        }, constant.cardContainer);
        standardCards.renderItems(); //рендерим все карточки на страницу
    })
    .catch(err => {
        console.log(err);
    });

    // Вызываем функцию из валидации
constant.forms.forEach((form) => {
    new Validator(constant.validationConfig, form).enableValidation();
})

///



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