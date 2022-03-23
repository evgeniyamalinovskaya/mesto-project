import Popup from "./Popup";

//Класс zoomImagePopup, при нажатии на картинку, происходит увеличение
// (через ключевое слово создали новый класс)
export default class PopupZoomImagePopup extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }

    openPopup() {
        super.openPopup();
        this._popup.querySelector('.popup__caption').textContent = this._name;
        this._popup.querySelector('.popup__image').alt = this._name;
        this._popup.querySelector('.popup__image').src = this._link;
    }
}