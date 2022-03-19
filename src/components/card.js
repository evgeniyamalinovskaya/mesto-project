import {openPopup,} from "./utils";
import API from './api.js';

// Находим поля формы в DOM добавления карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements__list');
//  Находим поля формы в DOM всплывающего окна отображающего картинку
const zoomedImagePopup = document.querySelector('.popup__image');
const imageText = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_image');
const deletePopup = document.querySelector('.popup_delete');

// Возвращает добавленную карточку
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
function isLiked(cardItem, likes, userId) {
    if (likes.some(like => like._id === userId)) {
      cardItem.querySelector('.elements__like').classList.add('elements__like_active');
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

// Функция добавление лайка карточке
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
}

export {createCard, cardTemplate, cardContainer, imagePopup, deleteCardRemove, deletePopup};