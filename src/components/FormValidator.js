export default class FormValidator {
    constructor(config, form) {        
        this._config = config;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.buttonSelector);
    }

//Функция скрывает элемент ошибки
    hideInputError (inputElement, errorElement) {
        this._hideInputElement(inputElement);
        this._hideErrorElement(errorElement);
    };

//Функция скрывает подчеркивание элемента
    _hideInputElement (inputElement) {
        inputElement.classList.remove(this._config.inputErrorClass);
    };

//Функция скрывает текст ошибки
    _hideErrorElement (errorElement) {
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = ''; //Очищаем значение об ошибке
    };

//Функция показывает элемент ошибки
    _showInputError (inputElement, errorMessage, errorElement) {
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = errorMessage;
    };

//Функция проверки валидности полей (если поле не валидно)
    _checkInputValidity (inputElement) {
        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
        if (inputElement.validity.valid) {
            this.hideInputError(inputElement, errorElement); //скрываем элемент ошибки
        } else {
            this._showInputError(inputElement, inputElement.validationMessage, errorElement) //показываем элемент ошибки
        }
    };

//Функция не активности кнопки submit
    disableButton () {
        this._buttonElement.classList.add(this._config.buttonDisabledClass);
        this._buttonElement.disable = true;
    };

//Функция активности кнопки submit
    enableButton () {
        this._buttonElement.classList.remove(this._config.buttonDisabledClass);
        this._buttonElement.disable = false;
    };

//
    _hasInvalidInput () {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

//Функция принимает поля ввода и элемент кнопки меняется
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    };

//
    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement); //проверка валидации input
                this._toggleButtonState();//проверка кнопки на активность
            });
        });
        this._toggleButtonState();//проверка кнопки на активность
    }

// Функция выбирает все формы на странице и убираем событие ее отправки
    enableValidation() {
        this._setEventListeners();
    };
}

