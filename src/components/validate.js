// Валидация формы Редактирование профиля и Новое место
// const validationConfig = {
//     formSelector: '.form',
//     inputSelector: '.popup__item',
//     inputErrorClass: 'popup__item_invalid',
//     errorClass: 'popup__error_visible',
//     buttonSelector: '.popup__submit',
//     buttonDisabledClass: 'popup__submit_disabled',
// }

/* const forms = Array.from(document.querySelectorAll(this._config.formSelector)); */

export default class Validation {
    constructor(forms, config) {
        this._forms = forms;
        this._config = config;
    }

//Функция скрывает элемент ошибки
    _hideInputError (inputElement, errorElement) {
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
    _showInputError (inputElement, errorElement, errorMessage) {
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = errorMessage;
    };

//Функция проверки валидности полей (если поле не валидно)
    _checkInputValidity (formElement, inputElement) {
        const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, errorElement); //скрываем элемент ошибки
        } else {
            this._showInputError(inputElement, errorElement, inputElement.validationMessage) //показываем элемент ошибки
        }
    };

//Функция не активности кнопки submit
    disableButton (buttonElement) {
        buttonElement.classList.add(this._config.buttonDisabledClass);
        buttonElement.disable = true;
    };

//Функция активности кнопки submit
    _enableButton (buttonElement) {
        buttonElement.classList.remove(this._config.buttonDisabledClass);
        buttonElement.disable = false;
    };

//
    _hasInvalidInput (inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

//Функция принимает поля ввода и элемент кнопки меняется
    _toggleButtonState(formElement, inputList) {
        const buttonElement = formElement.querySelector(this._config.buttonSelector);

        if (this._hasInvalidInput(inputList)) {
            this.disableButton(buttonElement);
        } else {
            this._enableButton(buttonElement);
        }
    };

//
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement); //проверка валидации input
                this._toggleButtonState(formElement, inputList);//проверка кнопки на активность
            });
        });
        this._toggleButtonState(formElement, inputList);//проверка кнопки на активность
    }

// Функция выбирает все формы на странице и убираем событие ее отправки
    enableValidation() {
        this._forms.forEach(formElement => {
            formElement.addEventListener('submit', event => {
                event.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    };
}


