import '../pages/index.css'; // добавьте импорт главного файла стилей

import FormValidator from './FormValidator.js';
import Api from './Api.js';
import Section from './Section';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import PopupToDelete from './PopupToDelete';
import * as constant from './../utils/constants.js';
import UserInfo from "./UserInfo";


const getApi = new Api(constant);
const userApi = getApi.getUser();
const cardsApi = getApi.getCards();

//Класс профиля
const profileInfo = new UserInfo (constant.selectors); 

// Вызываем функцию из валидации
const formInfo = new FormValidator(constant.validationConfig, constant.formInfo);
const formCard = new FormValidator(constant.validationConfig, constant.formCard);
const formAvatar = new FormValidator(constant.validationConfig, constant.formAvatar);
const forms = [formInfo, formCard, formAvatar];
forms.forEach(form => form.enableValidation());

//Класс попапа с картинкой
const popupWithImage = new PopupWithImage(constant.popups.image);
popupWithImage.setEventListeners();

//Попап удаления карточки
const popupToDelete = new PopupToDelete(constant.popups.delete, {
    submit: (id) => {
        getApi.deleteCard(id)
        .then(() => { 
            document.querySelector(`.elements__card[data-id="${id}"]`).remove();
            popupToDelete.close()
        })
        .catch(err => {console.log(err)});
    }
})
popupToDelete.setEventListeners();

//Попап редактирования профиля 
const profilePopup = new PopupWithForm(constant.popups.profile, {
    submit: (data) => {
        profilePopup.setSubmitButtonText('Сохранение...');
        getApi.changeProfile(data)
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
    deleteErrors: (input) => {resetValidation(input, formInfo, constant.formInfo)}
});
profilePopup.setEventListeners();

// Попап сохранения карточки
const cardAddPopup = new PopupWithForm(constant.popups.card, {
    submit: (data) => {
        cardAddPopup.setSubmitButtonText('Создание...');
        getApi.createCard(data)
        .then((data) => {
            newCard.renderItem(data, data.owner._id);
            cardAddPopup.close();
        })
        .catch(err => {console.log(err)})
        .finally(() => {
            cardAddPopup.setSubmitButtonText('Создать');
        });
    }
    }, {
    deleteErrors: (input) => {resetValidation(input, formCard, constant.formCard)}
});
cardAddPopup.setEventListeners();

//Функция сохранения новой аватарки профиля
const avatarPopup = new PopupWithForm(constant.popups.avatar, {
    submit: (data) => {
        avatarPopup.setSubmitButtonText('Сохранение...');
        getApi.createAvatar(data)
        .then((data) => {
            profileInfo.setUserAvatar(data);
            avatarPopup.close();
        })
        .catch(err => {console.log(err)})
        .finally(() => {
            avatarPopup.setSubmitButtonText('Сохранить');
        });
    }
    }, {
    deleteErrors: (input) => {resetValidation(input, formAvatar, constant.formAvatar)}
});
avatarPopup.setEventListeners();

const resetValidation = ((input, formClass, form) => {
    const errorElement = form.querySelector(`#error-${input.id}`);
    formClass.hideInputError(input, errorElement);
})

//Функция для постановки лайка
const handleLikeClick = (card, id, cardToCreate) => {
    if (card.dataset.isLiked === 'true') {
        getApi.deleteLike(id)
            .then((res) => {
                cardToCreate.deleteLike(res);
            })
            .catch(err => {console.log(err)});
    } else {
        getApi.addLike(id)
            .then((res) => {
                cardToCreate.addLike(res);
            })
            .catch(err => {console.log(err)});
    }
}

const newCard = new Section({
    renderer: (item, userId) => {
        const cardToCreate = new Card(item, {                   //константа создаваемой карточки с данными 
            handleCardClick: (name, link) => {popupWithImage.open(name, link)},     //Функция на клик по карточке
        }, {
            handleLikeClick: (card, id) => {handleLikeClick(card, id, cardToCreate)}
            }, {
            openDeletePopup: (id) => {popupToDelete.open(id)}
            }, userId, constant.templateSelector);
        return cardToCreate.createCard();         //Готовая карточка места
    }
}, constant.cardContainer);

//Назначаем кнопки
//Открытие профиля
constant.buttons.profile.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.setInputValues(profileInfo.getUserInfo());
    formInfo.enableButton();
});
//Открытие карточек
constant.buttons.card.addEventListener('click', () => {
    cardAddPopup.open();
    formCard.disableButton();
});
//Открытие аватарки
constant.buttons.avatar.addEventListener('click', () => {
    avatarPopup.open();
    formAvatar.disableButton();
});

// Всё с сервера
Promise.all([userApi, cardsApi]) //Функции получения данных Профиля и карточки (возвращает результат выполнения функции fetch)
    .then(([user, cards]) => {
        profileInfo.setUserInfo(user);
        profileInfo.setUserAvatar(user);
        newCard.renderItems(cards, user._id);
    })
    .catch(err => {console.log(err)});