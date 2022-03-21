import {openPopup,} from "./utils";
import API from './api.js';

// Находим поля формы в DOM добавления карточки
const cardContainer = document.querySelector('.elements__list');
//  Находим поля формы в DOM всплывающего окна отображающего картинку
const imagePopup = document.querySelector('.popup_image');
const deletePopup = document.querySelector('.popup_delete');

    //Класс добавляет готовую разметку на страницу
export class Card {
    constructor({ name, link, _id, likes, owner }, userId) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likes = likes;
        this._owner = owner;
        this._userId = userId;
    }

    //Метод извлекает шаблон из разметки из DOM
    _getElement() {
        return document
            .querySelector('#card-template')
            .content
            .querySelector('.elements__card')
            .cloneNode(true);
    }

    // Метод добавит данные в разметку (Подготовка карточки к публикации)
    createCard() {
        // this._cardTemplate = document.querySelector('#card-template').content;
        // this._card = this._cardTemplate.querySelector('.elements__card').cloneNode(true);
        this._card = this._getElement();
        this._cardLike = this._card.querySelector('.elements__like');
        this._cardRemove = this._card.querySelector('.elements__remove-button');
        const deleteCardButton = this._card.querySelector('.elements__remove-button');
        this._buttonLike = this._card.querySelector('.elements__like-numbers');
        this._cardImage = this._card.querySelector('.elements__image');
        this._isLiked(this._card, this._likes, this._userId);
        //Функция удаления с чужих карточек иконки корзинки
        if (this._userId !== this._owner._id) {
            deleteCardButton.remove();
        }

        this._render(this._card, this._buttonLike, this._cardImage);

        //Вызываем метод слушателей событий
        this._setEventListeners();
        
        //Вернем карточку
        return this._card;
    }

    // Метод обработки слушателей событий (добавила метод)
    _setEventListeners() {
        // Добавление лайка карточке
        this._cardLike.addEventListener('click', (evt) => {
            this._addNumbersLike(evt, this._buttonLike, this._card)
        });

        // Удаление карточки
        this._cardRemove.addEventListener('click', () => {
            openPopup(deletePopup);
            deletePopup.dataset.IdToDelete = this._id;
        });

        // При клике на карточку открыть картинку во всплывающем окне
        this._cardImage.addEventListener('click', () => {
            this._zoomImagePopup()});
    }

    // Проверяем поставлен ли лайк
    _isLiked(cardItem, likes, userId) {
    if (likes.some(like => like._id === userId)) {
      cardItem.querySelector('.elements__like').classList.add('elements__like_active');
    }
    }
    // Метод
    _render(card, buttonLike, cardImage) {
        const cardText = card.querySelector('.elements__title');
        
        // Подставить введенные данные из формы
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardText.textContent = this._name;
        card.dataset.id = this._id;
        buttonLike.textContent = this._likes.length;
    }

    // Функция добавление лайка карточке
    _addNumbersLike(evt, buttonLike, card) {
        if (evt.target.classList.contains('elements__like_active')) {
            API.deleteLike(card.dataset.id)
                .then((res) => {
                    evt.target.classList.remove('elements__like_active');
                    buttonLike.textContent = res.likes.length;
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            API.addLike(card.dataset.id)
                .then((res) => {
                    evt.target.classList.add('elements__like_active');
                    buttonLike.textContent = res.likes.length;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    // Функция открытия картинки во всплывающем окне
    _zoomImagePopup() {
        const zoomedImagePopup = document.querySelector('.popup__image');
        const imageText = document.querySelector('.popup__caption');
        // Открываем popup
        openPopup(imagePopup);

        // Подставляем данные из объекта
        zoomedImagePopup.src = this._link;
        zoomedImagePopup.alt = this._name;
        imageText.textContent = this._name;
    }
}
    //Функция удаления карточки
    function deleteCardRemove(id) {
    API.deleteTaskCard(id)
        .then(() => {
            document.querySelector(`.elements__card[data-id="${id}"]`).remove();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            deletePopup.dataset.IdToDelete ='';
        })
}



/* // Возвращает добавленную карточку
function createCard(placeValue, linkValue, id, likes, userId, owner) {
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    const cardImage = card.querySelector('.elements__image');
    const cardText = card.querySelector('.elements__title');
    const cardLike = card.querySelector('.elements__like');
    const cardRemove = card.querySelector('.elements__remove-button');
    const deleteCardButton = card.querySelector('.elements__remove-button');
    const buttonLike = card.querySelector('.elements__like-numbers');
    isLiked(card, likes, userId);

//Функция удаления с чужих карточек иконки корзинки
    if (userId !== owner._id) {
        deleteCardButton.remove();
    }
    // Подставить введенные данные из формы
    cardImage.src = linkValue;
    cardImage.alt = placeValue;
    cardText.textContent = placeValue;
    card.dataset.id = id;
    buttonLike.textContent = likes.length;

    // Добавление лайка карточке
    cardLike.addEventListener('click', function(evt) {
        addNumbersLike(evt, buttonLike, card)
    });
    
    // Удаление карточки
    cardRemove.addEventListener('click', function() {
        openPopup(deletePopup);
        deletePopup.dataset.IdToDelete = id;
    });
    
    // При клике на карточку открыть картинку во всплывающем окне
    cardImage.addEventListener('click', zoomImagePopup);

    function zoomImagePopup() {
        // Открываем popup
        openPopup(imagePopup);

        // Подставляем данные из объекта
        zoomedImagePopup.src = linkValue;
        zoomedImagePopup.alt = placeValue;
        imageText.textContent = placeValue;
    }
    return card;
}

/* Проверяем поставлен ли лайк */
/* function isLiked(cardItem, likes, userId) {
    if (likes.some(like => like._id === userId)) {
      cardItem.querySelector('.elements__like').classList.add('elements__like_active');
    }
} */



/* // Функция добавление лайка карточке
function addNumbersLike(evt, buttonLike, card) {
    if (evt.target.classList.contains('elements__like_active')) {
        API.deleteLike(card.dataset.id)
            .then((res) => {
                evt.target.classList.remove('elements__like_active');
                buttonLike.textContent = res.likes.length;
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        API.addLike(card.dataset.id)
            .then((res) => {
                evt.target.classList.add('elements__like_active');
                buttonLike.textContent = res.likes.length;
            })
            .catch(err => {
                console.log(err);
            });
    }
} */

export {cardContainer, imagePopup, deleteCardRemove, deletePopup};