import '../pages/index.css'; // добавьте импорт главного файла стилей

import Validator from './Validator.js';
import Api from './Api.js';
import Section from './Section';
import Card from './Card.js';
import PopupZoomImage from './PopupZoomImage';
import PopupWithForm from './PopupWithForm';
import PopupToDelete from './PopupToDelete';
import * as constant from './../utils/constants.js';
import UserInfo from "./UserInfo";


const getApi = new Api(constant.apiConfig);
const userApi = getApi.getData(constant.ways.profile, 'GET');
const cardsApi = getApi.getData(constant.ways.cards, 'GET');

//Класс профиля
const profileInfo = new UserInfo (constant.selectors); 

// Вызываем функцию из валидации
const formInfo = new Validator(constant.validationConfig, constant.formInfo);
const formCard = new Validator(constant.validationConfig, constant.formCard);
const formAvatar = new Validator(constant.validationConfig, constant.formAvatar);
const forms = [formInfo, formCard, formAvatar];
forms.forEach(form => form.enableValidation());

//Класс попапа с картинкой
const popupWithImage = new PopupZoomImage(constant.popups.image); 
const popupToDelete = new PopupToDelete(constant.popups.delete, {
    submit: (id) => {
        getApi.getData(constant.ways.cardsDelete, 'DELETE', id)
        .then(() => { 
            document.querySelector(`.elements__card[data-id="${id}"]`).remove();
            popupToDelete.close()
        })
        .catch(err => {console.log(err)});
    }
})

//Попап редактирования профиля 
const profilePopup = new PopupWithForm(constant.popups.profile, {
    submit: (data) => {
        profilePopup.setSubmitButtonText('Сохранение...');
        getApi.createData(constant.ways.profile, data, 'PATCH')
        .then((data) => {
            profileInfo.setUserInfo(data);            
            profilePopup.close();
        })
        .catch(err => {console.log(err)})
        .finally(() => {
            profilePopup.setSubmitButtonText('Сохранить');
        });
    }
    }, {
    deleteErrors: (input) => {formInfo.hideInputError(input)}
});

// Попап сохранения карточки
const cardAddPopup = new PopupWithForm(constant.popups.card, {
    submit: (data) => {
        cardAddPopup.setSubmitButtonText('Создание...');
        getApi.createData(constant.ways.cards, data, 'POST')
        .then((data) => {
            const newCard = new Section({
                items: [data],
                renderer: (item) => {
                    const cardToCreate = new Card(item, {                   //константа создаваемой карточки с данными 
                        handleCardClick: (name, link) => {popupWithImage.open(name, link)},     //Функция на клик по карточке
                    }, {
                        handleLikeClick: (card, id) => {handleLikeClick(card, id, cardToCreate)}
                        }, {
                        openDeletePopup: (id) => {popupToDelete.open(id)}
                        }, data.owner._id);
                    const cardToReturn = cardToCreate.createCard();         //Готовая карточка места
                    newCard.prependItem(cardToReturn);
                }
            }, constant.cardContainer)
            newCard.renderItems();
            cardAddPopup.close();
            formCard.disableButton();
        })
        .catch(err => {console.log(err)})
        .finally(() => {
            cardAddPopup.setSubmitButtonText('Создать');
        });
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
        .catch(err => {console.log(err)})
        .finally(() => {
            profilePopup.setSubmitButtonText('Сохранить');
        });
    }
    }, {
    deleteErrors: (input) => {formAvatar.hideInputError(input)}
});

//Функция для постановки лайка
const handleLikeClick = (card, id, cardToCreate) => {
    if (card.dataset.isLiked === 'true') {
        getApi.getData(constant.ways.cardsLikes, 'DELETE', id)
            .then((res) => {
                cardToCreate.deleteLike(res);
            })
            .catch(err => {console.log(err)});
    } else {
        getApi.getData(constant.ways.cardsLikes, 'PUT', id)
            .then((res) => {
                cardToCreate.addLike(res);
            })
            .catch(err => {console.log(err)});
    }
}

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
                    handleCardClick: (name, link) => {popupWithImage.open(name, link)},         //Функция на клик по карточке  
                }, {
                    handleLikeClick: (card, id) => {handleLikeClick(card, id, cardToCreate)}
                }, {
                    openDeletePopup: (id) => {popupToDelete.open(id)}
                }, user._id);
                const cardToReturn = cardToCreate.createCard();         //Готовая карточка места
                standardCards.appendItem(cardToReturn);    // Добавить созданную карточку в контейнер
            }
        }, constant.cardContainer);
        standardCards.renderItems(); //рендерим все карточки на страницу
    })
    .catch(err => {console.log(err)});