// Валидация формы Редактирование профиля и Новое место
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__item',
    inputErrorClass: 'popup__item_invalid',
    errorClass: 'popup__error_visible',
    buttonSelector: '.popup__submit',
    buttonDisabledClass: 'popup__submit_disabled',
}

//Функция скрывает элемент ошибки
const hideInputError = (inputElement, errorElement, config) => {
    hideInputElement(inputElement, config);
    hideErrorElement(errorElement, config);
};

//Функция скрывает подчеркивание элемента
const hideInputElement = (inputElement, config) => {
    inputElement.classList.remove(config.inputErrorClass);
};

//Функция скрывает текст ошибки
const hideErrorElement = (errorElement, config) => {
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = ''; //Очищаем значение об ошибке
};

//Функция показывает элемент ошибки
const showInputError = (inputElement, errorElement, errorMessage, config) => {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

//Функция проверки валидности полей (если поле не валидно)
const checkInputValidity = (formElement, inputElement, config) => {

    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

    if (inputElement.validity.valid) {
        hideInputError(inputElement, errorElement, config); //скрываем элемент ошибки
    } else {
        showInputError(inputElement, errorElement, inputElement.validationMessage, config) //показываем элемент ошибки
    }
};

//Функция не активности кнопки submit
const disableButton = (buttonElement, config) => {
    buttonElement.classList.add(config.buttonDisabledClass);
    buttonElement.disable = true;
};

//Функция активности кнопки submit
const enableButton = (buttonElement, config) => {
    buttonElement.classList.remove(config.buttonDisabledClass);
    buttonElement.disable = false;
};

//
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

//Функция принимает поля ввода и элемент кнопки меняется
const toggleButtonState = (formElement, inputList, config) => {
    const buttonElement = formElement.querySelector(config.buttonSelector);

    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
};

//
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config); //проверка валидации input
            toggleButtonState(formElement, inputList, config);//проверка кнопки на активность
        });
    });
    toggleButtonState(formElement, inputList, config);//проверка кнопки на активность
}

// Функция выбирает все формы на странице и убираем событие ее отправки
const enableValidation = (config) => {
    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach(formElement => {
        formElement.addEventListener('submit', event => {
            event.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};

export {validationConfig, enableValidation, hideInputElement, hideErrorElement, disableButton};