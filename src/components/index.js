import '../pages/index.css'; // добавьте импорт главного файла стилей

/* import { clearForm, openPopup} from './utils.js'; */ //функции открытия и закрытия popup
/* import {
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
} from './modal.js'; */

import Validator from './Validator.js';
import Api from './Apis.js';
import Section from './Section';
import Card from './Card.js';
import PopupZoomImage from './PopupZoomImage';
import PopupWithForm from './PopupWithForm';
import * as constant from './../utils/constants.js'
import UserInfo from "./UserInfo";


const getApi = new Api(constant.apiConfig);
const userApi = getApi.getData(constant.ways.profile, 'GET');
const cardsApi = getApi.getData(constant.ways.cards, 'GET');
const profileInfo = new UserInfo (constant.selectors);  //Класс профиля
// Вызываем функцию из валидации
const formInfo = new Validator(constant.validationConfig, constant.formInfo);
const formCard = new Validator(constant.validationConfig, constant.formCard);
const formAvatar = new Validator(constant.validationConfig, constant.formAvatar);
const forms = [formInfo, formCard, formAvatar];
forms.forEach(form => form.enableValidation());

const popupWithImage = new PopupZoomImage(constant.popupWithImage); //Класс попапа с картинкой

//Функция на изменения редактирования профиля 
const profilePopup = new PopupWithForm(constant.popups.profile, {
    submit: (data) => {
        profilePopup.setSubmitButtonText('Сохранение...');
        getApi.createData(constant.ways.profile, data, 'PATCH')
        .then((data) => {
            profileInfo.setUserInfo(data);            
            profilePopup.close();
        })
        .finally(() => {
            profilePopup.setSubmitButtonText('Сохранить');
        })
    }
    }, {
    deleteErrors: (input) => {formInfo.hideInputError(input)}
});
// Функция сохранения карточки
const cardAddPopup = new PopupWithForm(constant.popups.card, {
    submit: (data) => {
        cardAddPopup.setSubmitButtonText('Созданение...');
        getApi.createData(constant.ways.cards, data, 'POST')
        .then((data) => {
            const newCard = new Section({
                items: [data],
                renderer: (item) => {
                    const cardToCreate = new Card(item, {                   //константа создаваемой карточки с данными 
                        handleCardClick: (name, link) => {         //Функция на клик по карточке
                            popupWithImage.open(name, link);
                        },  
                    }, {
                        handleLikeClick: (card, id) => {handleLikeClick(card, id, cardToCreate)}
                        }, data.owner._id);
                    const cardToReturn = cardToCreate.createCard();         //Готовая карточка места
                    newCard.prependItem(cardToReturn);
                }
            }, constant.cardContainer)
            newCard.renderItems();
            cardAddPopup.close();
            formCard.disableButton();
        })
        .finally(() => {
            cardAddPopup.setSubmitButtonText('Создать');
        })
    }
    }, {
    deleteErrors: (input) => {formCard.hideInputError(input)}
});
//Функция сохранения новой аватарки профиля
const avatarPopup = new PopupWithForm(constant.popups.avatar, {
    submit: (data) => {
        avatarPopup.setSubmitButtonText('Сохранение...');
        getApi.createData(constant.ways.avatar, data, 'PATCH')
        .then((data) => {
            profileInfo.setUserAvatar(data);
            avatarPopup.close();
            formAvatar.disableButton();
        })
        .finally(() => {
            profilePopup.setSubmitButtonText('Сохранить');
        })
    }
    }, {
    deleteErrors: (input) => {formAvatar.hideInputError(input)}
});

//Назначаем кнопки
//Открытие профиля
constant.buttons.profile.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.setInputValues(profileInfo.getUserInfo());
    formInfo.enableButton();
});
//Открытие карточек
constant.buttons.card.addEventListener('click', () => {cardAddPopup.open()});
//Открытие аватарки
constant.buttons.avatar.addEventListener('click', () => {avatarPopup.open()});

// Всё с сервера
Promise.all([userApi, cardsApi]) //Функции получения данных Профиля и карточки (возвращает результат выполнения функции fetch)
    .then(([user, cards]) => {
        profileInfo.setUserInfo(user);
        profileInfo.setUserAvatar(user);

        const standardCards = new Section({            //Отображает все карточки
            items: cards,
            renderer: (item) => {
                const cardToCreate = new Card(item, {                   //константа создаваемой карточки с данными 
                    handleCardClick: (name, link) => {         //Функция на клик по карточке
                        popupWithImage.open(name, link);
                    },  
                }, {
                    handleLikeClick: (card, id) => {handleLikeClick(card, id, cardToCreate)}
                    }, user._id);
                const cardToReturn = cardToCreate.createCard();         //Готовая карточка места
                standardCards.appendItem(cardToReturn);    // Добавить созданную карточку в контейнер
            }
        }, constant.cardContainer);
        standardCards.renderItems(); //рендерим все карточки на страницу
    })
    .catch(err => {
        console.log(err);
    });

//Функция для постановки лайка
const handleLikeClick = (card, id, cardToCreate) => {
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