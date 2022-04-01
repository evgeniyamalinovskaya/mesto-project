export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button')
    }

// Универсальная функция открытия всех popup
    open () {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

//Функция на overlay
    _handleClickOverlay = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close(this._popup);
        }
    };

//Функция на esc
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close(this._popup);
        }
    };

//Функция закрытия попапа по иконке
    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._handleClickOverlay);
        this._closeButton.addEventListener('click', this.close);
    }

// Универсальная функция закрытия всех popup по нажатию на esc, overlay, крестик
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._handleClickOverlay);
    }
}