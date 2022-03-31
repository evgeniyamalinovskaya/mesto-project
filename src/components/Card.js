//Класс добавляет готовую разметку на страницу
export default class Card {
    constructor({ name, link, _id, likes, owner}, {handleCardClick}, {handleLikeClick}, userId) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likes = likes;
        this._owner = owner;
        this._handleCardClick = handleCardClick;    //открытие попапа с картинкой
        this._handleLikeClick = handleLikeClick;    //нажатие на лайк
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
        this._card = this._getElement();
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardText = this._card.querySelector('.elements__title');
        this._cardLike = this._card.querySelector('.elements__like');
        this._buttonLike = this._card.querySelector('.elements__like-numbers');
        this._cardRemove = this._card.querySelector('.elements__remove-button');
        this._isLiked();

        //Функция удаления с чужих карточек иконки корзинки
        if (this._userId !== this._owner._id) {
            this._cardRemove.remove();
        }

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardText.textContent = this._name;
        this._card.dataset.id = this._id;
        this._buttonLike.textContent = this._likes.length;

        //Вызываем метод слушателей событий
        this.setEventListeners();
        
        //Вернем карточку
        return this._card;
    }

    // Метод обработки слушателей событий (добавила метод)
    setEventListeners() {
        // Добавление лайка карточке
        this._cardLike.addEventListener('click', () => {
            this._handleLikeClick(this._card, this._id);
        });

        // Удаление карточки
        this._cardRemove.addEventListener('click', () => {
            openPopup(deletePopup);
            deletePopup.dataset.IdToDelete = this._id;
        });

        // При клике на карточку открыть картинку во всплывающем окне
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    // Проверяем поставлен ли лайк
    _isLiked() {
        if (this._likes.some(like => like._id === this._userId)) {
            this._cardLike.classList.add('elements__like_active');
            this._card.dataset.isLiked = 'true';
        } else {
            this._card.dataset.isLiked = 'false';
        }
    }

    deleteLike(res) {
        this._cardLike.classList.remove('elements__like_active');
        this._buttonLike.textContent = res.likes.length;
        this._card.dataset.isLiked = 'false';
    }
    addLike(res) {
        this._cardLike.classList.add('elements__like_active');
        this._buttonLike.textContent = res.likes.length;
        this._card.dataset.isLiked = 'true';
    }
}

    //Функция удаления карточки
    /* function deleteCardRemove(id) {
        this._api.deleteTaskCard(id)
        .then(() => {
            document.querySelector(`.elements__card[data-id="${id}"]`).remove();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            deletePopup.dataset.IdToDelete ='';
        })
} */

