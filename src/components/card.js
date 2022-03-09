import {openPopup,} from "./utils";
import API from './api.js';

// Находим поля формы в DOM добавления карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements__list');
//  Находим поля формы в DOM всплывающего окна отображающего картинку
const zoomedImagePopup = document.querySelector('.popup__image');
const imageText = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_image');

// Возвращает добавленную карточку
function createCard(placeValue, linkValue, id, likes, userId, owner) {
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    const cardImage = card.querySelector('.elements__image');
    const cardText = card.querySelector('.elements__title');
    const cardLike = card.querySelector('.elements__like');
    const cardRemove = card.querySelector('.elements__remove-button');
    const deleteCardButton = card.querySelector('.elements__remove-button');
    const buttonLike = card.querySelector('.elements__like-numbers');

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
    cardLike.addEventListener('click', addNumbersLike);
    // Функция добавление лайка карточке
    function addNumbersLike(evt) {
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

    // Удаление карточки
    cardRemove.addEventListener('click', deleteCardRemove);
    //Функция удаления карточки
    function deleteCardRemove(evt) {
        API.deleteTaskCard(evt.target.closest('.elements__card').dataset.id)
            .then(() => {
                evt.target.closest('.elements__card').remove();
            })
            .catch(err => {
                console.log(err);
            })
    }

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

export {createCard, cardTemplate, cardContainer, imagePopup};