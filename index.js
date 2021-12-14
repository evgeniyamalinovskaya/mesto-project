//Стандартные карточки
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Кнопки редактирование профиля
const editProfilePopup = document.getElementById('popup-edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');

// Кнопки добавление карточек
const addCardPopup = document.getElementById('popup-add-card');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');

// Увеличение картинки
const popupImage = document.getElementById('popup-image');
const imageCloseButton = popupImage.querySelector('.popup__close-button');

// Форму в DOM редактирования профиля
const formElement = document.querySelector('form[name="form-info"]');

// Форму в DOM добавления карточки
const formCard = document.querySelector('form[name="form-card"]');

//
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements__list');


// Добавить стандартные карточки
initialCards.forEach(function (card) {
    addCard(card.name, card.link);
});

// Открытие формы, изменение данных профиля
profileEditButton.addEventListener('click', editProfile);

function editProfile() {
    // 1. Открываем popup
    toggleEditProfilePopup(editProfilePopup);

    formElement.addEventListener('submit', formProfileSave);

    // 2. Получаем имя и профессию
    let profileTitle = document.querySelector('.profile__title');
    let profileJob = document.querySelector('.profile__subtitle');

    // 3. Находим поля формы в DOM
    let nameInput = formElement.querySelector('input[name="username"]');
    let jobInput = formElement.querySelector('input[name="about"]');

    // 4. Подставляем значения из профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;

    function formProfileSave(evt) {
        evt.preventDefault();

        // 5.Вставляем новые значения
        profileTitle.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;

        // 6. Сохранение данных
        toggleEditProfilePopup(editProfilePopup);
    }
}
// Функция открытия/закрытия popup профиля
profileCloseButton.addEventListener('click', () => toggleEditProfilePopup(editProfilePopup));
function toggleEditProfilePopup(editProfilePopup) {
    editProfilePopup.classList.toggle('popup_opened');
}

// Добавление карточки
showAddCardPopup.addEventListener('click', function () {
    clearCardForm();
    toggleCardPopup(addCardPopup);
});


formCard.addEventListener('submit', formCardAdd);

// 2. Находим поля формы в DOM
let nameInput = formCard.querySelector('input[name="name"]');
let linkInput = formCard.querySelector('input[name="link"]');

// Функция сохранения карточки
function formCardAdd(evt) {
    evt.preventDefault();

    addCard(nameInput.value, linkInput.value);

    // 3. Сохранение данных
    toggleCardPopup(addCardPopup);

    // 4. Очищаем форму карточки
    clearCardForm();
}

// Функция добавления карточки в поля формы
function addCard(nameValue, linkValue) {
    let card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    let cardImage = card.querySelector('.elements__image');
    let cardText = card.querySelector('.elements__title');
    let cardLike = card.querySelector('.elements__like');
    let cardRemove = card.querySelector('.elements__remove-button');

    // Подставить данные из объекта
    cardImage.src = linkValue;
    cardImage.alt = nameValue;
    cardText.textContent = nameValue;

    cardContainer.prepend(card);

    // Добавление лайка карточке
    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });

    //Удаление карточки
    cardRemove.addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    });

    // Открытие Картинки на карточках
    cardImage.addEventListener('click', image);

    function image() {
        // Открываем popup
        togglePopupImage(popupImage);

        //  Находим поля формы в DOM
        let image  = document.querySelector('.popup__image');
        let imageText = document.querySelector('.popup__caption');

        // Подставляем данные из объекта
        image.src  = linkValue;
        imageText.textContent = nameValue;
    }
}

// Функция открытия/закрытия popup увеличение карточек
imageCloseButton.addEventListener('click', () => togglePopupImage(popupImage));
function togglePopupImage(popupImage) {
    popupImage.classList.toggle('popup_image-opened');
}

// Функция открытия/закрытия popup добавления карточек
cardCloseButton.addEventListener('click', () => toggleCardPopup(addCardPopup));
function toggleCardPopup(cardPopup) {
    cardPopup.classList.toggle('popup_opened');
}

// Функция очистки поля в форме карточки
function clearCardForm() {
    nameInput.value = "";
    linkInput.value = "";
    console.log(nameInput);
}
