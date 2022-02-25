import {openPopup, closePopup} from "./utils";

// Находим поля формы в DOM добавления карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements__list');

//  Находим поля формы в DOM всплывающего окна отображающего картинку
const zoomedImagePopup = document.querySelector('.popup__image');
const imageText = document.querySelector('.popup__caption');

// Всплывающее окно отображающее картинку
const imagePopup = document.querySelector('.popup_image');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');

// Возвращает добавленную карточку

function createCard(placeValue, linkValue) {
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    const cardImage = card.querySelector('.elements__image');
    const cardText = card.querySelector('.elements__title');
    const cardLike = card.querySelector('.elements__like');
    const cardRemove = card.querySelector('.elements__remove-button');

    // Подставить введенные данные из формы
    cardImage.src = linkValue;
    cardImage.alt = placeValue;
    cardText.textContent = placeValue;

    // Добавление лайка карточке
    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });

    // Удаление карточки
    cardRemove.addEventListener('click', function (evt) {
        evt.target.closest('.elements__card').remove();
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

export {createCard, cardTemplate, cardContainer, imageCloseButton, imagePopup};