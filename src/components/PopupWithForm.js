import Popup from "./Popup";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submit}) {
        super (popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._popup.querySelector('.popup__submit')
    }

    //Для сбора данных из полей создадим приватный метод
    _getInputValues() {
         // достаём все элементы полей
        this._inputList = this._popup.querySelectorAll('.popup__item');

        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // передадим ей объект — результат работы _getInputValues
            this._submit(this._getInputValues());
        });
    }

    close = () => {
        super.close();
        this._form.reset();
    }
     // Вызов функции изменения текста
    setSubmitButtonText(content) {
        this._submitButton.textContent = content;
    }
}