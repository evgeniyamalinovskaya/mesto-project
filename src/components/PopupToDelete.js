import Popup from "./Popup";

export default class PopupToDelete extends Popup {
    constructor(popupSelector, {submit}) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._popup.dataset.IdToDelete);
        });
    }

    open(id) {
        super.open();
        this._popup.dataset.IdToDelete = id;
    }

    close = () => {
        super.close();
        this._popup.dataset.IdToDelete = '';
    }
}